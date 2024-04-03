import { draft } from "./src/controllers/draft.controller";
import { publication } from "./src/controllers/publication.controller";
import { stack } from "./src/controllers/stack.controller";
import { user } from "./src/controllers/user.controller";
import { setToken } from "./src/services/api";

const lib = {
    draft,
    publication,
    stack,
    user,
};

/**
 * Initialize the Issuu API client.
 * @param token 
 */
const Issuu = (token: string) => {
    setToken(token);
    return lib;
};

export default Issuu;