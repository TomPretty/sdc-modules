import resolveNode from "@rollup/plugin-node-resolve";
import commonJs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import externalGlobals from "rollup-plugin-external-globals";

const components = [
  { name: "ContributionsEpic" },
  { name: "ContributionsBanner" },
];

function getConfig(component) {
  return {
    input: `src/${component.name}/${component.name}.tsx`,
    output: {
      file: `dist/${component.name}.js`,
      format: "es",
    },
    plugins: [
      resolveNode(),
      commonJs(),
      typescript(),
      externalGlobals({ react: "guardian.automat.react" }),
    ],
  };
}

export default components.map(getConfig);
