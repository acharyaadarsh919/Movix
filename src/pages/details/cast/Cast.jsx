import React from 'react'
import { useSelector } from 'react-redux'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImage/Img';
import avatar from "../../../assets/avatar.png";
import "./cast.scss";

const Cast = ({ data, loading}) => {
    const { url } = useSelector(state => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        )
    };

  return (
    <article className='castSection'>
        <ContentWrapper>
            <section className='sectionHeading'>Top Cast</section>
            {!loading ? (
                    <section className="listItems">
                        { data?.map((item) =>{
                            return (
                                <div className="listItem" key={item.id}>
                                    <figure className='profileImg'>
                                        <Img 
                                        src={ url.profile + item.profile_path}
                                        fallBackImage={avatar}
                                        />
                                        <figcaption className='profileCaption'> 
                                            {item.name + " image" } 
                                        </figcaption>
                                    </figure>
                                    <h3 className='names'> {item.name }</h3>
                                </div>
                            )
                        })}
                    </section>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )
            }
        </ContentWrapper>
    </article>
  )
}

export default Cast