import { AxiosError } from 'axios';
import {
    GetPublicationAssetsBySlugResult,
    GetPublicationBySlugResult,
    GetPublicationEmbedCodeBySlugRequest,
    GetPublicationEmbedCodeBySlugResult,
    GetPublicationFullscreenShareBySlugRequest,
    GetPublicationFullscreenShareBySlugResult,
    GetPublicationQRCodeShareBySlugRequest,
    GetPublicationQRCodeShareBySlugResult,
    GetPublicationReaderShareBySlugResult
} from '../../types/publication';
import { api } from '../services/api';

export const publication = {
    baseRoute: '/publications',
    /**
     * Get a Publication by slug.
     * - Retrieves a specific publication based on its unique slug identifier.
     * @param slug The unique identifier of the publication to retrieve.
     * @param abortController
     */
    async getPublicationBySlug(
        slug: string,
        abortController?: AbortController,
    ): Promise<GetPublicationBySlugResult> {
        try {
            const result = await api.get<GetPublicationBySlugResult>(
                `${this.baseRoute}/${slug}`,
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
                console.error('Error getting publication by slug:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting publication by slug: ' + error);
            }
        }
    },
    /**
     * Delete a Publication by slug.
     * - Deletes a specific publication based on its unique identifier.
     * @param slug The unique identifier of the publication to delete.
     * @param abortController
     */
    async deletePublicationBySlug(
        slug: string,
        abortController?: AbortController,
    ) {
        try {
            return await api.delete(
                `${this.baseRoute}/${slug}`,
                { signal: abortController?.signal },
            );
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error deleting publication by slug:', _err);
                throw _err;
            }
            else {
                throw new Error('Error deleting publication by slug: ' + error);
            }
        }
    },
    /**
     * Get Publication assets by slug
     * - Retrieves a list of assets associated with a specific publication based on its unique identifier.
     * @param slug The unique identifier of the publication to delete.
     * @param assetType The type of asset to retrieve.
     * @param size The number of assets to retrieve.
     * @param page The page number of assets to retrieve.
     * @param documentPageNumber The page number of the document to retrieve.
     * @param continuation The continuation token to retrieve the next page of assets.
     * @param abortController
     */
    async getPublicationAssetsBySlug(
        slug: string,
        assetType: string,
        size?: 10 | 20 | 40 | 60 | 100,
        page?: number,
        documentPageNumber?: number,
        continuation?: string,
        abortController?: AbortController,
    ): Promise<GetPublicationAssetsBySlugResult> {
        try {
            const result = await api.get<GetPublicationAssetsBySlugResult>(
                `${this.baseRoute}/${slug}/assets`, 
                {
                    params: {
                        assetType,
                        size,
                        page,
                        documentPageNumber,
                        continuation
                    },
                    signal: abortController?.signal
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
                console.error('Error getting publication assets by slug:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting publication assets by slug: ' + error);
            }
        }
    },
    /**
     * Get a Publication's fullscreen share link by slug.
     * - Retrieves the fullscreen share link for a specific publication based on its unique identifier.
     * - You can customize the fullscreen share link by providing the settings for the link.
     * @param slug The unique identifier of the publication to retrieve.
     * @param options The settings for the fullscreen share link.
     * @param abortController
     */
    async getPublicationFullscreenShareBySlug(
        slug: string,
        options?: GetPublicationFullscreenShareBySlugRequest,
        abortController?: AbortController,
    ): Promise<GetPublicationFullscreenShareBySlugResult> {
        try {
            const result = await api.post<GetPublicationFullscreenShareBySlugResult>(
                `${this.baseRoute}/${slug}/fullscreen`,
                options,
                { signal: abortController?.signal }
            );
            return result.data;
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error getting publication fullscreen share by slug:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting publication fullscreen share by slug: ' + error);
            }
        }
    },
    /**
     * Get Publication Reader Share URL by slug
     * - Retrieves the reader share link for a specific publication based on its unique identifier.
     * @param slug The unique identifier of the publication to retrieve.
     * @param abortController
     */
    async getPublicationReaderShareBySlug(
        slug: string,
        abortController?: AbortController,
    ): Promise<GetPublicationReaderShareBySlugResult> {
        try {
            const result = await api.get<GetPublicationReaderShareBySlugResult>(
                `${this.baseRoute}/${slug}/reader`,
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
                console.error('Error getting publication reader share by slug:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting publication reader share by slug: ' + error);
            }
        }
    },
    /**
     * Get Publication QRCode share by slug
     * - Retrieves the QR code share link for a specific publication based on its unique identifier.
     * - You can customize the QR code share link by providing the settings for the link.
     * @param slug The unique identifier of the publication to retrieve.
     * @param options The settings for the QR code share link.
     * @param abortController
     */
    async getPublicationQRCodeShareBySlug(
        slug: string,
        options?: GetPublicationQRCodeShareBySlugRequest,
        abortController?: AbortController,
    ): Promise<GetPublicationQRCodeShareBySlugResult> {
        try {
            const result = await api.post<GetPublicationQRCodeShareBySlugResult>(
                `${this.baseRoute}/${slug}/qrcode`,
                options,
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
                console.error('Error getting publication QR code share by slug:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting publication QR code share by slug: ' + error);
            }
        }
    },
    /**
     * Get Publication Embed code by slug
     * - Retrieves the embed code for a specific publication based on its unique identifier.
     * - You can customize the embed code by providing the settings for the code.
     * @param slug The unique identifier of the publication to retrieve.
     * @param options The settings for the embed code.
     * @param abortController
     */
    async getPublicationEmbedCodeBySlug(
        slug: string,
        options?: GetPublicationEmbedCodeBySlugRequest,
        abortController?: AbortController,
    ): Promise<GetPublicationEmbedCodeBySlugResult> {
        try {
            const result = await api.get<GetPublicationEmbedCodeBySlugResult>(
                `${this.baseRoute}/${slug}/embed`,
                {
                    params: options,
                    signal: abortController?.signal,
                }
            );
            return result.data;
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error getting publication embed code by slug:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting publication embed code by slug: ' + error);
            }
        }
    }
};