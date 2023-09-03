import { Draggable } from "@/components/draggable/draggable";
import { DraggableElementPlaceholder } from "@/components/draggable/placeholder";
import { Droppable } from "@/components/droppable/droppable";
import { DroppableContextProvider } from "@/components/droppable/droppable-context";
import { Card } from "@/types/card";
import { cardsData } from "@/utils/cards";
import { FC, useState } from "react";

interface Props {}

export const CardsList: FC<Props> = () => {
  const [items, setItems] = useState<Card[]>(cardsData);

  return (
    <DroppableContextProvider>
      <Droppable>
        {({ droppableRef }) => (
          <ul
            className="max-w-md p-5 bg-gray-500 space-y-3 mx-auto mt-4"
            ref={droppableRef}
          >
            {items.map((i) => (
              <Draggable key={i.id}>
                {({ draggableRef }) => (
                  <li className="p-3 flex items-start bg-slate-300" ref={draggableRef}>
                    <img
                      src={i.imageSrc}
                      alt=""
                      className="w-16 h-16 rounded-full mr-5"
                    />
                    <div className="flex flex-col">
                      <span>{i.text}</span>
                      <span className="flex self-end text-gray-700">id: {i.id}</span>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            <DraggableElementPlaceholder />
          </ul>
        )}
      </Droppable>
    </DroppableContextProvider>
  );
};
