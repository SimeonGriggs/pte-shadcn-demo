import * as selectors from "@portabletext/editor/selectors";
import { useEditor, useEditorSelector } from "@portabletext/editor";
import {
  AllSchemaNameKeys,
  schemaDefinition,
} from "~/portableText/schemaDefinition";
import { icons } from "~/lib/icons";
import { Toggle } from "../ui/toggle";

export function BlockObjects() {
  return (
    <div className="flex">
      {schemaDefinition.blockObjects.map((blockObject) => (
        <BlockObjectButton key={blockObject.name} blockObject={blockObject} />
      ))}
    </div>
  );
}

type BlockObjectButtonProps = {
  blockObject: { name: AllSchemaNameKeys };
};

function BlockObjectButton({ blockObject }: BlockObjectButtonProps) {
  const editor = useEditor();
  const active = useEditorSelector(
    editor,
    selectors.isActiveDecorator(blockObject.name)
  );

  return (
    <Toggle
      variant="outline"
      aria-label={`Toggle ${blockObject.name}`}
      className="bg-white first:rounded-l-md last:rounded-r-md rounded-none -mr-px last:mr-0"
      pressed={active}
      onClick={() => {
        editor.send({
          type: "insert.block object",
          placement: "auto",
          blockObject: {
            name: blockObject.name,
            value: {
              url: "https://www.youtube.com/watch?v=OGhqfPA_7EY",
            },
          },
        });
        editor.send({
          type: "focus",
        });
      }}
    >
      <span className="sr-only">Add {blockObject.name}</span>
      {icons[blockObject.name] || blockObject.name}
    </Toggle>
  );
}
