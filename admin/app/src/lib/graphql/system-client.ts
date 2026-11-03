"use client";

export class SystemGraphQLError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "SystemGraphQLError";
  }
}

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{
    message: string;
    extensions?: { code?: string };
  }>;
};

export async function systemGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const response = await fetch("/gpl/system", {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      accept: "application/graphql-response+json, application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  let result: GraphQLResponse<T>;

  try {
    result = await response.json();
  } catch {
    throw new SystemGraphQLError("The server returned an invalid response.");
  }

  if (!response.ok || result.errors?.length || !result.data) {
    const firstError = result.errors?.[0];

    throw new SystemGraphQLError(
      firstError?.message ?? `Request failed (${response.status}).`,
      firstError?.extensions?.code,
      result.errors,
    );
  }

  return result.data;
}