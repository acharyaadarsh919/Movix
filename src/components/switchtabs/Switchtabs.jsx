import React from 'react'
import { useState } from 'react';
import "./switchtabs.scss";

const Switchtabs = ({data, onTabChange}) => {
  const [selected, setSelected] = useState(0);
  const [left, setLeft] =useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelected(index);
    }, 300);
    onTabChange(tab);
  }

  return (
    <div className='switchingTabs'>
        <div className="tabItems">
          { data.map((tab, index)=> (
              <span 
              key={index} 
              className={`tabItem ${selected === index ? "active" : ""}`}
              onClick={()=> activeTab(tab, index)}
              >
                { tab }
              </span>
          ))
        }
        <span className="movingBg" style={{left}}></span>
        </div>
    </div>
  )
}

export default Switchtabs