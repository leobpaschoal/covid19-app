import React from 'react';
import './Header.css';
import { ClockFill } from 'react-bootstrap-icons';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import SpinnerLoad from '../Load/SpinnerLoad';
import { translate } from 'react-translate';

const Header = ({ lastUpdated, loadingGlobalStats, refreshIsChecked, t }) => (
  <div className='header-container'>
    <div className='header-logo'>
      COVID19 <span>Real time</span>{' '}
      <SpinnerLoad show size={'xl'} animation={'grow'} variant={refreshIsChecked ? 'success' : 'danger'} />
    </div>
    <div className='header-last-update'>
      <OverlayTrigger key='bottom' placement='bottom' overlay={<Tooltip id='tooltipid'>{t('utcTime')}</Tooltip>}>
        <div>
          <div>
            <span>{t('lastUpdate')}</span>
          </div>
          <div>
            <SpinnerLoad
              element={
                <Badge variant={refreshIsChecked ? 'success' : 'danger'}>
                  {lastUpdated} <ClockFill size={12} />
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

export default translate('Header')(Header);
