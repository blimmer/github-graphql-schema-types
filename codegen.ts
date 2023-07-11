import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/generated/github-schema-loader.ts",
  documents: ["src/mutations/*.graphql", "src/queries/*.graphql"],
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
        "typescript-operations"
      ],
    },
  },
  require: ["ts-node/register"],
};

export default config;
