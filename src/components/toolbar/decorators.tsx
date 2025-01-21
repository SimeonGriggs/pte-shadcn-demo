import * as selectors from "@portabletext/editor/selectors";
import { useEditor, useEditorSelector } from "@portabletext/editor";
import {
  AllSchemaNameKeys,
  schemaDefinition,
} from "~/portableText/schemaDefinition";
import { Toggle } from "~/components/ui/toggle";
import { icons } from "~/lib/icons";

export function Decorators() {
  return (
    <div className="flex">
      {schemaDefinition.decorators.map((decorator) => (
        <DecoratorButton key={decorator.name} decorator={decorator} />
      ))}
    </div>
  );
}

type DecoratorButtonProps = {
  decorator: { name: AllSchemaNameKeys };
};

function DecoratorButton({ decorator }: DecoratorButtonProps) {
  const editor = useEditor();
  const active = useEditorSelector(
    editor,
    selectors.isActiveDecorator(decorator.name)
  );

  return (
    <Toggle
      variant="outline"
      aria-label={`Toggle ${decorator.name}`}
      className="bg-white first:rounded-l-md last:rounded-r-md rounded-none -mr-px last:mr-0"
      pressed={active}
      onClick={() => {
        editor.send({
          type: "decorator.toggle",
          decorator: decorator.name,
        });
        editor.send({
          type: "focus",
        });
      }}
    >
      <span className="sr-only">Toggle {decorator.name}</span>
      {icons[decorator.name]}
    </Toggle>
  );
}
