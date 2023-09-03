import { ReactElement, createElement, useEffect, useState } from "react";
import { useDroppableContext } from "../droppable/use-droppable-context";

export const DraggableElementPlaceholder = () => {
  const { currentDraggableElement } = useDroppableContext();
  const [elementPlaceholder, setElementPlaceholder] = useState<ReactElement | null>(null);

  useEffect(() => {
    if (currentDraggableElement) {
      const node = currentDraggableElement.cloneNode();
      const { nodeName } = node;

      const width = `${currentDraggableElement.clientWidth}px`;
      const height = `${currentDraggableElement.clientHeight}px`;
      const placeholder = createElement(
        nodeName.toLowerCase(),
        {
          style: {
            width,
            minWidth: width,
            height,
            minHeightheight: height,
          },
        },
        null
      );

      setElementPlaceholder(placeholder);
    } else {
      setElementPlaceholder(null);
    }
  }, [currentDraggableElement]);

  if (!currentDraggableElement || !elementPlaceholder) return null;

  return elementPlaceholder;
};
