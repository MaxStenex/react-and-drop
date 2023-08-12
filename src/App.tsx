import { FC, useState } from "react";
import { Card } from "@/types/card";
import { cardsData } from "@/utils/cards";

interface CardsListProps {
  items: Card[];
}

const CardsList: FC<CardsListProps> = ({ items }) => {
  return (
    <ul className="max-w-md p-5 bg-gray-500 space-y-3">
      {items.map((i) => (
        <li key={i.id} className="p-3 flex items-start bg-slate-300">
          <img src={i.imageSrc} alt="" className="w-16 h-16 rounded-full mr-5" />
          <div className="flex flex-col">
            <span>{i.text}</span>
            <span className="flex self-end text-gray-700">id: {i.id}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export const App = () => {
  const [itemsData, setItemsData] = useState(cardsData);

  return (
    <div className="min-h-screen bg-slate-600">
      <div className="p-6">
        <CardsList items={itemsData} />
      </div>
    </div>
  );
};
