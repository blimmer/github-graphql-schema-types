import { githubClient } from "./client";
import { WhoAmIQuery, WhoAmI, AddStarMutation, AddStarMutationVariables, AddStar } from "./generated/graphql";

async function whoAmI() {
  const result = await githubClient().query<WhoAmIQuery>({
    query: WhoAmI,
  });

  return result.data.viewer.login;
}

// !!! New Function !!!
async function starRepo(repoId: string) {
  const result = await githubClient().mutate<AddStarMutation, AddStarMutationVariables>({
    mutation: AddStar,
    variables: {
      starrableId: repoId,
    },
  });

  if (result.errors) {
    throw new Error("Mutation failed!");
  }

  console.info(`The repository now has ${result.data?.addStar?.starrable?.stargazers.totalCount} stargazers!!`);
}

async function main() {
  const username = await whoAmI();
  console.info(`Your github username is ${username}`);

  const benLimmerDotComRepoId = "MDEwOlJlcG9zaXRvcnkxMjUwOTk3OA==";
  await starRepo(benLimmerDotComRepoId);
}

main();
