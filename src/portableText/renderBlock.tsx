import { RenderBlockFunction } from "@portabletext/editor";
import { Video } from "~/components/render/video";

export const renderBlock: RenderBlockFunction = (props) => {
  if (props.listItem === "number") {
    return <ol>{props.children}</ol>;
  } else if (props.listItem === "bullet") {
    return <ul>{props.children}</ul>;
  } else if (props.style === "normal") {
    return <p className="leading-7">{props.children}</p>;
  } else if (props.schemaType.name === "video") {
    return <Video {...props} />;
  }

  return <div>{props.children}</div>;
};
