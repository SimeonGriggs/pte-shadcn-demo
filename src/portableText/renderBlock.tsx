import { RenderBlockFunction } from "@portabletext/editor";

export const renderBlock: RenderBlockFunction = (props) => {
  if (props.listItem === "number") {
    return <ol>{props.children}</ol>;
  } else if (props.listItem === "bullet") {
    return <ul>{props.children}</ul>;
  } else if (props.style === "normal") {
    return (
      <p className="leading-7 [&:not(:first-child)]:mt-6">{props.children}</p>
    );
  } else if (props.schemaType.name === "video") {
    return <div className="p-12 bg-red-500">{JSON.stringify(props.value)}</div>;
  }

  return <div>{props.children}</div>;
};
