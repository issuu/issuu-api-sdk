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
     * @param slug 
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
     * @param slug 
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
     * Update a Publication by slug.
     * @param slug 
     * @param publication 
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
     * @param slug 
     * @param options 
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
     * Get a Publication's reader share link by slug.
     * @param slug 
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
     * Get a Publication's QR code share link by slug.
     * @param slug 
     * @param options 
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
     * Get a Publication's embed code by slug.
     * @param slug 
     * @param options 
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