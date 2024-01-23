import React from 'react';
import "./details.scss";
import DetailsBanner from './detailsBanner/DetailsBanner';
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Cast from './cast/Cast';
import VideosSection from './videosection/VideosSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';

const Details = () => {
  const { mediaType , id} = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data : credits, loading : creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
  
  return (
    <main>
      <DetailsBanner video={ data?.results[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      {
        !(data?.results?.length === 0) && <VideosSection data={data} loading={loading} /> 
      }
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </main>
  )
}

export default Details