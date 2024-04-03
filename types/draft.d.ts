type DraftAccess = 'PUBLIC' | 'PRIVATE';
type DraftType = 'editorial' | 'book' | 'promotional' | 'other';
type DraftFileInfoType = 'UNKNOWN' | 'DOC' | 'ODP' | 'ODT' | 'PDF' | 'PPT' | 'RTF' | 'SXI' | 'SXW' | 'WPD' | 'EPUB' | 'MOBI';
type DraftConversionStatus = 'DONE' | 'CONVERTING' | 'FAILED';

type CreateNewDraftRequest = {
    confirmCopyright?: boolean,
    fileUrl?: string,
    /**
     * Metadata used to create documents in draft state and update changes that will be reflected on the next publish
     */
    info: {
        /**
         * The identifier of the file that will be used in the next publish
         */
        file?: number,
        /**
         * PUBLIC documents, once published, will be made searcheable and will appear in streams, recommendations, etc. PRIVATE documents, once published, are only accessible from users that knows their URL.
         */
        access?: DraftAccess,
        title?: string,
        description?: string,
        /**
         * Set it to true to indicate that the document is a preview of a bigger content.
         */
        preview?: boolean,
        type?: DraftType,
        /**
         * When set to true, the conversion procedure will search for hypermedia links inside the document text.
         */
        showDetectedLinks?: boolean,
        /**
         * When set to true once published the readers will be allowed to download the original document.
         */
        downloadable?: boolean,
        /**
         * Set the original publish date field to indicate that a document was previously published, e.g. to import older issues of your magazine. Set it to null to clear the backDate.
         */
        originalPublishDate?: string,
        /**
         * This field schedules the date for Publication, until then the document will be at SCHEDULED state.
         */
        scheduledTime?: string
    },
};
/**
 * A not-yet-published document.
 */
type CreateNewDraftResponse = 
{
    /**
     * The document identifier
     */
    slug: string,
    /**
     * (User/Team)-name of the document owner
     */
    owner: string,
    cover: {
        small: {
            url: string,
            width: number,
            height: number
        },
        medium: {
            url: string,
            width: number,
            height: number
        },
        large: {
            url: string,
            width: number,
            height: number
        }
    },
    fileInfo: {
        name: string,
        type: DraftFileInfoType,
        size: number,
        pageCount: number,
        conversionStatus: DraftConversionStatus,
        isCopyrightConfirmed: boolean
    },
    /**
     * DRAFTed documents have not been published yet
     */
    state: 'DRAFT',
    /**
     * The document edit page URL for the publisher
     */
    location: string,
    /**
     * Changes to be apply on the next publish
     */
    changes?: {
        /**
         * The identifier of the file that will be used in the next publish
         */
        file?: number,
        /**
         * PUBLIC documents, once published, will be made searcheable and will appear in streams, recommendations, etc. PRIVATE documents, once published, are only accessible from users that knows their URL.
         */
        access?: DraftAccess,
        title?: string,
        description?: string,
        /**
         * Set it to true to indicate that the document is a preview of a bigger content.
         */
        preview?: boolean,
        type?: DraftType,
        /**
         * When set to true, the conversion procedure will search for hypermedia links inside the document text.
         */
        showDetectedLinks?: boolean,
        /**
         * When set to true once published the readers will be allowed to download the original document.
         */
        downloadable?: boolean,
        /**
         * Set the original publish date field to indicate that a document was previously published, e.g. to import older issues of your magazine. Set it to null to clear the backDate.
         */
        originalPublishDate?: string,
        /**
         * This field schedules the date for Publication, until then the document will be at SCHEDULED state.
         */
        scheduledTime?: string
    },
    /**
     * Draft created date
     */
    created?: string
};

/**
 * Represents a document. It is a discriminated union of DocumentDraft, DocumentPublished, DocumentScheduled, DocumentUnpublished and DocumentQuarantined structures. The discriminator is the state field.
 */
type GetDraftBySlugResponse = CreateNewDraftResponse & {
    state: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'UNPUBLISHED' | 'QUARANTINED'
};

type UpdateDraftBySlugRequest = {
    confirmCopyright?: boolean,
    fileUrl?: string,
    info?: {
        /**
         * The identifier of the file that will be used in the next publish
         */
        file?: number,
        /**
         * PUBLIC documents, once published, will be made searcheable and will appear in streams, recommendations, etc. PRIVATE documents, once published, are only accessible from users that knows their URL.
         */
        access?: DraftAccess,
        title?: string,
        description?: string,
        /**
         * Set it to true to indicate that the document is a preview of a bigger content.
         */
        preview?: boolean,
        type?: DraftType,
        /**
         * When set to true, the conversion procedure will search for hypermedia links inside the document text.
         */
        showDetectedLinks?: boolean,
        /**
         * When set to true once published the readers will be allowed to download the original document.
         */
        downloadable?: boolean,
        /**
         * Set the original publish date field to indicate that a document was previously published, e.g. to import older issues of your magazine. Set it to null to clear the backDate.
         */
        originalPublishDate?: string,
        /**
         * This field schedules the date for Publication, until then the document will be at SCHEDULED state.
         */
        scheduledTime?: string
    }
};
type UpdateDraftBySlugResponse = CreateNewDraftResponse;

type UploadDocumentToDraftBySlugRequest = {
    file: Blob,
    confirmCopyright: 'true',
};
/**
 * A not-yet-published document.
 */
type UploadDocumentToDraftBySlugResponse = UpdateDraftBySlugResponse;

type PublishDraftBySlugRequest = {
    /**
     * The desired custom part of the document page url: https://issuu.com/<username>/docs/<desiredName> If already taken by another document, a random string is appended. Must be URL-friendly.
     * This is ignored for team documents.
     */
    desiredName?: string
};
type PublishDraftBySlugResponse = {
    /**
     * The document page URL
     */
    publicLocation: string,
    /**
     * The document edit page URL for the publisher
     */
    location: string,
    slug?: string,
};

type CreateAndPublishDraftResponse = PublishDraftBySlugResponse | { slug: string };

type PublishValidateError = 'file_too_big' | 'file_too_many_pages' | 'file_not_converted' | 'missing_license_download' | 'missing_license_scheduled_publishing' | 'missing_license_detected_links' | 'unknown' | 'unlisted_limit_exceeded' | 'missing_title' | 'missing_description' | 'missing_file' | 'missing_access' | 'incomplete_draft' | 'published_documents_limit_exceeded';

export type {
    CreateNewDraftRequest,
    CreateNewDraftResponse,
    GetDraftBySlugResponse,
    PublishDraftBySlugRequest,
    PublishDraftBySlugResponse,
    UpdateDraftBySlugRequest,
    UpdateDraftBySlugResponse,
    UploadDocumentToDraftBySlugResponse,
    UploadDocumentToDraftBySlugRequest,
    CreateAndPublishDraftResponse,
    PublishValidateError,
};
