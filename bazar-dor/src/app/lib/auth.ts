// The package is available at runtime, but its type declarations are not
// currently resolved by this project's TypeScript configuration.
// @ts-expect-error -- better-auth does not expose declarations in this setup.
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const database = new Database("database.sqlite");

export const auth = betterAuth({
  database,
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
  },
});