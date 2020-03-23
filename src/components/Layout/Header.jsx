import React from 'react';
import './Header.css';
import Navbar from 'react-bootstrap/Navbar';
import covidImg from './Images/covid19Icon.png';
import Button from 'react-bootstrap/Button';

const Header = ({ lastUpdated, handleManageTimeout }) => (
  <Navbar bg='dark' variant='dark'>
    <Navbar.Brand fixed='top'>
      <div>
        <img alt='' src={covidImg} width='30' height='30' className='d-inline-block align-top' /> Covid-19
      </div>
      <Button onClick={() => handleManageTimeout(true, 2000)}>Start</Button>
      <Button onClick={() => handleManageTimeout(false, 0)}>Pause</Button>
    </Navbar.Brand>
  </Navbar>
);

export default Header;
