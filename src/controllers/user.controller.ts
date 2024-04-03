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
     * List Drafts:
     * - Retrieves a list of drafts paginated by the given parameters.
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
     * - Retrieves a list of publications paginated by the given parameters.
     * @param q A regular expression that is applied to the titles and descriptions of the documents and returns only the documents that match the expression.
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
     * List Stacks
     * - Retrieves a list of stacks paginated by the provided parameters.
     * - If the user is a teams user, an error will be thrown as teams doesn't support stacks.
     * @param showUnlisted Include unlisted stacks in the list of stacks. Default: false
     * @param page Specifies the page number to return. Default: 1
     * @param size Determines the number of stacks to return per page. Default: 10
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
     * Get Stats
     * - List all stats for all publications or for a specific publication
     * @param dateRange Default maxTime
     * @param slug The slug of the document to get the stats for. If not provided, the stats for all documents will be returned.
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
     * Get User Profile
     * - Get the user's profile information by the authenticated user.
     * - Profile images usually have a thumbnail and large fields but those aren't mandatory
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
     * Get User Features
     * - Get the user's features by the authenticated user.
     * - The response includes the user's features like fullscreenShare, download, detectedLinks, publishedDocumentLimitLeft, unlistedDocumentLimitLeft, pageUploadLimit, and sizeUploadLimitMb.
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