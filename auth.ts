import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [GitHub];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const restrictedPage =
        nextUrl.pathname.endsWith("/new") ||
        nextUrl.pathname.endsWith("/edit") ||
        nextUrl.pathname.startsWith("/images");
      if (restrictedPage) {
        if (!isLoggedIn) {
          const loginUrl = new URL("/login", nextUrl.origin);
          loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
          loginUrl.searchParams.set("reason", "unauthorized");
          return Response.redirect(loginUrl, 307);
        }
        if (auth?.user?.email !== "scott7gilbert@gmail.com") {
          return new Response(
            await fetch(`${nextUrl.origin}/no-access`).then((r) => r.text()),
            {
              status: 403,
              headers: { "Content-Type": "text/html" },
            }
          );
        }
      }

      return true;
    },
    signIn({ profile }) {
      return !!profile?.email && profile.email === "scott7gilbert@gmail.com";
    },
  },
});
