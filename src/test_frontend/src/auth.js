// src/test_frontend/src/auth.js
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

// Create a new auth client instance
let authClient;

export const initAuth = async () => {
    authClient = await AuthClient.create();
    return authClient;
};

export const isAuthenticated = async () => {
    if (!authClient) await initAuth();
    return await authClient.isAuthenticated();
};

export const login = async () => {
    if (!authClient) await initAuth();

    return new Promise((resolve) => {
        authClient.login({
            identityProvider: process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app"
            : `http://localhost:4943/?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}`,
            onSuccess: () => {
                resolve(true);
            },
            onError: (error) => {
                console.error("Login failed:", error);
                resolve(false);
            },
        });
    });
};

export const logout = async () => {
    if (!authClient) await initAuth();
    await authClient.logout();
};

export const getIdentity = async () => {
    if (!authClient) await initAuth();
    return authClient.getIdentity();
};

export const createAgent = async () => {
    const identity = await getIdentity();

    return new HttpAgent({
        identity,
        host: process.env.DFX_NETWORK === "ic" ? "https://ic0.app" : "http://localhost:4943",
    });
};
