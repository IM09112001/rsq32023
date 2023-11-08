import React, { ChangeEvent } from "react";

interface ISearchInputProps {
  searchInput: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInputProps: React.FC<ISearchInputProps> = ({
  searchInput,
  handleInputChange,
}) => {
  return (
    <input
      type="text"
      value={searchInput}
      onChange={handleInputChange}
      placeholder="Search for a Pokémon"
    />
  );
};

export { SearchInputProps };
