import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';

const Header = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.auth)
  const onLogout = () =>{
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <header className="bg-white w-full py-5 ">
      <div className="container flex font-semibold justify-between mx-auto items-center">
        <Link to="/" className="flex gap-1 text-2xl">
          <FaHeadphones className="text-3xl" />
          Support Desk
        </Link>
        <ul className="flex items-center gap-3">
          <Link to="/support" className="rounded-3xl px-3 py-2">
            Support
          </Link>
          {user?<button onClick={onLogout}>Logout</button>:<Link
            to="/login"
            className="border-2 border-gray-900 rounded-3xl px-3 py-2"
          >
            Login
          </Link>}
          
        </ul>
      </div>
    </header>
  );
};

export default Header;
