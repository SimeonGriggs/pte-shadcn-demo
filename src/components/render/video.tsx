import { ArrowRight, X } from "lucide-react";
import { useRef } from "react";
import { useEditor, BlockRenderProps } from "@portabletext/editor";
import { AllSchemaNameKeys } from "~/portableText/schemaDefinition";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import getYouTubeId from "get-youtube-id";

const blockObjectName: AllSchemaNameKeys = "video";

export function Video(props: BlockRenderProps) {
  const editor = useEditor();
  const initialValue =
    "url" in props.value && typeof props.value.url === "string"
      ? props.value.url
      : "";
  const inputRef = useRef<HTMLInputElement>(null);
  const youtubeId = getYouTubeId(initialValue);

  return (
    <Popover
      open={props.selected}
      onOpenChange={(open) => {
        if (open && !initialValue) {
          // Focus the input when the popover opens
          inputRef.current?.focus();
        } else if (!initialValue) {
          // Remove the annotation if the popover closes with no value
          editor.send({
            type: "annotation.remove",
            annotation: { name: blockObjectName },
          });
        }
      }}
    >
      <span
        data-selected={props.selected}
        className="w-full flex items-center justify-center bg-slate-50 aspect-video data-[selected='true']:ring-2 ring-indigo-600 relative"
      >
        <PopoverTrigger className="w-full h-full">
          {youtubeId ? (
            <img
              src={`https://i3.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
              className="w-full h-full object-cover"
              alt="Video thumbnail"
              onError={(e) => {
                // If maxresdefault fails, fall back to hqdefault
                const img = e.target as HTMLImageElement;
                if (img.src.includes("maxresdefault")) {
                  img.src = `https://i3.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
              Enter a YouTube URL
            </div>
          )}
        </PopoverTrigger>
      </span>
      <PopoverContent className="w-[--radix-popover-trigger-width]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            editor.send({
              type: "patches",
              snapshot: [props.value],
              patches: [
                {
                  type: "set",
                  path: props.path,
                  value: {
                    _type: "video",
                    url: initialValue,
                  },
                },
              ],
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
            value={initialValue}
            onChange={(e) => {
              editor.send({
                type: "block.set",
                at: [{ _key: props.value._key }],
                value: {
                  url: e.target.value,
                },
              });
            }}
          />
          <Button disabled={!initialValue} type="submit">
            <span className="sr-only">Add {blockObjectName}</span>
            <ArrowRight size="4" />
          </Button>
          <Button
            onClick={() => {
              editor.send({
                type: "patches",
                snapshot: [props.value],
                patches: [{ type: "unset", path: props.path }],
              });
              editor.send({
                type: "blur",
              });
            }}
            // disabled={!props.selected}
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
