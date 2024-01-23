import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import BannerFallbackImg from "../../../assets/fallback-banner-img.jpg";


const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state)=> state.home) 
  
  const { data , loading} = useFetch("/movie/upcoming");
  
  useEffect(()=>{
    const bg = url.backdrop  + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (e) => {
    if(e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  }


  return (
    <section className="heroBanner">
      { !loading &&  
            <figure className='backdrop-img'>
              <Img src={background} fallBackImage={BannerFallbackImg} />  
              <figcaption className='img-caption' >Banner Background Image</figcaption>
            </figure>
      }

      <section className='opacity-layer'></section>

      <ContentWrapper>
        <section className='heroBannerContent'>
          <h1 className='title'>Welcome.</h1>
          <h2 className="subTitle">Millions of movies, TV shows and people to discover. Explore now.</h2>
          <div className="searchInput">
            <input 
            type="text"
            placeholder='Search for a movie or Tv shows...'
            onChange={(e)=> setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            />
            <button onClick={()=>{if(query.length > 0 ) navigate(`/search/${query}`);}}>Search</button>
          </div>
        </section>
      </ContentWrapper>
    </section>
  )
}

export default HeroBanner