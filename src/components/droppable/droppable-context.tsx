import { createContext, FC, ReactNode, useState } from "react";

interface ProviderProps {
  children: ReactNode;
}

interface DroppableContextValue {
  currentDraggableElement: null | HTMLLIElement;
  setCurrentDraggableElement: (e: null | HTMLLIElement) => void;
}

export const DroppableContext = createContext<DroppableContextValue | undefined>(
  undefined
);

export const DroppableContextProvider: FC<ProviderProps> = ({ children }) => {
  const [currentDraggableElement, setCurrentDraggableElement] =
    useState<null | HTMLLIElement>(null);

  return (
    <DroppableContext.Provider
      value={{ currentDraggableElement, setCurrentDraggableElement }}
    >
      {children}
    </DroppableContext.Provider>
  );
};
