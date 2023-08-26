import { Coords } from "@/types/common";
import { RefObject, useEffect } from "react";

export const useElementStyles = ({
  elementRef,
  mouseCoords,
  dragStartOffsets,
  elementInitialSize,
}: {
  elementRef: RefObject<HTMLElement> | null;
  mouseCoords: Coords | null;
  dragStartOffsets: Coords | null;
  elementInitialSize: { width: number; height: number } | null;
}): void => {
  useEffect(() => {
    const element = elementRef?.current;

    if (!element) return;

    element.classList.add("draggable");
    element.style.background = mouseCoords ? "grey" : "";
    element.style.position = mouseCoords ? "fixed" : "";
    element.style.margin = mouseCoords ? "0px" : "";

    if (mouseCoords && dragStartOffsets) {
      const top = mouseCoords.y - dragStartOffsets.y;
      const left = mouseCoords.x - dragStartOffsets.x;

      element.style.top = mouseCoords ? `${top}px` : "";
      element.style.left = mouseCoords ? `${left}px` : "";

      element.style.width = mouseCoords ? `${elementInitialSize?.width}px` : "";
      element.style.height = mouseCoords ? `${elementInitialSize?.height}px` : "";
    }
  }, [
    mouseCoords,
    elementInitialSize?.height,
    elementInitialSize?.width,
    dragStartOffsets,
    elementRef,
  ]);
};
