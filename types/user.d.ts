import { Limit, Link } from "./common";
import { Document } from "./document";
import { GetStackResponse } from "./stack";

interface GetMyPublicationsResult {
    results: Document[];
    links: {
        [key: string]: Link;
    };
    pageSize: number;
    count?: number;
}

interface GetMyDraftsResult extends GetMyPublicationsResult {}

interface GetMyStatsResult {
    averageTimeSpent: number;
    clicks: number;
    impressions: number;
    reads: number;
    downloads: number;
}

interface GetMyProfileResult {
    userId: number;
    username: string;
    displayName: string;
    ownerId: number;
    ownerName?: string;
    isTeams: boolean;
    profileImages: {
        large: string;
        thumbnail: string;
        [key: string]: string;
    };
}

interface GetMyStacksResult {
    results: GetStackResponse[];
    links: {
        [key: string]: Link;
    };
    pageSize: number;
    count?: number;
}

interface GetMyFeaturesResult {
    fullscreenShare: boolean;
    download: boolean;
    detectedLinks: boolean;
    publishedDocumentLimitLeft: Limit;
    unlistedDocumentLimitLeft: Limit;
    sizeUploadLimitMb: Limit;
    pageUploadLimit: Limit;
    publishedDocumentLimit: Limit;
    unlistedDocumentLimit: Limit;
};

export type {
    GetMyPublicationsResult,
    GetMyDraftsResult,
    GetMyStatsResult,
    GetMyProfileResult,
    GetMyStacksResult,
    GetMyFeaturesResult,
};
