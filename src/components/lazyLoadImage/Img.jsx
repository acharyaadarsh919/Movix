import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Img = ({ src , className , fallBackImage }) => {
  return (
    <LazyLoadImage
    src={src}
    className={className || ""}
    alt="Image Load Failed"
    effect='blur'
    onError={(e) => {
      e.target.src = fallBackImage;
      e.onError = null;
    }}
    />
  )
}

export default Img