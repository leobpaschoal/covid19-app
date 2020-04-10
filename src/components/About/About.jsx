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
        <div>
          <a
            href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QH2C9XXN4QBCE&source=url'
            target='_blank'
            rel='noopener noreferrer'
          >
            <div>
              <img className='paypal-image' src='https://covid19realtime.info/pay/paypal.png' alt='Paypal' />
            </div>
            <div>
              <button className='paypal-button'>{t('donate')}</button>
            </div>
          </a>
        </div>
        <hr />
        <div className='picpay-donate'>
          <a href='https://picpay.me/leobpaschoal' target='_blank' rel='noopener noreferrer'>
            <div>
              <img className='picpay-image' src='https://covid19realtime.info/pay/picpay.jpg' alt='Picpay' />
            </div>
            <div>
              <button className='picpay-button'>{t('donate')}</button>
            </div>
          </a>
        </div>
        <p>
          <br />
          <b>{t('dataSource')}</b>
          <br />
          <span style={{ fontSize: '14px' }}>WHO, CDC, ECDC, NHC, JHU CSSE, DXY QQ & NEWSAPI.ORG</span>
        </p>
        <p>
          <b>e-mail:</b> contact@covid19realtime.info
        </p>
      </Card.Body>
    </Card>
  </div>
);

export default translate('About')(About);
