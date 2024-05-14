type Link = { href: string };
type CoverAsset = {
    url: string,
    width: number,
    height: number
};
type ImageFormat = 'PNG' | 'SVG';

// Drafts
type Access = 'PUBLIC' | 'PRIVATE';
type DocumentType = 'editorial' | 'book' | 'promotional' | 'other';
type DocumentFileInfoType = 'UNKNOWN' | 'DOC' | 'ODP' | 'ODT' | 'PDF' | 'PPT' | 'RTF' | 'SXI' | 'SXW' | 'WPD' | 'EPUB' | 'MOBI';
type DraftConversionStatus = 'DONE' | 'CONVERTING' | 'FAILED';
type PublishValidateError = 'file_too_big' | 'file_too_many_pages' | 'file_not_converted' | 'missing_license_download' | 'missing_license_scheduled_publishing' | 'missing_license_detected_links' | 'unknown' | 'unlisted_limit_exceeded' | 'missing_title' | 'missing_description' | 'missing_file' | 'missing_access' | 'incomplete_draft' | 'published_documents_limit_exceeded';
type DraftStatus = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'UNPUBLISHED' | 'QUARANTINED';
// Stacks
type StackAccessTypes = 'PUBLIC' | 'UNLISTED';
// User
type Limit = number | 'unlimited';
// Publication
type URLResult = {
    url: string,
};

export type {
    Link,
    Access,
    DocumentType,
    DocumentFileInfoType,
    DraftConversionStatus,
    PublishValidateError,
    StackAccessTypes,
    DraftStatus,
    CoverAsset,
    ImageFormat,
    Limit,
    URLResult,
};
