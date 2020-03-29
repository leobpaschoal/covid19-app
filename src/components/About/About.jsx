import React from 'react';
import './About.css';
import Card from 'react-bootstrap/Card';

const About = () => (
  <div className='content-about'>
    <Card>
      <Card.Header>
        <h4>About</h4>
      </Card.Header>
      <Card.Body>
        <p>Thank you for using my website covid19realtime.info!</p>
        <p>
          The goal of covid19realtime.info is to provide the latest information on the COVID-19 coronavirus and to make
          that information more accessible
        </p>
        <p>
          This site is designed, developed and funded by myself (leobpaschoal). It is the result of constant work;
          updating, fixing and maintaining in order to provide the service. If you've found the site helpful or useful
          then please consider donate to support my work.
        </p>
        <a
          target='_blank'
          href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FCJAJ89SMHG88&source=url'
          rel=''
        >
          DONATE LINK
        </a>
        <form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>
          <input type='hidden' name='cmd' value='_s-xclick' />
          <input type='hidden' name='hosted_button_id' value='FCJAJ89SMHG88' />
          <input
            type='image'
            src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif'
            border='0'
            name='submit'
            title='PayPal - The safer, easier way to pay online!'
            alt='Donate with PayPal button'
          />
          <img alt='' border='0' src='https://www.paypal.com/en_BR/i/scr/pixel.gif' width='1' height='1' />
        </form>
        <p>Data Sources WHO, CDC, ECDC, NHC, JHU CSSE, DXY & QQ</p>
      </Card.Body>
    </Card>
  </div>
);

export default About;
