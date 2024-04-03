import IssuuSDK from '../../index';
import { CreateNewDraftRequest, UpdateDraftBySlugRequest, UploadDocumentToDraftBySlugRequest } from '../../types';

const issuu_token: string = process.env.ISSUU_TOKEN!;
const { draft, publication } = IssuuSDK(issuu_token);
const new_draft: CreateNewDraftRequest = {
    confirmCopyright: true,
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    info: {
        access: 'PUBLIC',
        title: 'Test Draft',
        description: 'This is a test draft from Jest',
        preview: false,
        type: 'book',
        showDetectedLinks: true,
        downloadable: true,
        originalPublishDate: '2021-10-01',
        scheduledTime: undefined
    }
};

let slug: string;
describe('Create a normal draft', () => {
    it('token should be defined', () => {
        expect(issuu_token).toBeDefined();
    });
    
    it('should create a new draft', async () => {
        try {
            const result = await draft.createNewDraft(new_draft);
            slug = result.slug;

            expect(result).toBeDefined();
            expect(result.slug).toBeDefined();
            expect(result.owner).toBeDefined();
            expect(result.cover).toBeDefined();
            expect(result.fileInfo).toBeDefined();
            expect(result.location).toBeDefined();
            expect(result.created).toBeDefined();

            expect(result.state).toBeDefined();
            expect(result.state).toBe('DRAFT');
        }
        catch (error) {
            console.error('Error creating new draft:', error);
            throw error;
        }
    });
});

describe('Find a draft by slug', () => {
    it('should find a draft by slug', async () => {
        try {
            const found = await draft.getDraftBySlug(slug);

            expect(found).toBeDefined();

            expect(found.state).toBeDefined();
            expect(found.state).toBe('DRAFT');
        }
        catch (error) {
            console.error('Error finding draft by slug:', error);
            throw error;
        }
    });
});

describe('Update a draft by slug', () => {
    it('should update a draft by slug', async () => {
        try {
            const updated_draft: UpdateDraftBySlugRequest = {
                info: {
                    title: 'Updated Test Draft',
                    description: 'This is an updated test draft from Jest',
                    downloadable: false,
                }
            };

            const updated = await draft.updateDraftBySlug(slug, updated_draft);

            expect(updated).toBeDefined();
            expect(updated?.slug).toBeDefined();
            expect(updated?.owner).toBeDefined();
            expect(updated?.cover).toBeDefined();
            expect(updated?.fileInfo).toBeDefined();
            expect(updated?.location).toBeDefined();
            expect(updated?.created).toBeDefined();

            expect(updated?.state).toBeDefined();
            expect(updated?.state).toBe('DRAFT')

            expect(updated?.fileInfo).toBeDefined();
            expect(updated?.changes?.title).toBe(updated_draft?.info?.title);
            expect(updated?.changes?.description).toBe(updated_draft?.info?.description);
            expect(updated?.changes?.downloadable).toBe(updated_draft?.info?.downloadable);
        }
        catch (error) {
            console.error('Error updating draft by slug:', error);
            throw error;
        }
    });
});

describe('Upload a document to a draft by slug', () => {
    it('should upload a document to a draft by slug', async () => {
        try {
            const document: UploadDocumentToDraftBySlugRequest = {
                file: new Blob(['This is a test document'], { type: 'text/plain' }),
                confirmCopyright: 'true',
            };

            const uploaded = await draft.uploadDocumentToDraftBySlug(slug, document);

            expect(uploaded).toBeDefined();
            expect(uploaded.fileInfo).toBeDefined();
            expect(uploaded.fileInfo.name).toBeDefined();
            expect(uploaded.fileInfo.type).toBeDefined();
            expect(uploaded.fileInfo.size).toBeDefined();
            expect(uploaded.fileInfo.pageCount).toBeDefined();
            expect(uploaded.fileInfo.conversionStatus).toBeDefined();
        }
        catch (error) {
            console.error('Error uploading document to draft by slug:', error);
            throw error;
        }
    });
});

describe('Delete a draft by slug', () => {
    it('should delete a draft by slug', async () => {
        try {
            await draft.deleteDraftBySlug(slug);

            try {
                const found = await draft.getDraftBySlug(slug);
                expect(found).toBeUndefined();
            } catch (error: any) {
                expect(error?.status).toBe(404);
            }
        }
        catch (error) {
            console.error('Error deleting draft by slug:', error);
            throw error;
        }
    });
});

describe('Publish a draft by slug', () => {
    let publication_slug: string;
    it('should publish a draft by slug', async () => {
        try {
            const onProgress = (progress: number) => {
                console.log('Progress:', progress);
            };

            const published = await draft.createAndUploadDraft(new_draft, {
                confirmCopyright: 'true',
                file: new Blob(['This is a test document'], { type: 'text/plain' }),
            }, true, onProgress, {
                desiredName: 'jest-test-publish-draft-by-slug',  
            });

            publication_slug = published.slug!;

            expect(published).toBeDefined();
            if ('publicLocation' in published && 'location' in published) {
                expect(published.publicLocation).toBeDefined();
                expect(published.location).toBeDefined();
            }

            const found = await draft.getDraftBySlug(publication_slug);

            expect(found).toBeDefined();
            expect(found.state).toBeDefined();
            expect(found.state).toBe('PUBLISHED');
        }
        catch (error: any) {
            console.error('Error publishing draft by slug:', error.response?.data);
            throw error;
        }
    });

    it('should delete the publication', async () => {
        try {
            await publication.deletePublicationBySlug(publication_slug);
        } catch (error) {
            console.error('Error deleting publication:', error);
            throw error;
        }
    });
});
