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
import { publication } from './publication.controller';

const getBlobSizeInMB = (blob: Blob) => {
    const blobSize = blob.size / (1024 * 1024);
    return Math.round(blobSize * 100) / 100;
};
const MAX_FILE_SIZE_MB = 2048;

export const draft = {
    baseRoute: '/drafts',
    /**
     * Create a new Draft.
     * - Creates a new draft with the given data.
     * - The document will be uploaded in a separate step.
     * @param draft The data to create the draft with.
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
     * - Retrieves a draft by its slug.
     * @param slug The unique identifier of the draft to retrieve.
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
     * Delete a Draft by slug
     * - Deletes a draft by its slug.
     * @param slug The unique identifier of the draft to delete.
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
     * Update a Draft by slug.
     * - Updates a draft with the given data based on the slug.
     * - The fields `fileUrl` or `info` must be provided.
     * - If `fileUrl` is provided, the `confirmCopyright` field must be set to `true`.
     * @param slug The unique identifier of the draft to update.
     * @param draft The data to update the draft with.
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
     * Upload a document to a Draft by slug.
     * - Uploads a document to a draft by its slug.
     * - The document will be converted to a publication in a separate step.
     * @param slug The unique identifier of the draft to upload.
     * @param document The file data to upload.
     * @param progressCallback A callback function to track the upload progress.
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
     * Publish a Draft by slug.
     * - Creates a new Publication (see /publications)
     * - If this is the first publish for the document, the desiredName properties will be used to hint the final document page URL: issuu.com/{username}/docs/{desiredName}. 
     * - If the user already have a document page with such an URL, a random string will be used as suffix.
     * - If the document has already been published before, the desiredName will be ignored. It will also be ignored for team documents.
     * - It will also be ignored for team documents.
     * @param slug The unique identifier of the draft to publish.
     * @param options The desired name for the publication.
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
     * - This is a convenience function that wraps the createNewDraft, uploadDocumentToDraftBySlug, and publishDraftBySlug functions.
     * @param draft The data to create the draft with.
     * @param document The file data to upload.
     * @param progressCallback A callback function to track the upload progress.
     * @param options Options for the publication.
     * @param abortController
     */
    async saveAndUploadDraft(
        draft: CreateNewDraftRequest | (UpdateDraftBySlugRequest & { slug: string }),
        document: UploadDocumentToDraftBySlugRequest,
        publishAtTheEnd: boolean = true,
        progressCallback?: (progress: number) => void,
        options?: PublishDraftBySlugRequest & { 
            checkConversionStatusTimeout?: number,
            shouldDeleteOnAbort?: boolean,
        },
        abortController?: AbortController,
    ): Promise<CreateAndPublishDraftResponse | void>
    {
        let savedDraft: CreateNewDraftResponse | UpdateDraftBySlugResponse, result: PublishDraftBySlugResponse, isAborted = false;
        progressCallback?.(0);

        // setup abort controller
        if(abortController) {
            abortController.signal.addEventListener('abort', async () => {
                if(!savedDraft) return;
                else if(savedDraft && !result) {
                    if (!!options?.shouldDeleteOnAbort && !!savedDraft.slug) {
                        await this.deleteDraftBySlug(savedDraft.slug, abortController);
                    }
                    is_aborted = true;
                } else if(savedDraft && result) {
                    if (!!options?.shouldDeleteOnAbort && !!result.slug) {
                        await publication.deletePublicationBySlug(result.slug, abortController);
                    }
                    is_aborted = true;
                }
            });
        }

        // Until 20%
        if('slug' in draft && draft.slug && typeof draft.slug === 'string') {
            savedDraft = await this.updateDraftBySlug(draft.slug, { ...draft, slug: undefined } as UpdateDraftBySlugRequest, abortController);
        } else {
            savedDraft = await this.createNewDraft(draft as CreateNewDraftRequest, abortController);
        }
        progressCallback?.(20);

        // Until 70%
        if(is_aborted) return progressCallback?.(100);
        await this.uploadDocumentToDraftBySlug(
            savedDraft.slug,
            document, 
            (percentage) => {
                progressCallback?.(20 + (percentage * 0.5));
            },
            abortController
        );

        // Until 80%
        if(is_aborted) return progressCallback?.(100);
        let is_converted = false;
        while (!is_converted) {
            const found = await this.getDraftBySlug(savedDraft.slug, abortController);
            if (found.fileInfo.conversionStatus === 'DONE') {
                is_converted = true;
            }

            await new Promise((resolve) => setTimeout(resolve, options?.checkConversionStatusTimeout || 1000));
        }
        progressCallback?.(80);

        if(is_aborted) return progressCallback?.(100);
        if(publishAtTheEnd) {
            result = await this.publishDraftBySlug(
                savedDraft.slug,
                options,
                abortController
            );
            // Until 100%
            progressCallback?.(100);
            
            if(is_aborted) return progressCallback?.(100);
            // Return the result
            return {
                ...result,
                slug: savedDraft.slug,
            };
        }
        else {
            progressCallback?.(100);
            return {
                slug: savedDraft.slug,
            };
        }
    },
    /**
     * @deprecated This function is deprecated. Use saveAndUploadDraft instead.
    */
    async createAndUploadDraft(
        draft: CreateNewDraftRequest,
        document: UploadDocumentToDraftBySlugRequest,
        publishAtTheEnd: boolean = true,
        progressCallback?: (progress: number) => void,
        options?: PublishDraftBySlugRequest & { 
            checkConversionStatusTimeout?: number,
            shouldDeleteOnAbort?: boolean,
        },
        abortController?: AbortController,
    ): Promise<CreateAndPublishDraftResponse | void>
    {
        return this.saveAndUploadDraft(draft, document, publishAtTheEnd, progressCallback, options, abortController);
    },
};