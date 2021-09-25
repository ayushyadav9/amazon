import React,{useContext,useEffect} from 'react'
import "./css/header.css"
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingBasket } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import orderContext from "./contexts/orderContext"

const Header = () => {
    const history=useHistory()
    const  { orders,log,setlog,getOrders } = useContext(orderContext)

    useEffect(() => {
        if(localStorage.getItem('token')){
            getOrders()
        }
        // eslint-disable-next-line
    }, [])

    const handleAuthenticaton = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setlog(false)
        history.push('/')
      }
    return (
        <div className = "header">
            <Link to="/"><img className="header_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon-logo"></img></Link>
            
            
            <div className="header_search">
                <input className="header_searchInput" type="text"></input>
                <SearchIcon className="header_searchIcon"></SearchIcon>
            </div>


            <div className="header_nav">
                <Link to={log?'/':'/login'}>
                    <div className="header_option">
                        <span className="header_option1">Hello {!localStorage.getItem('email') ? 'Guest' : localStorage.getItem('email')}</span>
                        <span className="header_option2" onClick={handleAuthenticaton}>{log?"Sign Out":"Sign In"}</span>
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
                    <span className="header_option2 header_basketCount">{log? orders?.length:0}</span>
                </div></Link>
            </div>
        </div>
    )
}

export default Header
