import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import "./searchresult.scss";
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import noResults from "../../assets/no-results.png";
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/Moviecard';



const SearchResult = () => {
  const [ data , setData] = useState(null);
  const [pageNo , setPageNo] = useState(1);
  const [ loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNo}`).then((res)=>{
      setData(res);
      setPageNo((prev) => prev + 1);
      setLoading(false);
    })
  };

  const fetchNextData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNo}`).then((res)=>{
      if(data?.results){
        setData({
          ...data , 
          results : [...data?.results , ...res.results]
        })
      } else {
        setData(res);
      }
      setPageNo((prev) => prev + 1);
    })
  }

  useEffect(()=>{
    setPageNo(1);
    fetchInitialData();
  }, [query]);

  return (
    <article className='searchResultsPage'>
      { loading && <Spinner initial={true} /> }
      { !loading && (
          <ContentWrapper>
            {
              data?.results?.length > 0 ? (
                <>
                  <section className='pageTitle'>
                    {`Search ${data?.total_results > 1 ? "results" : "result"} for '${query}'`}
                  </section>
                  <InfiniteScroll
                    className='content'
                    dataLength={ data?.results?.length || [] }
                    next={fetchNextData}
                    hasMore={pageNo <= data?.total_pages}
                    loader={<Spinner />}
                  >
                  {data?.results?.map((item, index)=>{
                    if(item.media_type === "person") return;
                    return (
                      <MovieCard key={index} data={item} fromSearch={true} mediaType={item.media_type} />
                    )
                    })}
                  </InfiniteScroll>
                </>
              ) : (
                <span className="resultNotFound"> No Results Found!</span>
              )
            }
          </ContentWrapper>
        )
      }
    </article>
  )
}

export default SearchResult