import { ArrowRight, X } from "lucide-react";
import { useRef, useState } from "react";
import { useEditor, BlockRenderProps } from "@portabletext/editor";
import { AllSchemaNameKeys } from "~/portableText/schemaDefinition";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const blockObjectName: AllSchemaNameKeys = "video";

export function Video(props: BlockRenderProps) {
  const editor = useEditor();
  const initialValue =
    "url" in props.value && typeof props.value.url === "string"
      ? props.value.url
      : "";
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Popover
      open={props.selected}
      onOpenChange={(open) => {
        if (open) {
          // Focus the input when the popover opens
          inputRef.current?.focus();
        } else if (!value) {
          // Remove the annotation if the popover closes with no value
          // editor.send({
          //   type: "annotation.remove",
          //   annotation: { name: blockObjectName },
          // });
        }
      }}
    >
      <span
        data-selected={props.selected}
        className="w-full flex items-center justify-center bg-slate-50 aspect-video data-[selected='true']:ring-2 ring-indigo-600"
      >
        <PopoverTrigger>
          <img
            src="https://i3.ytimg.com/vi/OGhqfPA_7EY/maxresdefault.jpg"
            className="w-full h-full object-cover"
            alt="Video thumbnail"
          />
        </PopoverTrigger>
      </span>
      <PopoverContent className="w-[--radix-popover-trigger-width]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            editor.send({
              type: "annotation.add",
              annotation: {
                name: blockObjectName,
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
          <label htmlFor={blockObjectName} className="sr-only">
            {blockObjectName}
          </label>
          <Input
            ref={inputRef}
            id={blockObjectName}
            // type="url"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button disabled={!value} type="submit">
            <span className="sr-only">Add {blockObjectName}</span>
            <ArrowRight size="4" />
          </Button>
          <Button
            onClick={() => {
              // editor.send({
              //   type: "annotation.remove",
              //   annotation: { name: annotationName },
              // });
              editor.send({
                type: "blur",
              });
            }}
            disabled={!props.selected}
            variant="destructive"
          >
            <span className="sr-only">Remove {blockObjectName}</span>
            <X size="4" />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
