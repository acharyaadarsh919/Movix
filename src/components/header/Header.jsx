import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

import "./header.scss";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from "../../assets/movix-logo.svg";


const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [location]);

  useEffect(()=>{
    window.addEventListener("scroll", controlNavbar);
    return ()=> window.removeEventListener("scroll", controlNavbar);
  })

  const controlNavbar = ()=>{
    if(window.scrollY > 200) {
      if(window.scrollY > lastScrollY && !mobileMenu ){
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  }

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(prev => !prev);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (e) => {
    if((e.key === "Enter" || e.type === "click") && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  }

  const navigationHandler =(type) => {
    if(type==="movie"){
      navigate("/explore/movie");
    }else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={ logo } alt="Movix" onClick={()=> navigate("/")} />
        </div>

        <ul className="menuItems">
          <li className="item" onClick={()=> navigationHandler('movie')}>Movies</li>
          <li className="item" onClick={()=> navigationHandler('tv')}>Tv Shows</li>
          <li className="item searchIcon" >
            {
              !showSearch ? (<HiOutlineSearch onClick={openSearch} />) : (<VscChromeClose onClick={()=> setShowSearch(false)} />)
            }
            
            </li>
        </ul>

        <div className="mobileMenuItems">
          {
            !showSearch ? (<HiOutlineSearch onClick={openSearch} />) : (<VscChromeClose onClick={()=> setShowSearch(false)} />)
          }
          { 
          mobileMenu ? ( 
            <VscChromeClose onClick={()=> setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      
      {
      showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input type="text" 
              placeholder='Search for Movie or Tv Show...'
              onChange={(e)=> setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              />
              <HiOutlineSearch 
                onClick={(e)=>{
                  searchQueryHandler(e)
                }} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header> 
  )
}

export default Header