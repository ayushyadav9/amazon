import React,{ useState,useContext } from 'react'
import { Link,useHistory  } from "react-router-dom";
import "./css/login.css"
import orderContext from "./contexts/orderContext"


const Login = (props) => {
  const  context = useContext(orderContext)
  const { setlog,getOrders } = context;
    const [cred, setcred] = useState({email:"",password:""})
    const history = useHistory();

    const onChange = (e)=>{
        setcred({...cred, [e.target.name]: e.target.value})
    }

    const signIn = async (e) => {
        e.preventDefault();
        const btn = document.querySelector(".login__signInButton");
        btn.classList.add("button--loading");
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: cred.email,password: cred.password }),
          });
          const json = await response.json();
          if(json.success){
            localStorage.setItem('token',json.authToken)
            localStorage.setItem('email',cred.email)
            getOrders();
            setlog(true)
            history.push("/")
          }
          else{
            btn.classList.remove("button--loading");
            alert("Invalid Credentials")
            //   props.showAlert("Invalid Credentials","danger")
          }
    }

    const register = async (e) => {
        e.preventDefault();
        const btn = document.querySelector(".login__registerButton");
        btn.classList.add("button--loading");

        const response = await fetch('http://localhost:5000/api/auth/createUser', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: cred.email,password: cred.password }),
          });
          const json = await response.json();
          console.log(json)
          if(json.success){
              localStorage.setItem('token',json.authToken)
              history.push("/") 
          }
          else{
            btn.classList.remove("button--loading");
            alert("Invalid Credentials")
          }
    }
    
    
    return (
        <div className='login'>
            <Link to='/'>
                <img className="login__logo" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt=""/>
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={cred.email} name="email" onChange={onChange} />

                    <h5>Password</h5>
                    <input type='password' value={cred.password} name="password" onChange={onChange} />

                    <button type='submit' onClick={signIn} className='login__signInButton'><span class="button__text">Sign In</span></button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='login__registerButton'><span class="button__text">Create your Amazon Account</span></button>
            </div>
        </div>
    )
}

export default Login
