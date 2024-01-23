import React from 'react';
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending'
import Popular from "./popular/Popular"
import TopRated from "./topRated/TopRated"
import "./home.scss";

const Home = () => {
  return (
    <main className='homepage'>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </main>
  )
}

export default Home