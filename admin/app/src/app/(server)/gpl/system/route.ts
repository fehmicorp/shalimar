import { createYoga } from "graphql-yoga";
import {
  systemSchema,
  createSystemContext,
} from "./schema";

const yoga = createYoga({
  schema: systemSchema,
  graphqlEndpoint: "/gpl/system",
  landingPage: false,
  graphiql: process.env.NODE_ENV !== "production",
  maskedErrors: true,
  context: async ({ request }) => createSystemContext(request),
});

export { yoga as GET, yoga as POST, yoga as OPTIONS };