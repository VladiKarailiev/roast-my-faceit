// Twitter (X) cards reuse the same image as Open Graph. Next requires the
// route-level config (runtime / size / contentType / alt) to be declared
// directly in this file — re-exporting them from another module isn't
// detected. Only the default export can be aliased.
import OpenGraphImage from "./opengraph-image";

export const runtime = "edge";
export const alt = "Roast My FACEIT — Wrapped-style CS2 stat roast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OpenGraphImage;
