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

interface ICardProps {
  card: ICard | string;
  onItemClick: (itemName: string) => void;
}

export const Card: React.FC<ICardProps> = ({ card, onItemClick }) => {
  const cardRender =
    typeof card === "string" ? (
      <p key={card}>{card}</p>
    ) : (
      <li key={card.name} onClick={() => onItemClick(card.name)}>
        <img src={card.pokemonSelfApi.sprites.back_default} alt={card.name} />
        <h2>{card.name}</h2>
      </li>
    );
  return cardRender;
};
