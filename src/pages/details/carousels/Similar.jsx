import React from 'react';
import useFetch from '../../../hooks/useFetch';
import Carousel from "../../../components/carousel/Carousel"

const Similar =  ({ mediaType , id}) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`)
    const title = mediaType === "tv" ? "Similar Tv Shows" : "Similar Movies"
  return (
    <>
      {
        !(data?.results?.length === 0) && 
          <Carousel 
          title={title}
          data={data?.results}
          loading={loading}
          endPoint={mediaType}
          />
      }
    </>
  )
}

export default Similar