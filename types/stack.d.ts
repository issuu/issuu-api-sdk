import { Link, StackAccessTypes } from "./common";

interface CreateNewStackRequest {
    accessType: StackAccessTypes;
    description: string;
    title: string;
}
type CreateNewStackResponse = string;

interface GetStackResponse extends CreateNewStackRequest { 
    id: string;
}

interface UpdateStackRequest {
    accessType?: StackAccessTypes;
    description?: string;
    title?: string;
}
interface UpdateStackResponse extends GetStackResponse {}

interface GetStackItemsRequest {
    /**
     * Include unlisted stacks in the list of stacks.
     * @default true
     */
    includeUnlisted?: boolean;
    /**
     * Number of items to return per page.
     * @minimum 1
     * @maximum 100
     * @default 10
     */
    size?: number;
    /**
     * Specifies the page number to return.
     * @minimum 1
     * @default 1
     */
    page?: number;
}
interface GetStackItemsResponse {
    results: string[];
    count?: number;
    pageSize: number;
    links: {
        next?: Link;
        previous?: Link;
        self?: Link;
    };
}

export type {
    CreateNewStackRequest,
    CreateNewStackResponse,
    GetStackResponse,
    UpdateStackRequest,
    UpdateStackResponse,
    GetStackItemsResponse,
    GetStackItemsRequest,
}
