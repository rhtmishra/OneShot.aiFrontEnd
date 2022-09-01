import React , {useEffect} from 'react'
import './Header.css';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

const Header = () => {

  function animation(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {
    
    animation();
    $(window).on('resize', function(){
      setTimeout(function(){ animation(); }, 500);
    });
    
  }, []);

  return (
  <nav className="navbar navbar-expand-lg navbar-mainbg" style={{display: "flex"}}>
    
      <NavLink className="navbar-brand navbar-logo" to="/" exact>
        College Student Project
      </NavLink>
    
    
      {/* <button 
        className="navbar-toggler"
        onClick={ function(){
          setTimeout(function(){ animation(); });
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button> */}
 
      <div 
        className="collapse navbar-collapse" id="navbarSupportedContent" style={{marginLeft: "auto"}}>
        <ul className="navbar-nav ml-auto">
            
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" exact>
                <i 
                className="fas fa-tachometer-alt">
                </i>Home
              </NavLink>
            </li>

            <li className="nav-item" onClick={() => window.location.replace("/#college")}>
              <NavLink className="nav-link" to="/#college" exact>
                <i 
                className="far fa-address-book">
                </i>College
              </NavLink> 
            </li>

            <li className="nav-item" onClick={() => window.location.replace("/#student")}>
              <NavLink className="nav-link" to="/#student" exact>
                <i 
                className="far fa-clone">
                </i>Students
              </NavLink>
            </li>
            <li className="nav-item" onClick={() => window.location.replace("/#chart")}>
              <NavLink className="nav-link" to="/#chart" exact>
                <i 
                className="far fa-chart-bar">
                </i>Charts
              </NavLink>
            </li>
            
        </ul>
      </div>
  </nav>
  )
}
export default Header;