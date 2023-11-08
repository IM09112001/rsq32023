import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
  ErrorBoundary,
  CardList,
  Container,
  TopSection,
  BottomSection,
  Form,
  Pagination,
} from "../components";
import { fetchData, fetchSearchData, MAIN_URL } from "../utils";
import { useNavigate } from "react-router";

interface Data {
  name: string;
  url: string;
}

interface Card extends Data {
  pokemonSelfApi: {
    sprites: {
      back_default: string;
    };
  };
}

export const MainPage: React.FC = () => {
  const [data, setData] = useState<(Card | string)[]>([]);
  const [prevPage, setPrevPage] = useState<string>("");
  const [nextPage, setNextPage] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [cardsLimit, setCardsLimit] = useState<number>(5);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  //   const location = useLocation();
  const navigate = useNavigate();
  //   const queryParams = new URLSearchParams(location.search);
  //   const currentPage = parseInt(queryParams.get("page") || "1", 10);
  //   console.log(currentPage);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      setSearchInput(savedSearchTerm);
      fetchSearchData(savedSearchTerm, setData, setPrevPage, setNextPage);
    } else {
      fetchData(MAIN_URL, setData, setPrevPage, setNextPage, cardsLimit);
    }
  }, [cardsLimit]);

  const searchHandler = async (event: FormEvent) => {
    event.preventDefault();
    localStorage.setItem("searchTerm", searchInput);
    await fetchSearchData(searchInput, setData, setPrevPage, setNextPage);
    const newPage = 1;
    navigate(`/search/${newPage}?search=${searchInput}`);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleItemsLimit = (event: ChangeEvent<HTMLInputElement>) => {
    const limitValue: number = +event.target.value;
    fetchData(MAIN_URL, setData, setPrevPage, setNextPage, cardsLimit);
    setCardsLimit(limitValue);
    setSearchInput("");
  };

  const handlePaginationClick = (newPage: number) => {
    const newOffset = (newPage - 1) * cardsLimit;
    fetchData(
      MAIN_URL,
      setData,
      setPrevPage,
      setNextPage,
      cardsLimit,
      newOffset,
    );
    const newUrl = `/search/${newPage}`;
    navigate(newUrl);
    setCurrentPage(newPage);
    setSearchInput("");
  };

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
    navigate(`?&details=${itemName}`);
  };

  return (
    <div className="App">
      <Container>
        <ErrorBoundary>
          <div
            className="left_side"
            onClick={() => {
              if (selectedItem) setSelectedItem(null);
            }}
          >
            <TopSection>
              <Form
                cardsLimit={cardsLimit}
                searchInput={searchInput}
                cardsCount={45}
                searchHandler={searchHandler}
                handleInputChange={handleInputChange}
                handleItemsLimit={handleItemsLimit}
              />
              <button
                onClick={() => {
                  throw new Error("Intentional error");
                }}
              >
                Test Error
              </button>
            </TopSection>

            <BottomSection>
              <CardList data={data} onItemClick={handleItemClick} />
              {typeof data !== "string" && data.length >= cardsLimit && (
                <Pagination
                  prevPage={prevPage}
                  nextPage={nextPage}
                  currentPage={currentPage}
                  onPageChange={handlePaginationClick}
                  totalPages={64}
                />
              )}
            </BottomSection>
          </div>

          {selectedItem !== null && (
            <div className="details-section">{selectedItem}</div>
          )}
        </ErrorBoundary>
      </Container>
    </div>
  );
};
