import React from 'react'
import "./css/header.css"
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingBasket } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";
import { auth } from "../firebase";

const Header = () => {
    const [{ basket,user}] = useStateValue();

    const handleAuthenticaton = () => {
        if (user) {
          auth.signOut();
        }
      }
    return (
        <div className = "header">
            <Link to="/"><img className="header_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon-logo"></img></Link>
            
            
            <div className="header_search">
                <input className="header_searchInput" type="text"></input>
                <SearchIcon className="header_searchIcon"></SearchIcon>
            </div>


            <div className="header_nav">
                <Link to='/login'>
                    <div onClick={handleAuthenticaton} className="header_option">
                        <span className="header_option1">Hello {!user ? 'Guest' : user.email}</span>
                        <span className="header_option2">{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>
                {/* {!user && '/orders'} */}
                <Link to='/orders'>
                    <div className="header_option">
                        <span className="header_option1">Returns</span>
                        <span className="header_option2">& Orders</span>
                    </div>
                </Link>
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
