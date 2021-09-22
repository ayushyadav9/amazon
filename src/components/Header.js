import React from 'react'
import "./css/header.css"
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingBasket } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useStateValue } from "./context//StateProvider";

const Header = () => {
    const [{ basket}, dispatch] = useStateValue();
    return (
        <div className = "header">
            <Link to="/"><img className="header_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon-logo"></img></Link>
            
            
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
                <Link to ="checkout"><div className="header_optionBasket">
                    <ShoppingBasket></ShoppingBasket>
                    <span className="header_option2 header_basketCount">{basket?.length}</span>
                </div></Link>
            </div>
        </div>
    )
}

export default Header
