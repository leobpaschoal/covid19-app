import React from 'react';
import './Header.css';
import { QueryBuilder } from '@material-ui/icons';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import SpinnerLoad from '../Load/SpinnerLoad';
import { translate } from 'react-translate';
import moment from 'moment';

const Header = ({ lastUpdated, loadingGlobalStats, refreshIsChecked, tCountry, t }) => {
  let flag = '';
  const dateFormatted =
    tCountry === 'br' ? moment(lastUpdated).format('DD/MM/YYYY HH:MM') : moment(lastUpdated).format('YYYY-MM-DD HH:MM');

  switch (tCountry) {
    case 'br':
      flag = './flags/brazil.gif';
      break;
    case 'en':
      flag = './flags/usa.gif';
      break;
    case 'es':
      flag = './flags/spain.gif';
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
        <OverlayTrigger key='bottom' placement='bottom' overlay={<Tooltip id='tooltipid'>{t('utcTime')}</Tooltip>}>
          <div>
            <div>
              <span>{t('lastUpdate')}</span> <img src={flag} width={18} alt='' />
            </div>
            <div>
              <SpinnerLoad
                element={
                  <Badge variant={refreshIsChecked ? 'success' : 'danger'}>
                    {dateFormatted} <QueryBuilder style={{ fontSize: '14px', marginTop: '-2px' }} />
                  </Badge>
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
