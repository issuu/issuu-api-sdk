import { draft } from "./src/controllers/draft.controller";
import { publication } from "./src/controllers/publication.controller";
import { stack } from "./src/controllers/stack.controller";
import { user } from "./src/controllers/user.controller";
import { setToken } from "./src/services/api";

export interface Issuu {
    draft: typeof draft;
    publication: typeof publication;
    stack: typeof stack;
    user: typeof user;
}

const lib: Issuu = {
    draft,
    publication,
    stack,
    user,
};

/**
 * Initialize the Issuu API client.
 * @param token 
 */
const Issuu = (token: string): Issuu => {
    setToken(token);
    return lib;
};

export default Issuu;