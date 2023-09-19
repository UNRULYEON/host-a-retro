import { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: (props) => <h1 className="mb-4 text-4xl font-bold" {...props} />,
  h2: (props) => <h2 className="mb-4 text-3xl font-bold" {...props} />,
  p: (props) => <p className="mb-4 text-lg" {...props} />,
  ol: (props) => <ol className="mb-2 ml-5 list-decimal text-lg" {...props} />,
  ul: (props) => <ul className="mb-2 ml-5 list-disc text-lg" {...props} />,
  li: (props) => <li className="mb-1 text-lg" {...props} />,
};

export default components;
