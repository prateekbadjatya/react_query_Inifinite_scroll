import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";

const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {

  const {
    data, fetchNextPage, hasNextPage, isLoading, isError, isFetching,  error 
  }
   = useInfiniteQuery(
    'sw-species',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage?.next || undefined,
    }
  )

  if(isLoading) {
    return <div className="loading">Loading....</div>
   }
   if(isError) {
    return <div>Error Occured {error.toString()}</div>
   }

  return  <>
   {isFetching && <div className="loading">Loading....</div> }
   <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage} >
   {
      data?.pages?.map(pagedata=>{
       return  pagedata.results.map(species => {
         return <Species
          name={species.name}
          language={species.language}
        //  name, language, 
        averageLifespan={species.average_lifespan}
          />;
        })
      })
    }

   </InfiniteScroll>
  </>
}
