# SDC modules demo

The aim of this repo is to provide a demo of how we might structure SDC going forward.

## Why?

SDC consists of:

- an `express` app for allocating users into a/b tests for epics/banners/headers,
- the `react` components for the epics/banners/headers themselves.

At present, the code base isn't very clearly delineated. This means it's very easy to introduce bugs by mixing up code that should run on the server with code that should run in the browser. This can happen in very subtle ways due to deeply nested imports e.g [this PR](https://github.com/guardian/support-dotcom-components/pull/482) lead to the entire aws sdk being bundled into the `ContributionsBanner` module through a set of nested imports that was already present in the code base.

This has lots of bad effects, including (but not limited to):

- breaking modules that run in the client
- slowing down build times
- increasing bundle size

We can do better!

## How?

The approach taken by this repo is to separate out the code into 3 distinct projects:

- server (the express app),
- components (the react components),
- shared (all the shared code e.g types).

This gives us nice separation between server code and shared code whilst still allowing us to share as much as possible. We can achieve this using a combination of [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) and [typescript project references](https://www.typescriptlang.org/docs/handbook/project-references.html). Workspaces allow us to manage multiple node packages in a single repo and project references allow us to run a command like:

```bash
tsc --build
```

for the `server` project, and have it automatically build the `shared` project. The overall file structure we get from this setup is a little like:

```bash
.
├── package.json
├── tsconfig.json
├── packages
│   ├── components
│   │   ├── package.json
│   │   ├── src
│   │   └── tsconfig.json
│   ├── server
│   │   ├── package.json
│   │   ├── src
│   │   └── tsconfig.json
│   └── shared
│       ├── package.json
│       ├── src
│       ├── tsconfig.json
```

We have a top level `package.json` that sets up the workspaces:

```json
  "workspaces": [
    "packages/*"
  ],
```

And then each packages inside the `packages` directory has its own `package.json` which is used just like normal. The end result is that we just have a single `yarn.lock` file despite having 3 packages, and all dependencies are installed to a single `node_modules` folder.

The `tsconfig.json`s in the `server` and `components` packages can then include a reference to the `shared` project:

```json
  "references": [{ "path": "../shared" }]
```

Typescript knows to check the `dist` folder in that package to find the code + type declarations. One little bit of friction here is that you need to have built the project at least once for your ide to know what's going on. That's why we have a top level `tsconfig.json` to give us a simple way of building all the projects for the first time. It references all the projects

```json
  "references": [
    { "path": "./packages/server" },
    { "path": "./packages/components" },
    { "path": "./packages/shared" }
  ],
```

but doesn't include any files (it doesn't have any! it's really more of a 'virtual' project)

```json
  "files": [],
  "include": [],
```

This means when we run `tsc --build` at the top level, it will go ahead and build all of the referenced packages - hopefully keeping vscode + intellij happy.

## Snags

At the moment, `server` and `components` just import from the top level `shared` package. This means everything in `shared` needs to be exported from its `index.ts`. This leads to a file that's full of re-exports

```ts
// types
export { EpicProps } from "./types/epicTypes";
export { BannerProps } from "./types/bannerTypes";

// lib
export { getFormattedDate } from "./lib/time";
```

and useage that has to import everything from that file

```ts
import { EpicProps, BannerProps, getFormattedDate } from "shared";
```

This would probably be a little gnarly for the proper SDC code base. Perhaps we would want something more akin to `@guardian/source` that allows for imports from sub paths

```ts
import { EpicProps, BannerProps } from "shared/types";
import { getFormattedDate } from "shared/lib";
```

to try and split it up a little. I'm not sure how this works but we could definitely chat to Simon about it!

Another potential solution is to just use more packages:

```bash
.
├── package.json
├── tsconfig.json
├── packages
│   ├── components
│   ├── server
│   ├── types
│   └── lib
```

I've created another [branch](https://github.com/TomPretty/sdc-modules/tree/more-packages) that goes for this approach. I think it works out quite nicely.
