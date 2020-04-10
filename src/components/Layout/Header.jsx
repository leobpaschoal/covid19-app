import React from 'react';
import './Header.css';
import { QueryBuilder, InfoOutlined } from '@material-ui/icons';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import SpinnerLoad from '../Load/SpinnerLoad';
import { translate } from 'react-translate';
import moment from 'moment';

const Header = ({ lastUpdated, loadingGlobalStats, refreshIsChecked, tCountry, t }) => {
  let flag = '';
  const utcTime =
    tCountry === 'br' ? moment(lastUpdated).format('DD/MM/YYYY HH:mm') : moment(lastUpdated).format('YYYY-MM-DD HH:mm');

  const stillUtc = moment.utc(lastUpdated).toDate();
  const local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

  const dateFormatted =
    tCountry === 'br'
      ? moment(local).format('DD/MM/YYYY HH:mm ([UTC] Z)')
      : moment(local).format('YYYY-MM-DD HH:mm ([UTC] Z)');

  switch (tCountry) {
    case 'br':
      flag = 'https://covid19realtime.info/flags/brazil.gif';
      break;
    case 'en':
      flag = 'https://covid19realtime.info/flags/usa.gif';
      break;
    case 'es':
      flag = 'https://covid19realtime.info/flags/spain.gif';
      break;
    default:
      break;
  }
  return (
    <div className='header-container'>
      <div className='header-logo'>
        COVID19 <span>Real time</span>{' '}
        <SpinnerLoad show size={'xl'} animation={'grow'} variant={refreshIsChecked ? 'success' : 'danger'} />
      </div>
      <div className='header-last-update'>
        <OverlayTrigger
          key='bottom'
          placement='bottom'
          overlay={
            <Tooltip id='tooltipid'>
              <span style={{ fontSize: '12px' }}>
                {t('utcTime')} {utcTime}
              </span>
            </Tooltip>
          }
        >
          <div>
            <div>
              <span>{t('lastUpdate')}</span> <img src={flag} width={18} alt='' />
            </div>
            <div>
              <SpinnerLoad
                element={
                  <div>
                    <Badge variant={refreshIsChecked ? 'success' : 'danger'}>
                      {dateFormatted} <QueryBuilder style={{ fontSize: '14px', marginTop: '-2px' }} />
                    </Badge>{' '}
                    <InfoOutlined style={{ fontSize: '18px' }} />
                  </div>
                }
                show={loadingGlobalStats}
                size={'sm'}
                animation={'border'}
                variant={'success'}
              />
            </div>
          </div>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default translate('Header')(Header);
