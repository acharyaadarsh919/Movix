import React from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import "../home.scss";
import SwitchTabs from "../../../components/switchtabs/Switchtabs";
import { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const TopRated = () => {
  const [endPoint, setEndPoint] = useState("movie");
  const { data, loading } = useFetch(`/${endPoint}/top_rated`);

  const onTabChange = (tab) =>{
    setEndPoint(tab === "Movies" ? "movie" : "tv" );
  }

  return (
    <article className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Top Rated</span>
            <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={ data?.results} loading={ loading } endPoint={endPoint} />
    </article>
  )
}

export default TopRated