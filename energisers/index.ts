import { MDXContent } from "mdx/types";

export type ImportedEnergiser = {
  title: string;
  source: string;
  default: MDXContent;
};

const importedEnergisers = import.meta.glob<ImportedEnergiser>("./*.mdx", {
  eager: true,
});

export type Energiser = {
  id: string | unknown;
} & ImportedEnergiser;

const energisers: Energiser[] = Object.entries(importedEnergisers).map(
  ([path, module]) => ({
    id: path.replace("./", "").replace(".mdx", ""),
    ...module,
  }),
);

export default energisers;
