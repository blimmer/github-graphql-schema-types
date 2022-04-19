import { githubClient } from "./client";
import { WhoAmIQuery, WhoAmI } from "./generated/graphql";

async function whoAmI() {
  const result = await githubClient().query<WhoAmIQuery>({
    query: WhoAmI,
  });

  return result.data.viewer.login;
}

async function main() {
  const username = await whoAmI();
  console.info(`Your github username is ${username}`);
}

main();
