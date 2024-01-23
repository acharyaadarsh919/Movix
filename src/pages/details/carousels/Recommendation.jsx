import React from 'react'
import useFetch from '../../../hooks/useFetch';
import Carousel from "../../../components/carousel/Carousel"

const Recommendation = ({ mediaType , id}) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    <>
      {
        !(data?.results?.length === 0) && 
          <Carousel 
          title= "Recommendations"
          data={data?.results}
          loading={loading}
          endPoint={mediaType}
          />
        }
      </>
    )
}

export default Recommendation