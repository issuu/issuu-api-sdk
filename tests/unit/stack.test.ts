import IssuuSDK from '../../index';
import { CreateNewDraftRequest, CreateNewStackRequest, GetStackItemsResponse } from '../../types';

const issuu_token: string = process.env.ISSUU_TOKEN!;
const { stack, draft, publication } = IssuuSDK(issuu_token);
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
        scheduledTime: undefined
    }
};

let slug: string, stack_id: string;

describe('Stack endpoints', () => {    
    it('should test all stack endpoints', async () => {
        expect(issuu_token).toBeDefined();

        try {
            const draft_data = await draft.createNewDraft(new_draft);
            slug = draft_data.slug;
    
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
    
        let is_converted = false;
        while (!is_converted) {
            const found = await draft.getDraftBySlug(slug);
            if (found.fileInfo.conversionStatus === 'DONE') {
                is_converted = true;
            }
        }
    
        try {
            await draft.publishDraftBySlug(slug);
        } catch (error: any) {
            console.error('Error publishing draft:', error.response.data);
            throw error;
        }

        try {
            await new Promise((r) => setTimeout(r, 2000));
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

        try {
            const found_stack = await stack.getStack(stack_id);

            expect(found_stack).toBeDefined();
            expect(found_stack.id).toBeDefined();
            expect(found_stack.id).toBe(stack_id);
        } catch (error) {
            console.error('Error getting stack by id:', error);
            throw error;
        }

        try {
            let is_added = false,
                items: GetStackItemsResponse = await stack.getStackItems(stack_id, { includeUnlisted: true });

            while (!is_added) {
                try {
                    await new Promise((r) => setTimeout(r, 2000));
                    await stack.addStackItem(stack_id, slug);
                } catch (error: any) {}
                items = await stack.getStackItems(stack_id, { includeUnlisted: true });
                if (items.results?.length > 0) {
                    is_added = true;
                }
            }

            expect(items).toBeDefined();
            expect(items.results).toBeDefined();
            expect(items.pageSize).toBeDefined();

            expect(items.results?.length).toBeGreaterThan(0);
            expect(items.pageSize).toBeGreaterThan(0);
        } catch (error: any) {
            console.error('Error adding stack item:', error);
            throw error;
        }

        try {
            await stack.removeStackItem(stack_id, slug);
        } catch (error) {
            console.error('Error removing stack item:', error);
            throw error;
        }

        try {
            const updated_stack = await stack.updateStack(stack_id, {
                accessType: 'UNLISTED',
                description: 'This is an updated test stack',
                title: 'Updated Test Stack',
            });

            expect(updated_stack).toBeDefined();
            expect(updated_stack.id).toBeDefined();
            expect(updated_stack.id).toBe(stack_id);
            expect(updated_stack.accessType).toBeDefined();
            expect(updated_stack.accessType).toBe('UNLISTED');
            expect(updated_stack.description).toBeDefined();
            expect(updated_stack.description).toBe('This is an updated test stack');
            expect(updated_stack.title).toBeDefined();
            expect(updated_stack.title).toBe('Updated Test Stack');
        } catch (error) {
            console.error('Error updating stack:', error);
            throw error;
        }

        try {
            await stack.deleteStack(stack_id);
        } catch (error) {
            console.error('Error deleting stack:', error);
            throw error;
        }

        try {
            await publication.deletePublicationBySlug(slug);
        } catch (error) {
            console.error('Error deleting draft:', error);
            throw error;
        }
    });
});
