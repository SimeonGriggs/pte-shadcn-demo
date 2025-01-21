import * as selectors from "@portabletext/editor/selectors";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { schemaDefinition } from "~/portableText/schemaDefinition";
import { useEditor, useEditorSelector } from "@portabletext/editor";

export function Styles() {
  const editor = useEditor();
  const activeStyle = useEditorSelector(editor, selectors.getActiveStyle);

  return (
    <Select
      value={activeStyle}
      onValueChange={(style) => {
        editor.send({
          type: "style.toggle",
          style,
        });
        editor.send({
          type: "focus",
        });
      }}
    >
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select style" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {schemaDefinition.styles.map((style) => (
          <SelectItem key={style.name} value={style.name}>
            {style.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
