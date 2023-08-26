import { FC, ReactNode, RefObject, useRef } from "react";
import { useCoords } from "./use-coords";
import { useElementSize } from "./use-element-size";
import { useElementStyles } from "./use-element-styles";

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

  useElementStyles({
    dragStartOffsets,
    elementRef: draggableRef,
    elementInitialSize,
    mouseCoords: currentMouseCoords,
  });

  return <>{children({ draggableRef })}</>;
};
