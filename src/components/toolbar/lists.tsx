import * as selectors from "@portabletext/editor/selectors";
import { useEditor, useEditorSelector } from "@portabletext/editor";
import { List, ListOrdered } from "lucide-react";
import { schemaDefinition } from "~/portableText/schemaDefinition";
import { Toggle } from "~/components/ui/toggle";
import { useState } from "react";
import { ToggleGroup } from "../ui/toggle-group";

export function Lists() {
  const [value, setValue] = useState(``);

  return (
    <ToggleGroup type="single" value={value} onValueChange={setValue}>
      {schemaDefinition.lists.map((list) => (
        <ListButton key={list.name} list={list} />
      ))}
    </ToggleGroup>
  );
}

const icons: Record<string, JSX.Element> = {
  bullet: <List className="size-4" />,
  number: <ListOrdered className="size-4" />,
};

type ListButtonProps = {
  list: { name: string };
};

function ListButton({ list }: ListButtonProps) {
  const editor = useEditor();
  const active = useEditorSelector(
    editor,
    selectors.isActiveListItem(list.name)
  );

  return (
    <Toggle
      variant="outline"
      aria-label={`Toggle ${list.name} List`}
      className="bg-white first:rounded-l-md last:rounded-r-md rounded-none -mr-px last:mr-0"
      pressed={active}
      onClick={() => {
        editor.send({
          type: "list item.toggle",
          listItem: list.name,
        });
        editor.send({
          type: "focus",
        });
      }}
    >
      <span className="sr-only">Toggle {list.name}</span>
      {icons[list.name]}
    </Toggle>
  );
}
