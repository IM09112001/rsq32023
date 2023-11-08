import { Card } from "./Card";
export interface IData {
  name: string;
  url: string;
}

export interface ICard extends IData {
  pokemonSelfApi: {
    sprites: {
      back_default: string;
    };
  };
}

interface ICardListProps {
  data: (ICard | string)[];
  onItemClick: (itemName: string) => void;
}

export const CardList: React.FC<ICardListProps> = ({ data, onItemClick }) => {
  return (
    <ul className="bottom">
      {data.map((card: ICard | string, index: number) => (
        <Card key={index} card={card} onItemClick={onItemClick} />
      ))}
    </ul>
  );
};
