import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    data,
    isFetching,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "star-wars-species", // dependencies keys
    ({ pageParam = initialUrl }) => fetchUrl(pageParam), // query function managed by useInfiniteQuery
    {
      getNextPageParam: (currentPage) => currentPage.next || undefined,
      // This option helps in maintaing the pageParam for the next fetch.
      // currentPage.next will give the next url otherwise it will be undefined if there is no next page.
    }
  );

  if (isLoading) return <h3 className="loading">Loading...</h3>;
  if (isError) return <h3 className="error">Error: {error.message}</h3>;

  return (
    <>
      {isFetching && <h3 className="fetching">fetching...</h3>}

      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((species) => {
            return (
              <Species
                key={species.name}
                name={species.name}
                language={species.language}
                averageLifespan={species.average_lifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
