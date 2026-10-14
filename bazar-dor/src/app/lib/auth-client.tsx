import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    /** Use the current origin so local and deployed auth share the app route. */
    
});

export const { signIn, signUp, signOut, useSession } = authClient;