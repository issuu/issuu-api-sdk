import { api } from '../services/api';
import {
    CreateNewStackRequest,
    CreateNewStackResponse,
    GetStackItemsRequest,
    GetStackItemsResponse,
    GetStackResponse,
    UpdateStackRequest,
    UpdateStackResponse,
} from '../../types/stack';
import { AxiosError } from 'axios';

export const stack = {
    baseRoute: '/stacks',
    /**
     * Create a new Stack
     * - Creates a new stack with the provided data.
     * - If the user is a teams user, an error will be thrown as teams doesn't support stacks.
     * @param stack Stack data to create.
     * @param abortController
     */
    async createNewStack(
        stack: CreateNewStackRequest,
        abortController?: AbortController,
    ): Promise<CreateNewStackResponse> {
        try {
            const result = await api.post<CreateNewStackResponse>(
                `${this.baseRoute}`,
                stack,
                { signal: abortController?.signal },
            );
            return result.data;
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error creating new stack:', _err);
                throw _err;
            }
            else {
                throw new Error('Error creating new stack: ' + error);
            }
        }
    },
    /**
     * Get a Stack by ID.
     * - Retrieves the stack data based on the provided stack ID.
     * - If the user is a teams user, an error will be thrown as teams doesn't support stacks.
     * @param stackId The unique identifier of the stack to retrieve.
     * @param abortController
     */
    async getStack(
        stackId: string,
        abortController?: AbortController,
    ): Promise<GetStackResponse> {
        try {
            const result = await api.get<GetStackResponse>(
                `${this.baseRoute}/${stackId}`,
                { signal: abortController?.signal },
            );
            return result.data;
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error getting stack by ID:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting stack by ID: ' + error);
            }
        }
    },
    /**
     * Delete a Stack by ID.
     * - Deletes the stack based on the provided stack ID.
     * - If the user is a teams user, an error will be thrown as teams doesn't support stacks.
     * @param stackId The unique identifier of the stack to delete.
     * @param abortController
     */
    async deleteStack(
        stackId: string,
        abortController?: AbortController,
    ) {
        try {
            return await api.delete(
                `${this.baseRoute}/${stackId}`,
                { signal: abortController?.signal },
            );
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error deleting stack by ID:', _err);
                throw _err;
            }
            else {
                throw new Error('Error deleting stack by ID: ' + error);
            }
        }
    },
    /**
     * Update a Stack by ID.
     * - Updates the stack data based on the provided stack ID and data.
     * - If the user is a teams user, an error will be thrown as teams doesn't support stacks.
     * @param stackId The unique identifier of the stack to update.
     * @param stack Stack data to update.
     * @param abortController
     */
    async updateStack(
        stackId: string,
        stack: UpdateStackRequest,
        abortController?: AbortController,
    ): Promise<UpdateStackResponse> {
        try {
            const result = await api.patch<UpdateStackResponse>(
                `${this.baseRoute}/${stackId}`,
                stack,
                { signal: abortController?.signal },
            );
            return result.data;
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error updating stack by ID:', _err);
                throw _err;
            }
            else {
                throw new Error('Error updating stack by ID: ' + error);
            }
        }
    },
    /**
     * List all items in a Stack.
     * - Retrieves a list of slugs of the stack items paginated by the provided parameters.
     * - If the user is a teams user, an error will be thrown as teams doesn't support stacks.
     * @param stackId The unique identifier of the stack to retrieve.
     * @param options Options to filter the items.
     * @param abortController
     */
    async getStackItems(
        stackId: string,
        options?: GetStackItemsRequest,
        abortController?: AbortController,
    ): Promise<GetStackItemsResponse>{
        try {
            const result = await api.get<GetStackItemsResponse>(
                `${this.baseRoute}/${stackId}/items`,
                {
                    params: options,
                    signal: abortController?.signal,
                },
            );
            return result.data;
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error getting stack items by ID:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting stack items by ID: ' + error);
            }
        }
    },
    /**
     * Add an item to a Stack.
     * - Adds a document to a stack based on the provided stack ID and document slug.
     * - If the user is a teams user, an error will be thrown as teams doesn't support stacks.
     * - Only published documents can be added to a stack.
     * @param stackId The unique identifier of the stack to add the document to.
     * @param slug The slug of the document to add to the stack.
     * @param abortController
     */
    async addStackItem(
        stackId: string,
        slug: string,
        abortController?: AbortController,
    ) {
        try {
            return await api.post(
                `${this.baseRoute}/${stackId}/items`,
                { slug },
                { signal: abortController?.signal },
            );
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error adding item to stack:', _err);
                throw _err;
            }
            else {
                throw new Error('Error adding item to stack: ' + error);
            }
        }
    },
    /**
     * Remove an item from a Stack.
     * - Removes a document from a stack based on the provided stack ID and document slug.
     * - If the user is a teams user, an error will be thrown as teams doesn't support stacks.
     * @param stackId The unique identifier of the stack to remove the document from.
     * @param slug The slug of the document to remove from the stack.
     * @param abortController
     */
    async removeStackItem(
        stackId: string,
        slug: string,
        abortController?: AbortController,
    ) {
        try {
            return await api.delete(
                `${this.baseRoute}/${stackId}/items/${slug}`,
                { signal: abortController?.signal },
            );
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error removing item from stack:', _err);
                throw _err;
            }
            else {
                throw new Error('Error removing item from stack: ' + error);
            }
        }
    },
};