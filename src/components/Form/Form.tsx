import { ChangeEvent, FormEvent } from "react";
import { SearchInputProps } from "./Inputs";

interface IFormProps {
  searchInput: string;
  cardsLimit: number;
  cardsCount: number;
  handleItemsLimit: (event: ChangeEvent<HTMLInputElement>) => void;
  searchHandler: (event: FormEvent) => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Form: React.FC<IFormProps> = ({
  searchInput,
  searchHandler,
  handleInputChange,
  handleItemsLimit,
  cardsLimit,
}: IFormProps) => {
  return (
    <form className="AuthForm" onSubmit={searchHandler}>
      <SearchInputProps
        searchInput={searchInput}
        handleInputChange={handleInputChange}
      />
      <input type="number" value={cardsLimit} onChange={handleItemsLimit} />
      <button type="submit">Search</button>
    </form>
  );
};
