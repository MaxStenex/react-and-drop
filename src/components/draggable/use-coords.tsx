import { Coords } from "@/types/common";
import { RefObject, useEffect, useState } from "react";

export const useCoords = ({
  elementRef,
}: {
  elementRef: RefObject<HTMLElement>;
}): { dragStartOffsets: Coords | null; currentMouseCoords: Coords | null } => {
  const [currentMouseCoords, setCurrentMouseCoords] = useState<Coords | null>(null);
  const [dragStartOffsets, setDragStartOffsets] = useState<Coords | null>(null);

  useEffect(() => {
    const draggableElement = elementRef.current;

    const onCardMouseDown = (e: MouseEvent) => {
      e.preventDefault();

      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      setCurrentMouseCoords({
        x: e.clientX,
        y: e.clientY,
      });
      setDragStartOffsets({
        x: offsetX,
        y: offsetY,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      setCurrentMouseCoords({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const onMouseUp = () => {
      setCurrentMouseCoords(null);
      setDragStartOffsets(null);
    };

    draggableElement?.addEventListener("mousedown", onCardMouseDown);

    if (currentMouseCoords) {
      document?.addEventListener("mousemove", onMouseMove);
      document?.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      draggableElement?.removeEventListener("mousedown", onCardMouseDown);
      document?.removeEventListener("mousemove", onMouseMove);
      document?.removeEventListener("mouseup", onMouseUp);
    };
  }, [currentMouseCoords, elementRef]);

  return {
    dragStartOffsets,
    currentMouseCoords,
  };
};
