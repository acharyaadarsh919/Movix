import React from 'react';
import "./topofpage.scss"
import { GoArrowUp } from "react-icons/go";

const TopOfPage = () => {
  return (
    <button className='topofpage' onClick={()=> window.scrollTo({top: 0 , behavior: "smooth"})}>
        <GoArrowUp />
    </button>
  )
}

export default TopOfPage