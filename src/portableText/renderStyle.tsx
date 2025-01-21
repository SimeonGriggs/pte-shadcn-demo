import { RenderStyleFunction } from "@portabletext/editor";

export const renderStyle: RenderStyleFunction = (props) => {
  if (props.schemaType.value === "h1") {
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {props.children}
      </h1>
    );
  } else if (props.schemaType.value === "h2") {
    return (
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {props.children}
      </h2>
    );
  } else if (props.schemaType.value === "h3") {
    return (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {props.children}
      </h3>
    );
  } else if (props.schemaType.value === "blockquote") {
    return (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {props.children}
      </blockquote>
    );
  }
  return <>{props.children}</>;
};
