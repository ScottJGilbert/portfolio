import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const auth = betterAuth({
  database: pool,
  user: {
    additionalFields: {
      banned: {
        type: "boolean",
        default: false,
        input: false,
      },
      admin: {
        type: "boolean",
        default: false,
        input: false,
      },
      comments: {
        type: "number",
        defaultValue: 0,
        input: false,
      },
      firstCommentTime: {
        type: "date",
        defaultValue: new Date(),
        input: false,
      },
      deleted: {
        type: "boolean",
        default: false,
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    },
  },
  // advanced: {
  //   cookiePrefix: "portfolio_",
  //   crossSubDomainCookies: {
  //     enabled: true,
  //     domain:
  //       process.env.NODE_ENV === "development"
  //         ? "localhost"
  //         : "portfolio.scottgilbert.dev",
  //   },
  // },
  trustedOrigins:
    process.env.NODE_ENV === "development"
      ? Array.from({ length: 21 }, (_, i) => `http://localhost:${3000 + i}`)
      : [...(process.env.TRUSTED_ORIGINS?.split(",") || [])],
});
