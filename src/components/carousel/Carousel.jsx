import React , { useRef } from 'react';
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill
} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from "dayjs";
import Img from '../lazyLoadImage/Img';
import PosterFallBack from "../../assets/no-poster.png";
import "./carousel.scss";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';

const Carousel = ({ title , data , loading , endPoint}) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (direction) => {
        const container = carouselContainer.current;
        const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20) :  container.scrollLeft + (container.offsetWidth + 20) ;
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    }

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton">
                    <div className="textBlock">
                        <div className="title skeleton"></div>
                        <div className="date skeleton"></div>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <>
    {
        !!title && (
            <section className="title">
                <ContentWrapper>
                    <span className='carouselName'> {title} </span>
                </ContentWrapper>
            </section>
        )
    }
    <section className='carousel'>
        <ContentWrapper>
            <BsFillArrowLeftCircleFill className='arrow carouselLeftNav' onClick={()=> navigation("left")} />
            <BsFillArrowRightCircleFill className='arrow carouselRighttNav' onClick={()=> navigation("right")} />
            {
                !loading ? (
                    <section className="carouselItems" ref={carouselContainer}>
                        { data?.map((item) => {
                            return (
                                <section className="carouselItem" key={item.id} onClick={()=>navigate(`/${item.media_type || endPoint}/${item.id}`)} >
                                    <figure className='posterBlock'>
                                        <Img src={ url.poster + item.poster_path } fallBackImage={ PosterFallBack } />
                                        <figcaption className='img-caption'>
                                            { 
                                            (item.title ? item.title : item.name )  + " Poster" 
                                            }
                                        </figcaption>
                                        <CircleRating rating={ item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids.slice(0,2)} />
                                    </figure>
                                    <div className="textBlock">
                                        <h3 className="title"> {item.title || item.name} </h3>
                                        <time dateTime={item.release_date} className="date"> {dayjs(item.release_date).format("MMM DD, YYYY")} </time>
                                    </div>
                                </section>
                            )
                        })}
                    </section>
                ) : (
                    <section className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </section>
                )
            }
        </ContentWrapper>
    </section>
    </>
  )
}

export default Carousel