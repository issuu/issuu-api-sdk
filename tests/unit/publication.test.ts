import IssuuSDK from '../../index';
import { CreateNewDraftRequest, CreateNewDraftResponse } from '../../types';

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

let draft_data: CreateNewDraftResponse;

beforeEach(async () => {
    await new Promise((r) => setTimeout(r, 3000));
});

describe('Create a normal draft', () => {
    it('token should be defined', () => {
        expect(issuu_token).toBeDefined();
    });

    it('should create a new draft', async () => {
        try {
            draft_data = await draft.createNewDraft(new_draft);

            expect(draft_data).toBeDefined();
            expect(draft_data.slug).toBeDefined();
            expect(draft_data.owner).toBeDefined();
            expect(draft_data.cover).toBeDefined();
            expect(draft_data.fileInfo).toBeDefined();
            expect(draft_data.location).toBeDefined();
            expect(draft_data.created).toBeDefined();

            expect(draft_data.state).toBeDefined();
            expect(draft_data.state).toBe('DRAFT');
        } catch (error) {
            console.error('Error creating new draft:', error);
            throw error;
        }
    });

    it('should publish the draft', async () => {
        const slug = draft_data.slug;
        let is_converted = false;
        while (!is_converted) {
            const found = await draft.getDraftBySlug(slug);
            if (found.fileInfo.conversionStatus === 'DONE') {
                is_converted = true;
            }
        }

        try {
            await draft.publishDraftBySlug(slug);
        } catch (error) {
            console.error('Error publishing draft:', error);
            throw error;
        }
    });
});

describe('Get publication by slug', () => {
    it('should get a publication by slug', async () => {
        try {
            const result = await publication.getPublicationBySlug(draft_data.slug);

            expect(result).toBeDefined();
            expect(result.slug).toBeDefined();
            expect(result.owner).toBeDefined();
            expect(result.cover).toBeDefined();
            expect(result.fileInfo).toBeDefined();
            expect(result.location).toBeDefined();
            expect(result.created).toBeDefined();

            expect(result.state).toBeDefined();
            expect(result.state).toBe('PUBLISHED');
        } catch (error) {
            console.error('Error getting publication by slug:', error);
            throw error;
        }
    });
});

describe('Get publication assets by slug', () => {
    it('should get publication assets by slug', async () => {
        try {
            const result = await publication.getPublicationAssetsBySlug(draft_data.slug, 'image', 10, 1, 1, '');

            expect(result).toBeDefined();
            expect(result.results).toBeDefined();
            expect(result.results.length).toBeGreaterThan(0);
            expect(result.links).toBeDefined();
            expect(result.pageSize).toBeDefined();
        } catch (error) {
            console.error('Error getting publication assets by slug:', error);
            throw error;
        }
    });
});

describe('Get publication fullscreen share by slug', () => {
    it('should get publication fullscreen share by slug', async () => {
        try {
            const result = await publication.getPublicationFullscreenShareBySlug(draft_data.slug, {
                startPage: 1,
                pageLayout: 'single',
                autoflip: true,
                backgroundColor: '#000000',
                logoUrl: 'https://www.issuu.com/logo.png',
                backgroundImageUrl: 'https://www.issuu.com/background.png',
                backgroundImagePosition: 'stretch',
                showOtherPublications: true,
                hideShare: false
            });

            expect(result).toBeDefined();
            expect(result.url).toBeDefined();
        } catch (error) {
            console.error('Error getting publication fullscreen share by slug:', error);
            throw error;
        }
    });
});

describe('Get publication reader share by slug', () => {
    it('should get publication reader share by slug', async () => {
        try {
            const result = await publication.getPublicationReaderShareBySlug(draft_data.slug);

            expect(result).toBeDefined();
            expect(result.url).toBeDefined();
        } catch (error) {
            console.error('Error getting publication reader share by slug:', error);
            throw error;
        }
    });
});

describe('Get publication qr code share by slug', () => {
    it('should get publication qr code share by slug', async () => {
        try {
            const result = await publication.getPublicationQRCodeShareBySlug(draft_data.slug, {
                format: 'PNG',
                fullscreenSettings: {
                    startPage: 1,
                    pageLayout: 'single',
                    autoflip: true,
                    backgroundColor: '#000000',
                    logoUrl: 'https://www.issuu.com/logo.png',
                    backgroundImageUrl: 'https://www.issuu.com/background.png',
                    backgroundImagePosition: 'stretch',
                    showOtherPublications: true,
                    hideShare: false
                }
            });

            expect(result).toBeDefined();
            expect(result.qrCodeUrl).toBeDefined();
        } catch (error) {
            console.error('Error getting publication qr code share by slug:', error);
            throw error;
        }
    });
});

describe('Get publication embed code by slug', () => {
    it('should get publication embed code by slug', async () => {
        try {
            const result = await publication.getPublicationEmbedCodeBySlug(draft_data.slug, {
                responsive: true,
                width: 100,
                height: 100,
                hideIssuuLogo: false,
                hideShareButton: true,
                showOtherPublications: true,
                bgColor: '#891292',
                fullScreenShareBgColor: '#232211'
            });

            expect(result).toBeDefined();
            expect(result.embed).toBeDefined();
        } catch (error) {
            console.error('Error getting publication embed code by slug:', error);
            throw error;
        }
    });
});

describe('Delete publication by slug', () => {
    it('should delete publication by slug', async () => {
        try {
            await publication.deletePublicationBySlug(draft_data.slug);
        } catch (error) {
            console.error('Error deleting publication by slug:', error);
            throw error;
        }
    });
});
