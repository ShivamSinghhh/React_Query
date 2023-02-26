import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "star-wars-peoples",  // dependencies keys
    ({ pageParam = initialUrl }) => fetchUrl(pageParam), // query function managed by useInfiniteQuery
    {
      getNextPageParam: (currentPage) => currentPage.next || undefined,
      // This option helps in maintaing the pageParam for the next fetch.
      // currentPage.next will give the next url otherwise it will be undefined if there is no next page.

    }
  );
  if (isLoading) return <h3 className="loading">loading..</h3>;
  if (isError) return <h3 className="error">Error : {error.toString()}</h3>;
  // loadMore & hasMore are two props for InfiniteScroll
  return (
    <>
      {isFetching && <h3 className="fetching">fetching..</h3>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((people) => {
            return (
              <Person
                key={people.name}
                name={people.name}
                hairColor={people.hair_color}
                eyeColor={people.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
