import { FC, ReactNode, RefObject, useEffect, useRef, useState } from "react";

interface Props {
  // TODO: fix typization
  children: (params: { draggableRef: RefObject<HTMLLIElement> }) => ReactNode;
}

export const Draggable: FC<Props> = ({ children }) => {
  const draggableRef = useRef<HTMLLIElement>(null);

  const [elementInitialSize, setElementInitialSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [dragStartCoords, setDragStartCoords] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    const draggableElement = draggableRef.current;

    const onCardMouseDown = (e: MouseEvent) => {
      e.preventDefault();

      setDragStartCoords({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      setDragStartCoords({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const onMouseUp = () => {
      setDragStartCoords(null);
    };

    draggableElement?.addEventListener("mousedown", onCardMouseDown);

    if (dragStartCoords) {
      document?.addEventListener("mousemove", onMouseMove);
      document?.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      draggableElement?.removeEventListener("mousedown", onCardMouseDown);
      document?.removeEventListener("mousemove", onMouseMove);
      document?.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragStartCoords]);

  useEffect(() => {
    if (draggableRef.current) {
      draggableRef.current.style.background = dragStartCoords ? "grey" : "";
      draggableRef.current.style.position = dragStartCoords ? "fixed" : "";

      draggableRef.current.style.top = dragStartCoords
        ? `${String(dragStartCoords.y)}px`
        : "";
      draggableRef.current.style.left = dragStartCoords
        ? `${String(dragStartCoords.x)}px`
        : "";

      draggableRef.current.style.width = dragStartCoords
        ? `${elementInitialSize?.width}px`
        : "";
      draggableRef.current.style.height = dragStartCoords
        ? `${elementInitialSize?.height}px`
        : "";
    }
  }, [dragStartCoords, elementInitialSize?.height, elementInitialSize?.width]);

  useEffect(() => {
    if (draggableRef.current) {
      draggableRef.current.classList.add("draggable");
      setElementInitialSize({
        width: draggableRef.current.clientWidth,
        height: draggableRef.current.clientHeight,
      });
    }
  }, []);

  return <>{children({ draggableRef })}</>;
};
