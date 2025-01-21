import { BlockAnnotationRenderProps, useEditor } from "@portabletext/editor";
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowRight, X } from "lucide-react";
import { AllSchemaNameKeys } from "~/portableText/schemaDefinition";

const annotationName: AllSchemaNameKeys = "link";

export function Link(props: BlockAnnotationRenderProps) {
  const editor = useEditor();
  const initialValue =
    "value" in props && typeof props.value.url === "string"
      ? props.value.url
      : "";
  const [value, setValue] = useState(initialValue);
  const isActiveBlock = props.selected;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Popover
      open={isActiveBlock}
      onOpenChange={(open) => {
        if (open) {
          // Focus the input when the popover opens
          inputRef.current?.focus();
        } else if (!value) {
          // Remove the annotation if the popover closes with no value
          editor.send({
            type: "annotation.remove",
            annotation: { name: annotationName },
          });
        }
      }}
    >
      <PopoverTrigger>
        <span className="underline text-indigo-600">{props.children}</span>
      </PopoverTrigger>
      <PopoverContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            editor.send({
              type: "annotation.add",
              annotation: {
                name: annotationName,
                value: {
                  url: value,
                },
              },
            });
            editor.send({
              type: "blur",
            });
          }}
          className="flex gap-2"
        >
          <label htmlFor={annotationName} className="sr-only">
            {annotationName}
          </label>
          <Input
            ref={inputRef}
            id={annotationName}
            // type="url"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button disabled={!value} type="submit">
            <span className="sr-only">Add {annotationName}</span>
            <ArrowRight size="4" />
          </Button>
          <Button
            onClick={() => {
              editor.send({
                type: "annotation.remove",
                annotation: { name: annotationName },
              });
              editor.send({
                type: "blur",
              });
            }}
            disabled={!isActiveBlock}
            variant="destructive"
          >
            <span className="sr-only">Remove {annotationName}</span>
            <X size="4" />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
