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
    "star-wars-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (currentPage) => currentPage.next || undefined,
    }
  );
  if (isLoading) return <h3 className="loading">loading..</h3>;
  if (isError) return <h3 className="loading">Error : {error.toString()}</h3>;
  // loadMore & hasMore are two props for InfiniteScroll
  return (
    <>
      {isFetching && <h3 className="loading">fetching..</h3>}
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
