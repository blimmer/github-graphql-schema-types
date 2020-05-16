import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";

import "cross-fetch/polyfill";

export function githubClient(): ApolloClient<NormalizedCacheObject> {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error(
      "You need to provide a Github personal access token as `GITHUB_TOKEN` env variable. See README for more info."
    );
  }

  return new ApolloClient({
    link: new HttpLink({
      uri: "https://api.github.com/graphql",
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }),
    cache: new InMemoryCache(),
  });
}
