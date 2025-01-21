import { RenderAnnotationFunction } from "@portabletext/editor";

import { Link } from "~/components/render/link";

export const renderAnnotation: RenderAnnotationFunction = (props) => {
  if (props.schemaType.name === "link") {
    return <Link {...props} />;
  }

  return <>{props.children}</>;
};
