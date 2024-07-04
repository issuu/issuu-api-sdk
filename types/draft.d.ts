import {
    Access,
    DocumentType,
    DraftConversionStatus,
    DocumentFileInfoType,
    DocumentStatus,
    CoverAsset
} from "./common";
import { Document, DocumentInformation } from "./document";

interface CreateNewDraftRequest {
    confirmCopyright?: boolean;
    fileUrl?: string;
    /**
     * Metadata used to create documents in draft state and update changes that will be reflected on the next publish
     */
    info: DocumentInformation;
}
/**
 * A not-yet-published document.
 */
interface CreateNewDraftResponse extends Document {
    /**
     * DRAFTed documents have not been published yet
     */
    state: 'DRAFT';
}

/**
 * Represents a document. It is a discriminated union of DocumentDraft, DocumentPublished, DocumentScheduled, DocumentUnpublished and DocumentQuarantined structures. The discriminator is the state field.
 */
interface GetDraftBySlugResponse extends Document {}

interface UpdateDraftBySlugRequest {
    confirmCopyright?: boolean;
    fileUrl?: string;
    info?: DocumentInformation;
}
interface UpdateDraftBySlugResponse extends Document {};

interface UploadDocumentToDraftBySlugRequest {
    file: Blob;
    confirmCopyright: 'true';
}
/**
 * A not-yet-published document.
 */
interface UploadDocumentToDraftBySlugResponse extends UpdateDraftBySlugResponse {}

interface PublishDraftBySlugRequest {
    /**
     * The desired custom part of the document page url: https://issuu.com/<username>/docs/<desiredName> If already taken by another document, a random string is appended. Must be URL-friendly.
     * This is ignored for team documents.
     */
    desiredName?: string;
}
interface PublishDraftBySlugResponse {
    /**
     * The document page URL
     */
    publicLocation: string;
    /**
     * The document edit page URL for the publisher
     */
    location: string;
    slug?: string;
}

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
};
