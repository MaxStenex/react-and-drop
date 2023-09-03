import { FC, ReactNode, RefObject, useEffect, useRef } from "react";
import { useCoords } from "./use-coords";
import { useElementSize } from "./use-element-size";
import { useElementStyles } from "./use-element-styles";
import { useDroppableContext } from "../droppable/use-droppable-context";

interface Props {
  // TODO: fix typization
  children: (params: { draggableRef: RefObject<HTMLLIElement> }) => ReactNode;
}

export const Draggable: FC<Props> = ({ children }) => {
  const draggableRef = useRef<HTMLLIElement>(null);

  const { currentMouseCoords, dragStartOffsets } = useCoords({
    elementRef: draggableRef,
  });
  const elementInitialSize = useElementSize({ elementRef: draggableRef });
  const { setCurrentDraggableElement } = useDroppableContext();

  useElementStyles({
    dragStartOffsets,
    elementRef: draggableRef,
    elementInitialSize,
    mouseCoords: currentMouseCoords,
  });

  useEffect(() => {
    if (dragStartOffsets) {
      setCurrentDraggableElement(draggableRef.current);
    } else {
      setCurrentDraggableElement(null);
    }
  }, [dragStartOffsets, setCurrentDraggableElement]);

  return <>{children({ draggableRef })}</>;
};
