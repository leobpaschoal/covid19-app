import React from 'react';
import { translate } from 'react-translate';
import Card from 'react-bootstrap/Card';
import './About.css';

const About = ({ t }) => (
  <div className='content-about'>
    <Card>
      <Card.Header>
        <h4>{t('cardTitle')}</h4>
      </Card.Header>
      <Card.Body>
        <p>{t('line1', { site: <b>covid19realtime.info</b> })}</p>
        <p>{t('line2')}</p>
        <p>{t('line3')}</p>
        <p>{t('line4')}</p>
        <p>{t('line5')}</p>
        <p>{t('line6')}</p>
        <p>{t('line7')}</p>
        <div className='about-buttons'>
          <div>
            <a
              target='_blank'
              href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QH2C9XXN4QBCE&source=url'
              rel='noopener noreferrer'
            >
              <div>
                <img src='./pay/paypal.png' alt='Paypal' />
              </div>
              <div>
                <button className='donate-buttons paypal-button'>{t('donate')}</button>
              </div>
            </a>
          </div>
          <div className='pagseguro-donate'>
            <a href='https://pag.ae/7VTRrbvcK/button' rel='noopener noreferrer' target='_blank'>
              <img src='./pay/pagseguro.png' alt='Pagseguro' />
              <div>
                <button className='donate-buttons pagseguro-button'>{t('donate')}</button>
              </div>
            </a>
          </div>
        </div>
        <p>
          <b>{t('dataSource')}</b>
          <br />
          <span style={{ fontSize: '14px' }}>WHO, CDC, ECDC, NHC, JHU CSSE, DXY QQ & NEWSAPI.ORG</span>
        </p>
        <p>
          <b>e-mail:</b> covid19realtime@gmail.com
        </p>
      </Card.Body>
    </Card>
  </div>
);

export default translate('About')(About);
