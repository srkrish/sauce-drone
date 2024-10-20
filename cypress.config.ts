import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: "https://www.saucedemo.com",
        setupNodeEvents(on, config) {
            // Load any environment variables from process.env (CI)
            const usersFromEnv = {
                standard: {
                    username:
                        process.env.STANDARD_USERNAME ||
                        config.env.users?.standard.username,
                    password:
                        process.env.STANDARD_PASSWORD ||
                        config.env.users?.standard.password
                },
                lockedOut: {
                    username:
                        process.env.LOCKEDOUT_USERNAME ||
                        config.env.users?.lockedOut.username,
                    password:
                        process.env.LOCKEDOUT_PASSWORD ||
                        config.env.users?.lockedOut.password
                }
            };

            // Merge the usersFromEnv with the existing config.env (from cypress.env.json)
            config.env.users = usersFromEnv;

            return config;
        }
    }
});
