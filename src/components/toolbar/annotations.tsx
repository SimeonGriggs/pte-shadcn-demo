import * as selectors from "@portabletext/editor/selectors";
import { useEditor, useEditorSelector } from "@portabletext/editor";
import {
  AllSchemaNameKeys,
  schemaDefinition,
} from "~/portableText/schemaDefinition";
import { icons } from "~/lib/icons";
import { Toggle } from "../ui/toggle";

export function Annotations() {
  return (
    <div className="flex">
      {schemaDefinition.annotations.map((annotation) => (
        <AnnotationButton key={annotation.name} annotation={annotation} />
      ))}
    </div>
  );
}

type AnnotationButtonProps = {
  annotation: { name: AllSchemaNameKeys };
};

function AnnotationButton({ annotation }: AnnotationButtonProps) {
  const editor = useEditor();
  const active = useEditorSelector(
    editor,
    selectors.isActiveAnnotation(annotation.name)
  );

  return (
    <Toggle
      variant="outline"
      aria-label={`Toggle ${annotation.name}`}
      className="bg-white first:rounded-l-md last:rounded-r-md rounded-none -mr-px last:mr-0"
      pressed={active}
      onClick={() => {
        editor.send({
          type: "annotation.add",
          annotation: {
            name: annotation.name,
            value: {
              url: "",
            },
          },
        });
        editor.send({
          type: "focus",
        });
      }}
    >
      <span className="sr-only">Add {annotation.name}</span>
      {icons[annotation.name]}
    </Toggle>
  );
}
