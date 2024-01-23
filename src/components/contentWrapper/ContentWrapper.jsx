import React from 'react';
import "./contentwrapper.scss"

const ContentWrapper = ({ children }) => {
  return (
    <section className='contentWrapper'>{ children }</section>
  )
}

export default ContentWrapper