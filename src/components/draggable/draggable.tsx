import { FC, ReactNode, RefObject, useRef } from "react";

interface Props {
  // TODO: fix typization
  children: (params: { draggableRef: RefObject<HTMLLIElement> }) => ReactNode;
}

export const Draggable: FC<Props> = ({ children }) => {
  const draggableRef = useRef<HTMLLIElement | null>(null);

  return <>{children({ draggableRef })}</>;
};
