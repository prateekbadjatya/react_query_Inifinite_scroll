import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetching,  error } = useInfiniteQuery(
    "sw-pepole",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage?.next || undefined,
    }
  );

  /*
      infiiteScroll: loadMore={fetchNextPage}
      hasMore={hasNextpage}
      component takes care of detetecing when to load more
  */
 if(isLoading) {
  return <div className="loading">Loading....</div>
 }
 if(isError) {
  return <div>Error Occured {error.toString()}</div>
 }
 console.log('data', data)
  return  <>
  {isFetching && <div className="loading">Loading....</div> }
  <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage} >
    {
      data?.pages?.map(pagedata=>{
       return  pagedata.results.map(person => {
         return <Person
           hairColor={person.hair_color}
            eyeColor={person.eye_color}
          name={person.name}/>;
        })
      })
    }
  </InfiniteScroll>
  </>
}

/*
Shape of data diffrent than a useQuery
Object with two properties:

 i. pages
 ii. pageParams

 Every quesy has its own element in the pages array(data)
pageParams track the keys of queries that have been retreived
*/

/*
useInfiniteQuery syntax 


pageParams is a parameter passed to the queryFn

useInfiniteQuery("sw-pepole", ({
  pageParam = defaultUrl
})) =>  fetchUrl(pageParam)

Current value of pageParam is maintained by React Query

useInfiniteQuery options
-- getNextPageParam: (lastPage, allPages)
 - Update pageParam

nextQuery is returned as part of the data


useInfiniteQuery return object properties:
fetchNextPage: function to call when user need more data
hasNextPage: based on return value of getNextpageparam, if undefiened, no more data

isfetchingNextPage: for displaying a loading spinner

*/

/*  the flow
compoent mounts: --> ftech  first page ---->
 getNextPageParm(update page param) ---> hasNextPage ----yes --->fetchNextPage

data: undefiend     ,,, const {data} = useInfiniteQuery(...)



useInfiniteQuery Response object format:

{
    "count": 82,
    "next": "https://swapi.dev/api/people/?page=5",
    "previous": "https://swapi.dev/api/people/?page=3",
    "results": [
        {
            "name": "Qui-Gon Jinn",
            "height": "193",
            "mass": "89",
            "hair_color": "brown",
         
        }
       ]
}
*/
