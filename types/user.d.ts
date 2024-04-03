import { GetDraftBySlugResponse } from "./draft";
import { GetStackResponse } from "./stack";

type GetMyPublicationsResult = {
    results: GetDraftBySlugResponse[],
    links: {
        [key: string]: {
            href: string
        },
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
        [key: string]: {
            href: string
        },
    },
    pageSize: number,
    count?: number,
};

type GetMyFeaturesResult = {
    fullscreenShare: boolean,
    download: boolean,
    detectedLinks: boolean,
    publishedDocumentLimitLeft: number | 'unlimited',
    unlistedDocumentLimitLeft: number | 'unlimited',
    sizeUploadLimitMb: number | 'unlimited',
    pageUploadLimit: number | 'unlimited',
};

export type {
    GetMyPublicationsResult,
    GetMyDraftsResult,
    GetMyStatsResult,
    GetMyProfileResult,
    GetMyStacksResult,
    GetMyFeaturesResult,
};
