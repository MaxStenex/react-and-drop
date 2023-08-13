import { ReactNode, FC, useRef, RefObject } from "react";

interface Props {
  children: ({
    droppableRef,
  }: {
    // TODO: fix RefObject generic typization
    droppableRef: RefObject<HTMLUListElement>;
  }) => ReactNode;
}

export const Droppable: FC<Props> = ({ children }) => {
  const droppableRef = useRef<HTMLUListElement>(null);

  return <>{children({ droppableRef })}</>;
};
