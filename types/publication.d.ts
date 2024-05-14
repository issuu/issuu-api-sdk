import { DocumentType, Access, DraftStatus, Link, ImageFormat, URLResult } from "./common";
import { Document, DocumentInformation } from "./document";

/**
 * Represents a document. It is a discriminated union of DocumentDraft, DocumentPublished, DocumentScheduled, DocumentUnpublished and DocumentQuarantined structures. The discriminator is the state field.
 */
interface GetPublicationBySlugResult extends DocumentInformation, Document {};

interface GetPublicationAssetsBySlugResult1 {
    assets: {
        text: {
            [key: string]: string;
        };
        image: {
            [key: string]: string;
        };
    };
    pageNumber: number;
}
interface GetPublicationAssetsBySlugResult2 {
    thumbnails: {
        medium?: string;
        large?: string;
        small?: string;
    };
    pageImage: string;
    pageNumber: number;
}
interface GetPublicationAssetsBySlugResult {
    results: (GetPublicationAssetsBySlugResult1 | GetPublicationAssetsBySlugResult2)[];
    links: {
        next?: Link;
        self?: Link;
        previous?: Link;
    };
    count?: number;
    pageSize: number;
}

interface GetPublicationFullscreenShareBySlugRequest {
    /**
     * Start page of the shared link. Default 1.
     */
    startPage?: number;
    /**
     * Page layout. Default double page.
     */
    pageLayout?: 'double' | 'single';
    /**
     * Instruct the reader to auto flip. Default false.
     */
    autoflip?: boolean;
    /**
     * Reader background color. Default empty.
     */
    backgroundColor?: string;
    /**
     * Custom logo location. Default empty.
     */
    logoUrl?: string;
    /**
     * Custom background image location. Default empty.
     */
    backgroundImageUrl?: string;
    /**
     * How to display the background image. Default top-left.
     */
    backgroundImagePosition?: 'topLeft' | 'stretch';
    /**
     * Whether to show the publisher's other publications. Default false.
     */
    showOtherPublications?: boolean;
    /**
     * Whether to hide the sharing options. Default false.
     */
    hideShare?: boolean;
}
interface GetPublicationFullscreenShareBySlugResult extends URLResult {}

interface GetPublicationReaderShareBySlugResult extends URLResult {}

/**
 * Request to generate a QR code for the publication. Include fullscreenSettings if a QR code for a shareable fullscreen reader is desired. The returned URL is valid for 7 days.
 */
interface GetPublicationQRCodeShareBySlugRequest {
    /**
     * The image format. Default PNG
     */
    format: ImageFormat;
    /**
     * Settings for the fullscreen share link
     */
    fullscreenSettings: GetPublicationFullscreenShareBySlugRequest;
}
interface GetPublicationQRCodeShareBySlugResult {
    qrCodeUrl: string;
    pointedUrl: string;
}

interface GetPublicationEmbedCodeBySlugRequest {
    /**
     * Default true.
     */
    responsive?: boolean;
    /**
     * Default 100%.
     */
    width?: number | string;
    /**
     * Default 100%.
     */
    height?: number | string;
    /**
     * Default false.
     */
    hideIssuuLogo?: boolean;
    /**
     * Default false.
     */
    hideShareButton?: boolean;
    /**
     * Default false.
     */
    showOtherPublications?: boolean;
    /**
     * Determines the background color (hex) of the embed.
     */
    bgColor?: string;
    /**
     * Determines the background color (hex) of the fullscreen share.
     */
    fullScreenShareBgColor?: string;
}
interface GetPublicationEmbedCodeBySlugResult {
    embed: string;
}

export type {
    GetPublicationBySlugResult,
    GetPublicationAssetsBySlugResult,
    GetPublicationFullscreenShareBySlugRequest,
    GetPublicationFullscreenShareBySlugResult,
    GetPublicationReaderShareBySlugResult,
    GetPublicationQRCodeShareBySlugRequest,
    GetPublicationQRCodeShareBySlugResult,
    GetPublicationEmbedCodeBySlugResult,
    GetPublicationEmbedCodeBySlugRequest,
};
