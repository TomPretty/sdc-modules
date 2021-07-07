import resolveNode from "@rollup/plugin-node-resolve";
import commonJs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import externalGlobals from "rollup-plugin-external-globals";

export default [
  {
    input: "src/ContributionsEpic/ContributionsEpic.tsx",
    output: {
      file: "dist/ContributionsEpic.js",
      format: "es",
    },
    plugins: [
      resolveNode(),
      commonJs(),
      typescript(),
      externalGlobals({ react: "guardian.automat.react" }),
    ],
  },
  {
    input: "src/ContributionsBanner/ContributionsBanner.tsx",
    output: {
      file: "dist/ContributionsBanner.js",
      format: "es",
    },
    plugins: [
      resolveNode(),
      commonJs(),
      typescript(),
      externalGlobals({ react: "guardian.automat.react" }),
    ],
  },
];
