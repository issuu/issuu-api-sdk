import { CreateNewDraftResponse } from "./draft";

/**
 * Represents a document. It is a discriminated union of DocumentDraft, DocumentPublished, DocumentScheduled, DocumentUnpublished and DocumentQuarantined structures. The discriminator is the state field.
 */
type GetPublicationBySlugResult = CreateNewDraftResponse & {
    state: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'UNPUBLISHED' | 'QUARANTINED',
};

type Link = {
    href: string,
};

type GetPublicationAssetsBySlugResult1 = {
    assets: {
        text: {
            [key: string]: string
        }
        image: {
            [key: string]: string
        }
    },
    pageNumber: number,
};
type GetPublicationAssetsBySlugResult2 = {
    thumbnails: {
        medium?: string,
        large?: string,
        small?: string,
    },
    pageImage: string
    pageNumber: number
};
type GetPublicationAssetsBySlugResult = {
    results: (GetPublicationAssetsBySlugResult1 | GetPublicationAssetsBySlugResult2)[],
    links: {
        next?: Link;
        self?: Link;
        previous?: Link;
    },
    count?: number,
    pageSize: number,
};

type URLResult = {
    url: string,
};

type GetPublicationFullscreenShareBySlugRequest = {
    /**
     * Start page of the shared link. Default 1.
     */
    startPage?: number,
    /**
     * Page layout. Default double page.
     */
    pageLayout?: 'double' | 'single',
    /**
     * Instruct the reader to auto flip. Default false.
     */
    autoflip?: boolean,
    /**
     * Reader background color. Default empty.
     */
    backgroundColor?: string,
    /**
     * Custom logo location. Default empty.
     */
    logoUrl?: string,
    /**
     * Custom background image location. Default empty.
     */
    backgroundImageUrl?: string,
    /**
     * How to display the background image. Default top-left.
     */
    backgroundImagePosition?: 'topLeft' | 'stretch',
    /**
     * Whether to show the publisher's other publications. Default false.
     */
    showOtherPublications?: boolean,
    /**
     * Whether to hide the sharing options. Default false.
     */
    hideShare?: boolean,
};
type GetPublicationFullscreenShareBySlugResult = URLResult;

type GetPublicationReaderShareBySlugResult = URLResult;

/**
 * Request to generate a QR code for the publication. Include fullscreenSettings if a QR code for a shareable fullscreen reader is desired. The returned URL is valid for 7 days.
 */
type GetPublicationQRCodeShareBySlugRequest = {
    /**
     * The image format. Default PNG
     */
    format: 'PNG' | 'SVG',
    /**
     * Settings for the fullscreen share link
     */
    fullscreenSettings: GetPublicationFullscreenShareBySlugRequest,
};
type GetPublicationQRCodeShareBySlugResult = {
    qrCodeUrl: string,
    pointedUrl: string
};

type GetPublicationEmbedCodeBySlugRequest = {
    /**
     * Default true.
     */
    responsive?: boolean,
    /**
     * Default 100%.
     */
    width?: number | string,
    /**
     * Default 100%.
     */
    height?: number | string,
    /**
     * Default false.
     */
    hideIssuuLogo?: boolean,
    /**
     * Default false.
     */
    hideShareButton?: boolean,
    /**
     * Default false.
     */
    showOtherPublications?: boolean,
    /**
     * Determines the background color (hex) of the embed.
     */
    bgColor?: string,
    /**
     * Determines the background color (hex) of the fullscreen share.
     */
    fullScreenShareBgColor?: string,
};
type GetPublicationEmbedCodeBySlugResult = {
    embed: string,
};

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
