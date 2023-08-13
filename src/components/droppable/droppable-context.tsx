import { ReactNode, createContext, FC, useState } from "react";

interface ProviderProps {
  children: ReactNode;
}

interface Context {
  currentDraggableElement: null | ReactNode;
  setCurrentDraggableElement: (e: null | ReactNode) => void;
}

const DroppableContext = createContext<Context | undefined>(undefined);

export const DroppableContextProvider: FC<ProviderProps> = ({ children }) => {
  const [currentDraggableElement, setCurrentDraggableElement] =
    useState<null | ReactNode>(null);

  return (
    <DroppableContext.Provider
      value={{ currentDraggableElement, setCurrentDraggableElement }}
    >
      {children}
    </DroppableContext.Provider>
  );
};
