// This might want to be something we improve. Currently `server` and `components` have to
// import everything from the top level `shared` package - which means here we just have to
// re-export everything. Perhaps we want usage more akin to @guardian/source? i.e
//
// import { EpicProps } from "shared/types"
// import { getFormattedDate } from "shared/lib"

// types
export { EpicProps } from "./types/epicTypes";
export { BannerProps } from "./types/bannerTypes";

// lib
export { getFormattedDate } from "./lib/time";
