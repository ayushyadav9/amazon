import React from 'react'
import "./css/header.css"
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingBasket } from '@mui/icons-material';

const Header = () => {
    return (
        <div className = "header">
            <img className="header_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon-logo"></img>
            
            
            <div className="header_search">
                <input className="header_searchInput" type="text"></input>
                <SearchIcon className="header_searchIcon"></SearchIcon>
            </div>


            <div className="header_nav">
                <div className="header_option">
                    <span className="header_option1">Hello Guest</span>
                    <span className="header_option2">Sign In</span>
                </div>
                <div className="header_option">
                    <span className="header_option1">Returns</span>
                    <span className="header_option2">& Orders</span>
                </div>
                <div className="header_option">
                    <span className="header_option1">Your</span>
                    <span className="header_option2">Prime</span>
                </div>
                <div className="header_optionBasket">
                    <ShoppingBasket></ShoppingBasket>
                    <span className="header_option2 header_basketCount">0</span>
                </div>
            </div>
        </div>
    )
}

export default Header
