import {
  EditorEventListener,
  EditorProvider,
  PortableTextBlock,
  PortableTextEditable,
} from "@portabletext/editor";
import { coreBehaviors } from "@portabletext/editor/behaviors";
import { useState } from "react";
import { Toolbar } from "~/components/toolbar";
import { DEFAULT_VALUE } from "~/lib/constants";
import { renderAnnotation } from "~/portableText/renderAnnotation";
import { renderBlock } from "~/portableText/renderBlock";
import { renderDecorator } from "~/portableText/renderDecorator";
import { renderListItem } from "~/portableText/renderListItem";
import { renderStyle } from "~/portableText/renderStyle";
import { schemaDefinition } from "~/portableText/schemaDefinition";
import "./App.css";

export default function Home() {
  const [value, setValue] = useState<PortableTextBlock[]>(DEFAULT_VALUE);

  return (
    <div className="flex bg-slate-100 p-8 justify-center min-h-screen w-screen">
      <div className="flex flex-col gap-4 w-[600px]">
        <EditorProvider
          initialConfig={{
            schemaDefinition,
            initialValue: value,
            behaviors: coreBehaviors,
          }}
        >
          <EditorEventListener
            on={(event) => {
              if (event.type === "mutation" && event.value) {
                setValue(event.value);
              }
            }}
          />
          <Toolbar />
          {/* <ToolbarFloating /> */}

          <PortableTextEditable
            // className="focus:outline-none"
            className="w-full rounded-md border border-input bg-transparent p-4 text-lg shadow-inner transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-white flex flex-col gap-y-4"
            renderAnnotation={renderAnnotation}
            renderStyle={renderStyle}
            renderDecorator={renderDecorator}
            renderBlock={renderBlock}
            renderListItem={renderListItem}
          />
        </EditorProvider>
        <div className="prose">
          <pre>{value ? JSON.stringify(value, null, 2) : null}</pre>
        </div>
      </div>
    </div>
  );
}
