import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/favicon/logoALMaze.svg';
import '../../../common/style/root.css';

const LogoMark = () => {
  return (
    <Link to='/' className='Center-Objects No-Select'>
      <img
        src={Logo}
        className='Logo-Marks No-Select'
      />
    </Link>
  );
};

export default LogoMark;
