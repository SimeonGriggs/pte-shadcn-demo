import { RenderListItemFunction } from "@portabletext/editor";

export const renderListItem: RenderListItemFunction = (props) => {
  if (props.schemaType.value === "bullet") {
    return <li className="leading-7">{props.children}</li>;
  }

  return <li className="leading-7">{props.children}</li>;
};
