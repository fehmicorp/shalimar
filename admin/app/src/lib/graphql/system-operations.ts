export const USERS_QUERY = /* GraphQL */ `
  query Users(
    $search: String
    $role: String
    $status: String
    $page: Int
    $pageSize: Int
  ) {
    users(
      search: $search
      role: $role
      status: $status
      page: $page
      pageSize: $pageSize
    ) {
      items {
        id
        username
        email
        role
        isActive
        isLocked
        lastLoginAt
        createdAt
        updatedAt
      }
      total
      page
      pageSize
      totalPages
    }
  }
`;

export const USER_STATS_QUERY = /* GraphQL */ `
  query UserStats {
    userStats {
      total
      active
      inactive
      locked
    }
  }
`;

export const CREATE_USER_MUTATION = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      email
      role
      isActive
      isLocked
      createdAt
    }
  }
`;

export const UPDATE_USER_MUTATION = /* GraphQL */ `
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      username
      email
      role
      isActive
      isLocked
      updatedAt
    }
  }
`;

export const DELETE_USER_MUTATION = /* GraphQL */ `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const BLOCK_USER_MUTATION = /* GraphQL */ `
  mutation BlockUser($id: ID!, $reason: String) {
    blockUser(id: $id, reason: $reason) {
      id
      username
      isActive
      isLocked
    }
  }
`;

export const UNBLOCK_USER_MUTATION = /* GraphQL */ `
  mutation UnblockUser($id: ID!) {
    unblockUser(id: $id) {
      id
      username
      isActive
      isLocked
    }
  }
`;

export const ROLES_QUERY = /* GraphQL */ `
  query Roles {
    roles {
      id
      name
      label
      description
      permissions
      isSystem
    }
  }
`;

export const INVITE_USER_MUTATION = /* GraphQL */ `
  mutation InviteUser($input: InviteUserInput!) {
    inviteUser(input: $input) {
      id
      email
      username
      role
      expiresAt
      createdAt
    }
  }
`;

export const AUDIT_LOGS_QUERY = /* GraphQL */ `
  query AuditLogs(
    $search: String
    $category: String
    $success: Boolean
    $from: DateTime
    $to: DateTime
    $page: Int
    $pageSize: Int
  ) {
    auditLogs(
      search: $search
      category: $category
      success: $success
      from: $from
      to: $to
      page: $page
      pageSize: $pageSize
    ) {
      items {
        id
        userId
        username
        action
        category
        description
        ipAddress
        userAgent
        metadata
        success
        createdAt
      }
      total
      page
      pageSize
      totalPages
    }
  }
`;