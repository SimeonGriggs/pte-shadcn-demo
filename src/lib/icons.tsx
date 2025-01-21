import { Link, Bold, Italic, Code, Video } from "lucide-react";
import { AllSchemaNameKeys } from "~/portableText/schemaDefinition";

export const icons: Partial<Record<AllSchemaNameKeys, JSX.Element>> = {
  strong: <Bold className="size-4" />,
  em: <Italic className="size-4" />,
  code: <Code className="size-4" />,
  link: <Link className="size-4" />,
  video: <Video className="size-4" />,
};
