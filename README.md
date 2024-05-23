# IssuuSDK

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

IssuuSDK is a library that provides a simple way to interact with the Issuu API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [User Methods](#user-methods)
- [Publication Methods](#publication-methods)
- [Stack Methods](#stack-methods)
- [Draft Methods](#draft-methods)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the project, run the following command:

```sh
npm i @issuu/issuu-api-sdk
# or
yarn add @issuu/issuu-api-sdk
```

## Usage

```typescript
import IssuuSDK from '@issuu/issuu-api-sdk';
const issuu_instance = IssuuSDK('your_token');

// using objects
const { user, draft, publication, stack } = issuu_instance;
const user_info = await user.getMyProfile();
```

## User Methods

`getMyDrafts(q: string, page?: number, size?: number, abortController?: AbortController)`: Fetches the drafts of the authenticated user.

`getMyPublications(q: string, state?: 'ALL' | 'PUBLISHED' | 'SCHEDULED' | 'UNLISTED', page?: number, size?: number, abortController?: AbortController)`: Fetches the publications of the authenticated user.

`getMyStacks(showUnlisted?: boolean, offset?: number, size?: number, abortController?: AbortController)`: Fetches the stacks of the authenticated user.

`getMyStats(dateRange?: 'thisMonth' | 'lastMonth' | 'maxTime', slug?: string, abortController?: AbortController)`: Fetches the stats of the authenticated user.

`getMyProfile(abortController?: AbortController)`: Fetches the profile of the authenticated user.

`getMyFeatures(abortController?: AbortController)`: Fetches the features of the authenticated user.

`getAllData(page?: number, size?: number, abortController?: AbortController)`: Fetches all the data of the authenticated user.

## Publication Methods

`getPublicationBySlug(slug: string, abortController?: AbortController)`: Fetches a publication by its slug.

`deletePublicationBySlug(slug: string, abortController?: AbortController)`: Deletes a publication by its slug.

`getPublicationAssetsBySlug(slug: string, assetType: string, size?: 10 | 20 | 40 | 60 | 100, page?: number, documentPageNumber?: number, continuation?: string, abortController?: AbortController)`: Fetches the assets of a publication by its slug.

`getPublicationFullscreenShareBySlug(slug: string, options?: GetPublicationFullscreenShareBySlugRequest, abortController?: AbortController)`: Fetches the fullscreen share of a publication by its slug.

`getPublicationReaderShareBySlug(slug: string, abortController?: AbortController)`: Fetches the reader share of a publication by its slug.

`getPublicationQRCodeShareBySlug(slug: string, options?: GetPublicationQRCodeShareBySlugRequest, abortController?: AbortController)`: Fetches the QR code share of a publication by its slug.

`getPublicationEmbedCodeBySlug(slug: string, options?: GetPublicationEmbedCodeBySlugRequest, abortController?: AbortController)`: Fetches the embed code of a publication by its slug.

## Stack Methods

`createNewStack(stack: CreateNewStackRequest, abortController?: AbortController)`: Creates a new stack.

`getStack(stackId: string, abortController?: AbortController)`: Fetches a stack by its ID.

`deleteStack(stackId: string, abortController?: AbortController)`: Deletes a stack by its ID.

`updateStack(stackId: string, stack: UpdateStackRequest, abortController?: AbortController)`: Updates a stack by its ID.

`getStackItems(stackId: string, options?: GetStackItemsRequest, abortController?: AbortController)`: Fetches the items of a stack by its ID.

`addStackItem(stackId: string, slug: string, abortController?: AbortController)`: Adds an item to a stack by its ID.

`removeStackItem(stackId: string, slug: string, abortController?: AbortController)`: Removes an item from a stack by its ID.

## Draft Methods

`createNewDraft(draft: CreateNewDraftRequest, abortController?: AbortController)`: Creates a new draft.

`getDraftBySlug(slug: string, abortController?: AbortController)`: Fetches a draft by its slug.

`deleteDraftBySlug(slug: string, abortController?: AbortController)`: Deletes a draft by its slug.

`updateDraftBySlug(slug: string, draft: UpdateDraftRequest, abortController?: AbortController)`: Updates a draft by its slug.

`uploadDocumentToDraftBySlug(slug: string, document: UploadDocumentToDraftBySlugRequest, progressCallback?: (progress: number) => void, abortController?: AbortController)`: Uploads a document to a draft by its slug.

`publishDraftBySlug(slug: string, options?: PublishDraftBySlugRequest, abortController?: AbortController)`: Publishes a draft by its slug.

`saveAndUploadDraft(draft: CreateNewDraftRequest | UpdateDraftBySlugRequest, document: UploadDocumentToDraftBySlugRequest, publishAtTheEnd: boolean, progressCallback?: (progress: number) => void, options?: PublishDraftBySlugRequest & { checkConversionStatusTimeout?: number }, abortController?: AbortController)`: Creates or Updates, uploads file, and publishes a draft.

~~`createAndUploadDraft(draft: CreateNewDraftRequest, document: UploadDocumentToDraftBySlugRequest, publishAtTheEnd: boolean, progressCallback?: (progress: number) => void, options?: PublishDraftBySlugRequest, abortController?: AbortController)`: Creates, uploads file, and publishes a draft.~~ (Deprecated)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).