import { githubClient } from "./client";
import {
  WhoAmIQuery,
  WhoAmI,
  GetRepoId,
  GetRepoIdQuery,
  GetRepoIdQueryVariables,
  AddStarMutation,
  AddStarMutationVariables,
  AddStar,
} from "./generated/graphql";

async function whoAmI() {
  const result = await githubClient().query<WhoAmIQuery>({
    query: WhoAmI,
  });

  return result.data.viewer.login;
}

async function getBenLimmerDotComRepoId(): Promise<string> {
  const result = await githubClient().query<GetRepoIdQuery, GetRepoIdQueryVariables>({
    query: GetRepoId,
    variables: {
      owner: "blimmer",
      name: "benlimmer.com",
    },
  });

  if (!result.data.repository) {
    throw new Error(`Couldn't find repository id!`);
  }

  return result.data.repository.id;
}

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

  const benLimmerDotComRepoId = await getBenLimmerDotComRepoId();
  await starRepo(benLimmerDotComRepoId);
}

main().catch((e) => console.error(e));
