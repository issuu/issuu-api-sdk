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
     * Create a new Stack.
     * @param stack 
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
     * @param stackId 
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
     * @param stackId 
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
     * @param stackId 
     * @param stack
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
     * @param stackId 
     * @param options 
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
     * @param stackId 
     * @param slug 
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
     * @param stackId 
     * @param slug 
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