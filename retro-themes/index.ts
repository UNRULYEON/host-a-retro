import { MDXContent } from "mdx/types";

export type ImportedRetroTheme = {
  title: string;
  source: string;
  emoji: string;
  default: MDXContent;
};

const importedRetroThemes = import.meta.glob<ImportedRetroTheme>("./*.mdx", {
  eager: true,
});

export type RetroTheme = {
  id: string | unknown;
} & ImportedRetroTheme;

const retroThemes: RetroTheme[] = Object.entries(importedRetroThemes).map(
  ([path, module]) => ({
    id: path.replace("./", "").replace(".mdx", ""),
    ...module,
  }),
);

export default retroThemes;
