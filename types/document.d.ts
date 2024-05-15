import {
    Access,
    CoverAsset,
    DocumentFileInfoType,
    DocumentType,
    DraftConversionStatus,
    DocumentStatus
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

interface Document {
    /**
     * The document identifier
     */
    slug: string;
    /**
     * (User/Team)-name of the document owner
     */
    owner: string;
    cover: {
        small: CoverAsset;
        medium: CoverAsset;
        large: CoverAsset;
    };
    fileInfo: {
        name: string;
        type: DocumentFileInfoType;
        size: number;
        pageCount: number;
        conversionStatus: DraftConversionStatus;
        isCopyrightConfirmed: boolean;
    };
    state: DocumentStatus;
    /**
     * The document edit page URL for the publisher
     */
    location: string;
    /**
     * Changes to be apply on the next publish
     */
    changes?: DocumentInformation;
    /**
     * Document created date
     */
    created?: string;
}

export type {
    DocumentInformation,
    Document,
};