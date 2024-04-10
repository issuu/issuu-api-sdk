type StackAccessTypes = 'PUBLIC' | 'UNLISTED';

type Link = {
    href: string,
};

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
     * Include unlisted stacks in the list of stacks.
     * @default true
     */
    includeUnlisted?: boolean,
    /**
     * Number of items to return per page.
     * @minimum 1
     * @maximum 100
     * @default 10
     */
    size?: number,
    /**
     * Specifies the page number to return.
     * @minimum 1
     * @default 1
     */
    page?: number,
};
type GetStackItemsResponse = {
    results: string[],
    count?: number,
    pageSize: number,
    links: {
        next?: Link,
        previous?: Link,
        self?: Link,
    },
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
