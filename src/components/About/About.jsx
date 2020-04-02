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
            target='_blank'
            href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QH2C9XXN4QBCE&source=url'
            rel='noopener noreferrer'
          >
            <img
              src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif'
              border='0'
              title='PayPal - The safer, easier way to pay online!'
              alt='Donate with PayPal button'
            />
          </a>
        </div>
        <div className='pagseguroDonate'>
          <a
            href='https://pag.ae/7VTRrbvcK/button'
            rel='noopener noreferrer'
            target='_blank'
            title='Pagar com PagSeguro'
          >
            <img
              src='//assets.pagseguro.com.br/ps-integration-assets/botoes/pagamentos/180x25-pagar-azul.gif'
              alt='Pague com PagSeguro - é rápido, grátis e seguro!'
            />
          </a>
        </div>
        <p>
          <b>{t('dataSource')}</b>
          <br />
          <span style={{ fontSize: '14px' }}>WHO, CDC, ECDC, NHC, JHU CSSE, DXY QQ & NEWSAPI.ORG</span>
        </p>
        <p>
          <b>email:</b> covid19realtime@gmail.com
        </p>
      </Card.Body>
    </Card>
  </div>
);

export default translate('About')(About);

// Thank you for choosing covid19realtime.info. We appreciate it!

// This site was developed to bring information regarding the corona virus (covid-19) in REAL TIME!

// In addition to that, the News tab contains important information and links to let you know everything about COVID-19 that is happening around the globe.

// Use the protection tips to find out a better way to protect yourself and your loved ones!

// This website is the result of my work and my wish to share true/correct information regarding the covid-19 to support our worldwide fight against it.

// If you've found this website useful, please, consider making a donation to support my work!
