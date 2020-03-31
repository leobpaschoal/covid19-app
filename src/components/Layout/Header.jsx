import React from 'react';
import './Header.css';
import Configurations from '../Stats/Configurations';
import { ClockFill } from 'react-bootstrap-icons';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import SpinnerLoad from '../Load/SpinnerLoad';
import { translate } from 'react-translate';

const Header = ({
  lastUpdated,
  loadingGlobalStats,
  handleChangeRefreshTime,
  handleRefreshChecked,
  refreshIsChecked,
  refreshTime,
  t
}) => (
  <div className='header-container'>
    <div className='header-content'>
      <div className='header-logo'>
        COVID<font color=''>19</font> <span>Real time</span>{' '}
        <SpinnerLoad show size={'xl'} animation={'grow'} variant={refreshIsChecked ? 'success' : 'danger'} />
      </div>
      <div className='header-configurations'>
        <OverlayTrigger key='bottom' placement='bottom' overlay={<Tooltip id='tooltipid'>{t('utcTime')}</Tooltip>}>
          <div className='last-update'>
            <div>
              <span>{t('lastUpdate')}</span>
            </div>
            <div>
              <SpinnerLoad
                element={
                  <Badge variant='info'>
                    {lastUpdated} <ClockFill size={14} />
                  </Badge>
                }
                show={loadingGlobalStats}
                size={'sm'}
                animation={'border'}
                variant={'info'}
              />
            </div>
          </div>
        </OverlayTrigger>
        <Configurations
          handleChangeRefreshTime={handleChangeRefreshTime}
          handleRefreshChecked={handleRefreshChecked}
          refreshIsChecked={refreshIsChecked}
          refreshTime={refreshTime}
        />
      </div>
    </div>
  </div>
);

export default translate('Header')(Header);
