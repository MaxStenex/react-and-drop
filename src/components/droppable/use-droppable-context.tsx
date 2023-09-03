import { useContext } from "react";
import { DroppableContext } from "./droppable-context";

export const useDroppableContext = () => {
  const context = useContext(DroppableContext);

  if (!context) throw new Error("Droppable context used outside provider");

  return context;
};
