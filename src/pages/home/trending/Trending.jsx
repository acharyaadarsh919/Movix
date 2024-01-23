import React from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import "../home.scss";
import SwitchTabs from "../../../components/switchtabs/Switchtabs";
import { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${endPoint}`);

  const onTabChange = (tab) =>{
    setEndPoint(tab === "Day" ? "day" : "week" );
  }

  return (
    <article className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Trending</span>
            <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={ data?.results} loading={ loading } />
    </article>
  )
}

export default Trending