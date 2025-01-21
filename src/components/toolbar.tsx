import { Button } from "~/components/ui/button";
import { Video } from "lucide-react";

import { Decorators } from "./toolbar/decorators";
import { Styles } from "./toolbar/styles";
import { Lists } from "./toolbar/lists";
import { Annotations } from "./toolbar/annotations";
import { BlockObjects } from "./toolbar/block-objects";

export function Toolbar() {
  return (
    <div className="flex items-center space-x-2">
      <Styles />
      <Decorators />
      <Lists />
      <Annotations />
      <BlockObjects />
    </div>
  );
}
