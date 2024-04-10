import IssuuSDK from '../../index';
import { CreateNewDraftRequest, CreateNewStackRequest } from "../../types";

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
const issuu_token: string = process.env.ISSUU_TOKEN!;
const { draft, user, stack, publication } = IssuuSDK(issuu_token);

beforeEach(async () => {
    await new Promise((r) => setTimeout(r, 2000));
});

let slug_draft: string, slug_publication: string, stack_id: string;
describe('Create a draft', () => {
    it('token should be defined', () => {
        expect(issuu_token).toBeDefined();
    });
    
    it('should create a new draft', async () => {
        try {
            const result = await draft.createNewDraft(new_draft);
            slug_draft = result.slug;

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

describe('Create a publication', () => {
    it('should create a new draft', async () => {
        try {
            const draft_data = await draft.createNewDraft(new_draft);
            slug_publication = draft_data.slug;

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
        let is_converted = false;
        while (!is_converted) {
            const found = await draft.getDraftBySlug(slug_publication);
            if (found.fileInfo.conversionStatus === 'DONE') {
                is_converted = true;
            }
        }

        try {
            await draft.publishDraftBySlug(slug_publication);
        } catch (error) {
            console.error('Error publishing draft:', error);
            throw error;
        }
    });
});

describe('Create a stack', () => {
    it('should create a new stack', async () => {
        try {
            const new_stack: CreateNewStackRequest = {
                accessType: 'PUBLIC',
                description: 'This is a test stack',
                title: 'Test Stack',
            };
            stack_id = await stack.createNewStack(new_stack);

            expect(stack_id).toBeDefined();
        } catch (error) {
            console.error('Error creating new stack:', error);
            throw error;
        }
    });
});

describe('Get All Data', () => {
    it('should get my drafts', async () => {
        try {
            const drafts = await user.getMyDrafts();
            expect(drafts).toBeDefined();
            expect(drafts.count).toBeDefined();
            expect(drafts.count).toBeGreaterThanOrEqual(0);
        } catch (error) {
            console.error('Error getting all my drafts:', error);
            throw error;
        }
    });

    it('should get my publicatons', async () => {
        try {
            const publications = await user.getMyPublications();
            expect(publications).toBeDefined();
            expect(publications.count).toBeDefined();
            expect(publications.count).toBeGreaterThanOrEqual(0);
        } catch (error) {
            console.error('Error getting all my publications:', error);
            throw error;
        }
    });

    it('should get my stacks', async () => {
        try {
            const stacks = await user.getMyStacks();
            expect(stacks).toBeDefined();
            expect(stacks.count).toBeDefined();
            expect(stacks.count).toBeGreaterThanOrEqual(0);
        } catch (error) {
            console.error('Error getting all my stacks:', error);
            throw error;
        }
    });

    it('should get my stats', async () => {
        try {
            const stats = await user.getMyStats();
            expect(stats).toBeDefined();
        } catch (error) {
            console.error('Error getting all my stats:', error);
            throw error;
        }
    });

    it('should get my data', async () => {
        try {
            const profile = await user.getMyProfile();
            expect(profile).toBeDefined();
        } catch (error) {
            console.error('Error getting all my data:', error);
            throw error;
        }
    });

    it('should get my features', async () => {
        try {
            const features = await user.getMyFeatures();
            expect(features).toBeDefined();
        } catch (error) {
            console.error('Error getting all my data:', error);
            throw error;
        }
    });
});

describe('Delete a draft', () => {
    it('should delete the draft', async () => {
        try {
            await draft.deleteDraftBySlug(slug_draft);
        } catch (error) {
            console.error('Error deleting draft:', error);
            throw error;
        }
    });
});

describe('Delete a publication', () => {
    it('should delete the publication', async () => {
        try {
            await publication.deletePublicationBySlug(slug_publication);
        } catch (error) {
            console.error('Error deleting publication:', error);
            throw error;
        }
    });
});

describe('Delete a stack', () => {
    it('should delete the stack', async () => {
        try {
            await stack.deleteStack(stack_id);
        } catch (error) {
            console.error('Error deleting stack:', error);
            throw error;
        }
    });
});
