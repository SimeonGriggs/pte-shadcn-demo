import { defineSchema } from "@portabletext/editor";

export const schemaDefinition = defineSchema({
  // Decorators are simple marks that don't hold any data
  decorators: [{ name: "strong" }, { name: "em" }, { name: "code" }],
  // Styles apply to entire text blocks
  // There's always a 'normal' style that can be considered the paragraph style
  styles: [
    { name: "normal", title: "Paragraph" },
    { name: "h1", title: "Heading 1" },
    { name: "h2", title: "Heading 2" },
    { name: "h3", title: "Heading 3" },
    { name: "blockquote", title: "Blockquote" },
  ],

  // The types below are left empty for this example.
  // See the rendering guide to learn more about each type.

  // Annotations are more complex marks that can hold data (for example, hyperlinks).
  annotations: [
    {
      name: "link",
      title: "Link",
    },
  ],
  // Lists apply to entire text blocks as well (for example, bullet, numbered).
  lists: [
    { name: "bullet", title: "Bullet" },
    { name: "number", title: "Number" },
  ],
  // Inline objects hold arbitrary data that can be inserted into the text (for example, custom emoji).
  inlineObjects: [],
  // Block objects hold arbitrary data that live side-by-side with text blocks (for example, images, code blocks, and tables).
  blockObjects: [
    {
      name: "video",
      title: "Video",
    },
  ],
});

// 1. Helper type to extract `name` if it’s a string
type ExtractName<T> = T extends { name: infer N extends string } ? N : never;

// 2. Union of all `name` properties from the schema
export type AllSchemaNameKeys =
  | ExtractName<(typeof schemaDefinition.decorators)[number]>
  | ExtractName<(typeof schemaDefinition.styles)[number]>
  | ExtractName<(typeof schemaDefinition.annotations)[number]>
  | ExtractName<(typeof schemaDefinition.lists)[number]>
  | ExtractName<(typeof schemaDefinition.blockObjects)[number]>;
