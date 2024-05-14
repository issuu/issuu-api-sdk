import { Limit, Link } from "./common";
import { GetDraftBySlugResponse } from "./draft";
import { GetStackResponse } from "./stack";

type GetMyPublicationsResult = {
    results: GetDraftBySlugResponse[],
    links: {
        [key: string]: Link,
    },
    pageSize: number,
    count?: number,
};

type GetMyDraftsResult = GetMyPublicationsResult;

type GetMyStatsResult = {
    averageTimeSpent: number,
    clicks: number,
    impressions: number,
    reads: number,
};

type GetMyProfileResult = {
    userId: number,
    username: string,
    displayName: string,
    ownerId: number,
    ownerName?: string,
    isTeams: boolean,
    profileImages: {
        large: string,
        thumbnail: string,
        [key: string]: string,
    }
};

type GetMyStacksResult = {
    results: GetStackResponse[];
    links: {
        [key: string]: Link,
    },
    pageSize: number,
    count?: number,
};

type GetMyFeaturesResult = {
    fullscreenShare: boolean,
    download: boolean,
    detectedLinks: boolean,
    publishedDocumentLimitLeft: Limit,
    unlistedDocumentLimitLeft: Limit,
    sizeUploadLimitMb: Limit,
    pageUploadLimit: Limit,
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
