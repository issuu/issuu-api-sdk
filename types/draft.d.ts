import {
    Access,
    DocumentType,
    DraftConversionStatus,
    DocumentFileInfoType,
    DraftStatus,
    CoverAsset
} from "./common";

interface DocumentInformation {
    /**
     * The identifier of the file that will be used in the next publish
     */
    file?: number;
    /**
     * PUBLIC documents, once published, will be made searcheable and will appear in streams, recommendations, etc. PRIVATE documents, once published, are only accessible from users that knows their URL.
     */
    access?: Access;
    title?: string;
    description?: string;
    /**
     * Set it to true to indicate that the document is a preview of a bigger content.
     */
    preview?: boolean;
    type?: DocumentType;
    /**
     * When set to true, the conversion procedure will search for hypermedia links inside the document text.
     */
    showDetectedLinks?: boolean;
    /**
     * When set to true once published the readers will be allowed to download the original document.
     */
    downloadable?: boolean;
    /**
     * Set the original publish date field to indicate that a document was previously published, e.g. to import older issues of your magazine. Set it to null to clear the backDate.
     */
    originalPublishDate?: string;
    /**
     * This field schedules the date for Publication, until then the document will be at SCHEDULED state.
     */
    scheduledTime?: string;
}

type CreateNewDraftRequest = {
    confirmCopyright?: boolean,
    fileUrl?: string,
    /**
     * Metadata used to create documents in draft state and update changes that will be reflected on the next publish
     */
    info: DocumentInformation
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
        small: CoverAsset,
        medium: CoverAsset,
        large: CoverAsset,
    },
    fileInfo: {
        name: string,
        type: DocumentFileInfoType,
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
    changes?: DocumentInformation,
    /**
     * Draft created date
     */
    created?: string
};

/**
 * Represents a document. It is a discriminated union of DocumentDraft, DocumentPublished, DocumentScheduled, DocumentUnpublished and DocumentQuarantined structures. The discriminator is the state field.
 */
type GetDraftBySlugResponse = CreateNewDraftResponse & {
    state: DraftStatus
};

type UpdateDraftBySlugRequest = {
    confirmCopyright?: boolean,
    fileUrl?: string,
    info?: DocumentInformation
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
    Access as DraftAccess,
    DocumentInformation as DraftInformation,
};
