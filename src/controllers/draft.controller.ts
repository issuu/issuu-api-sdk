import { AxiosError } from 'axios';
import { 
    CreateAndPublishDraftResponse,
    CreateNewDraftRequest,
    CreateNewDraftResponse,
    GetDraftBySlugResponse,
    PublishDraftBySlugRequest,
    PublishDraftBySlugResponse,
    PublishValidateError,
    UpdateDraftBySlugRequest,
    UpdateDraftBySlugResponse,
    UploadDocumentToDraftBySlugRequest,
    UploadDocumentToDraftBySlugResponse,
} from '../../types/draft';
import { api } from '../services/api';

const getBlobSizeInMB = (blob: Blob) => {
    const blobSize = blob.size / (1024 * 1024);
    return Math.round(blobSize * 100) / 100;
};
const MAX_FILE_SIZE_MB = 2048;

export const draft = {
    baseRoute: '/drafts',
    /**
     * Create a new Draft. The document will be uploaded in a separate step.
     * @param draft
     * @param abortController
     */
    async createNewDraft(
        draft: CreateNewDraftRequest,
        abortController?: AbortController,
    ): Promise<CreateNewDraftResponse> {
        try {
            const result = await api.post<CreateNewDraftResponse>(
                `${this.baseRoute}`,
                draft,
                { signal: abortController?.signal }
            );
            return result.data;
        } catch (error: any) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error creating new draft:', _err);
                throw _err;
            }
            else {
                throw new Error('Error creating new draft: ' + error);
            }
        }
    },
    /**
     * Get a Draft by slug.
     * @param slug 
     * @param abortController
     */
    async getDraftBySlug(
        slug: string,
        abortController?: AbortController,
    ): Promise<GetDraftBySlugResponse>{
        try {
            const result = await api.get<GetDraftBySlugResponse>(
                `${this.baseRoute}/${slug}`,
                { signal: abortController?.signal }
            );
            return result.data;
        } catch (error: any) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error getting draft by slug:', _err);
                throw _err;
            }
            else {
                throw new Error('Error getting draft by slug: ' + error);
            }
        }
    },
    /**
     * Delete a Draft by slug.
     * @param slug 
     */
    async deleteDraftBySlug(
        slug: string,
        abortController?: AbortController,
    ) {
        try {
            return await api.delete(
                `${this.baseRoute}/${slug}`,
                { signal: abortController?.signal }
            );
        } catch (error: any) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error deleting draft by slug:', _err);
                throw _err;
            }
            else {
                throw new Error('Error deleting draft by slug: ' + error);
            }
        }
    },
    /**
     * Update a Draft by slug. The document will be uploaded in a separate step.
     * @param slug 
     * @param draft 
     * @param abortController
     */
    async updateDraftBySlug(
        slug: string,
        draft: UpdateDraftBySlugRequest,
        abortController?: AbortController,
    ): Promise<UpdateDraftBySlugResponse> {
        try {
            const result = await api.patch<UpdateDraftBySlugResponse>(
                `${this.baseRoute}/${slug}`,
                draft,
                { signal: abortController?.signal }
            );
            return result.data;
        } catch (error: any) {
            if(error instanceof AxiosError) {
                // Handle the error here
                const _err = {
                    status: error.response?.status,
                    data: error.response?.data,
                };
                console.error('Error updating draft by slug:', _err);
                throw _err;
            }
            else {
                throw new Error('Error updating draft by slug: ' + error);
            }
        }
    },
    /**
     * Upload a document to a Draft by slug. The document will be converted to a publication in a separate step.
     * @param slug 
     * @param document 
     * @param progressCallback 
     * @param abortController
     */
    async uploadDocumentToDraftBySlug(
        slug: string, 
        document: UploadDocumentToDraftBySlugRequest,
        progressCallback?: (progress: number) => void,
        abortController?: AbortController,
    ): Promise<UploadDocumentToDraftBySlugResponse> {
        try {
            if (!document.file) {
                throw new Error('No file provided');
            }

            if (getBlobSizeInMB(document.file) > MAX_FILE_SIZE_MB) {
                throw new Error('File is too large');
            }

            const formData = new FormData();
            formData.append('file', document.file);
            formData.append('confirmCopyright', document.confirmCopyright);

            const result = await await api.patch<UploadDocumentToDraftBySlugResponse>(
                `${this.baseRoute}/${slug}/upload`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent: any) => {
                        const percentage = (progressEvent.loaded * 100) / progressEvent.total;
                        if (progressCallback) {
                            progressCallback(percentage);
                        }
                    },
                    signal: abortController?.signal,
                }
            );
            return result.data;
        } catch (error: any) {
            const errorReason = await error.response.json();
            const reason: PublishValidateError = errorReason.publishFailedReason;

            if(!reason) {
                throw new Error('Error uploading document to draft by slug: ' + errorReason.data);
            }
            else {
                throw new Error('Validation error: ' + errorReason.publishFailedReason);
            }
        }
    },
    /**
     * Publish a Draft by slug. Creates a new Publication (see /publications) If this is the first publish for the document, the desiredName properties will be used to hint the final document page URL: issuu.com/{username}/docs/{desiredName}. 
     * If the user already have a document page with such an URL, a random string will be used as suffix.
     * If the document has already been published before, the desiredName will be ignored. It will also be ignored for team documents.
     * @param slug 
     * @param options 
     * @param abortController
     */
    async publishDraftBySlug(
        slug: string,
        options?: PublishDraftBySlugRequest,
        abortController?: AbortController,
    ): Promise<PublishDraftBySlugResponse> {
        const cleanString = (inputString: string) => inputString.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        try {
            const result = await api.post<PublishDraftBySlugResponse>(
                `${this.baseRoute}/${slug}/publish`,
                {
                    desiredName: options?.desiredName ? cleanString(options.desiredName) : undefined,
                },
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
                console.error('Error publishing draft by slug:', _err);
                throw _err;
            }
            else {
                throw new Error('Error publishing draft by slug: ' + error);
            }
        }
    },
    /**
     * Create a new Draft, upload a document to it, and then publish it. 
     * This is a convenience function that wraps the createNewDraft, uploadDocumentToDraftBySlug, and publishDraftBySlug functions.
     * @param draft 
     * @param document 
     * @param progressCallback 
     * @param options 
     * @param abortController
     */
    async createAndUploadDraft(
        draft: CreateNewDraftRequest,
        document: UploadDocumentToDraftBySlugRequest,
        publishAtTheEnd: boolean = true,
        progressCallback?: (progress: number) => void,
        options?: PublishDraftBySlugRequest,
        abortController?: AbortController,
    ): Promise<CreateAndPublishDraftResponse>
    {
        progressCallback?.(0);
        // Until 20%
        const newDraft = await this.createNewDraft(draft, abortController);
        progressCallback?.(20);

        // Until 70%
        await this.uploadDocumentToDraftBySlug(
            newDraft.slug,
            document, 
            (percentage) => {
                progressCallback?.(20 + (percentage * 0.5));
            },
            abortController
        );

        // Until 80%
        let is_converted = false;
        while (!is_converted) {
            const found = await this.getDraftBySlug(newDraft.slug, abortController);
            if (found.fileInfo.conversionStatus === 'DONE') {
                is_converted = true;
            }
        }
        progressCallback?.(80);

        let result: PublishDraftBySlugResponse;
        if(publishAtTheEnd) {
            result = await this.publishDraftBySlug(
                newDraft.slug,
                options,
                abortController
            );
            // Until 100%
            progressCallback?.(100);
            
            // Return the result
            return {
                ...result,
                slug: newDraft.slug,
            };
        }
        else {
            progressCallback?.(100);
            return {
                slug: newDraft.slug,
            };
        }
    },
};