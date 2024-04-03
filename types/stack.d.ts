type StackAccessTypes = 'PUBLIC' | 'UNLISTED';

type CreateNewStackRequest = {
    accessType: StackAccessTypes,
    description: string,
    title: string
};
type CreateNewStackResponse = string

type GetStackResponse = CreateNewStackRequest & {
    id: string
}

type UpdateStackRequest = {
    accessType?: StackAccessTypes,
    description?: string,
    title?: string
};
type UpdateStackResponse = GetStackResponse;

type GetStackItemsRequest = {
    /**
     * Default true.
     */
    includeUnlisted?: boolean,
    /**
     * Default 10.
     */
    size?: number,
    /**
     * Default 0.
     */
    offset?: number,
};
type GetStackItemsResponse = {
    publications: string[],
    count: number
};

export type {
    CreateNewStackRequest,
    CreateNewStackResponse,
    GetStackResponse,
    UpdateStackRequest,
    UpdateStackResponse,
    GetStackItemsResponse,
    GetStackItemsRequest,
}
