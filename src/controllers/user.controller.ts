import { AxiosError } from "axios";
import {
    GetMyDraftsResult,
    GetMyStacksResult,
    GetMyProfileResult,
    GetMyPublicationsResult,
    GetMyStatsResult,
    GetMyFeaturesResult
} from "../../types/user";
import { api } from "../services/api";

export const user = {
    baseRoute: '/user',
    /**
     * List all Drafts
     * @param q Regular expression to apply to titles and descriptions
     * @param page Number of page to return. Default: 1
     * @param size How many documents to return. Default: 10
     * @param abortController
     */
    async getMyDrafts(
        q?: string,
        page?: number,
        size?: number,
        abortController?: AbortController,
    ): Promise<GetMyDraftsResult> {
        try {
            const result = await api.get<GetMyDraftsResult>('/drafts', {
                params: {
                    page,
                    size,
                    q,
                },
                signal: abortController?.signal,
            });
            return result.data;
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error getting my drafts:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting my drafts: ' + error);
            }
        }
    },
    /**
     * List all Publications
     * @param q Regular expression to apply to titles and descriptions
     * @param state Controls whether to return only document in the specified state. Default: ALL
     * @param page Number of page to return. Default: 1
     * @param size How many documents to return. Default: 10
     * @param abortController
     */
    async getMyPublications(
        q?: string,
        state?: 'ALL' | 'PUBLISHED' | 'SCHEDULED' | 'UNLISTED',
        page?: number,
        size?: number,
        abortController?: AbortController,
    ): Promise<GetMyPublicationsResult> {
        try {
            const result = await api.get<GetMyPublicationsResult>('/publications', {
                params: {
                    q,
                    state,
                    page,
                    size
                },
                signal: abortController?.signal,
            });
            return result.data;
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error getting my publications:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting my publications: ' + error);
            }
        }
    },
    /**
     * List all stacks
     * @param showUnlisted Show unlisted stacks. Default: false
     * @param page Number of page to return. Default: 1
     * @param size How many stacks to return. Default: 10
     * @param abortController
     */
    async getMyStacks(
        showUnlisted?: boolean,
        page?: number,
        size?: number,
        abortController?: AbortController,
    ): Promise<GetMyStacksResult> {
        try {
            const result = await api.get<GetMyStacksResult>('/stacks', {
                params: {
                    showUnlisted,
                    page,
                    size
                },
                signal: abortController?.signal,
            });
            return result.data;
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error getting my stacks:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting my stacks: ' + error);
            }
        }
    },
    /**
     * List all stats for all publications or filter by query parameter
     * @param dateRange Default maxTime
     * @param slug 
     * @param abortController
     */
    async getMyStats(
        dateRange?: 'thisMonth' | 'lastMonth' | 'maxTime',
        slug?: string,
        abortController?: AbortController,
    ): Promise<GetMyStatsResult> {
        try {
            const result = await api.get<GetMyStatsResult>('/stats', {
                params: {
                    dateRange,
                    slug,
                },
                signal: abortController?.signal,
            });
            return result.data;
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error getting my stats:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting my stats: ' + error);
            }
        }
    },
    /**
     * Profile images usually have a thumbnail and large fields but those aren't mandatory
     * @param abortController
     */
    async getMyProfile(
        abortController?: AbortController,
    ): Promise<GetMyProfileResult> {
        try {
            const result = await api.get<GetMyProfileResult>(
                `${this.baseRoute}/me`,
                { signal: abortController?.signal },
            );
            return result.data;
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error getting my profile:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting my profile: ' + error);
            }
        }
    },
    /**
     * Get all features for the user
     * @param abortController
     */
    async getMyFeatures(
        abortController?: AbortController,
    ): Promise<GetMyFeaturesResult> {
        try {
            const result = await api.get<GetMyFeaturesResult>(
                `${this.baseRoute}/features`,
                { signal: abortController?.signal }
            );
            return result.data;
        } catch (error) {
            throw error;
        }
    },
    /**
     * Get all data from the user
     * @param page Number of page to return. Default: 1
     * @param size How many documents to return. Default: 10
     * @param abortController
     */
    async getAllData(
        page?: number,
        size?: number,
        abortController?: AbortController,
    ): Promise<[GetMyDraftsResult, GetMyPublicationsResult, GetMyStacksResult, GetMyStatsResult, GetMyProfileResult, GetMyFeaturesResult]>
    {
        try {
            const results = await Promise.all([
                this.getMyDrafts(undefined, page, size, abortController),
                this.getMyPublications(undefined, undefined, page, size, abortController),
                this.getMyStacks(undefined, page, size, abortController),
                this.getMyStats(undefined, undefined, abortController),
                this.getMyProfile(abortController),
                this.getMyFeatures(abortController),
            ]);

            return results;
        } catch (error) {
            // Handle error
            throw error;
        }
    },
};