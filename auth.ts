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

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const restrictedPage =
        nextUrl.pathname.endsWith("/new") || nextUrl.pathname.endsWith("/edit");
      if (restrictedPage) {
        if (!isLoggedIn) {
          const loginUrl = new URL("/login", nextUrl.origin);
          loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
          loginUrl.searchParams.set("extraMessage", "true");
          return Response.redirect(loginUrl, 302);
        }
        if (auth?.user?.email !== "scott7gilbert@gmail.com") {
          const noAccessUrl = new URL("/no-access", nextUrl.origin);
          return Response.redirect(noAccessUrl, 302);
        }
      }

      return true;
    },
  },
});
