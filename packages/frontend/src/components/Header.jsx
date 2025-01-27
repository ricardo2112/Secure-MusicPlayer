import React from 'react'
import { CiSearch } from "react-icons/ci";
import { PiUser } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-primary">
      <button 
        className="text-white"
        onClick={() => navigate('/')}
      >
        <IoIosArrowBack className='size-8' />
      </button>
    </div>
  );
};

export default Header