import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  site: process.env.SITE || "http://localhost:3000/",
  // Configure one or more authentication providers
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    // ...add more providers here
  ],

  session: {
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    signIn: async (user, account, profile) => {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return Promise.resolve(true);
      } else {
        // Return false to display a default error message
        //   return Promise.resolve(false)
        // You can also Reject this callback with an Error or with a URL:
        // return Promise.reject(new Error('error message')) // Redirect to error page
        return Promise.reject("http://localhost:3000/"); // Redirect to a URL
      }
    },
    redirect: async (url, baseUrl) => {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
    session: async (session, user, sessionToken) => {
      session.foo = "bar"; // Add property to session
      return Promise.resolve(session);
    },
  },

  events: {
    signIn: async (message) => {
      "sei loggato";
    },
    signOut: async (message) => {
      "sei sloggato";
    },
  },

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
