import { defineConfig } from "cypress";

export default defineConfig({
    pageLoadTimeout: 6000,
    scrollBehavior: "top",
    e2e: {
        baseUrl: "https://www.saucedemo.com/v1",
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
                },
                problem: {
                    username:
                        process.env.PROBLEM_USERNAME ||
                        config.env.users?.problem.username,
                    password:
                        process.env.PROBLEM_PASSWORD ||
                        config.env.users?.problem.password
                },
                glitch: {
                    username:
                        process.env.GLITCH_USERNAME ||
                        config.env.users?.glitch.username,
                    password:
                        process.env.GLITCH_PASSWORD ||
                        config.env.users?.glitch.password
                }
            };

            // Merge the usersFromEnv with the existing config.env (from cypress.env.json)
            config.env.users = usersFromEnv;

            return config;
        },
        viewportHeight: 1080,
        viewportWidth: 1920
    }
});
