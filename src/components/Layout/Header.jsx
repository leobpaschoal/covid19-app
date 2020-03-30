import React from 'react';
import './Header.css';
import Configurations from '../Stats/Configurations';
import { ClockFill } from 'react-bootstrap-icons';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import SpinnerLoad from '../Load/SpinnerLoad';
import Container from 'react-bootstrap/Container';
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
  <Container fluid className='header-container'>
    <div>
      <div className='online-button'>
        <SpinnerLoad show size={'xl'} animation={'grow'} variant={refreshIsChecked ? 'success' : 'danger'} />
      </div>
      <div className='covid-logo'>
        <div className='covid-logo-title'>COVID-19</div>
        <div className='covid-logo-sub-title'>{t('subTitle')}</div>
      </div>
      <div className='config'>
        <div>
          <OverlayTrigger key='bottom' placement='bottom' overlay={<Tooltip id='tooltipid'>{t('utcTime')}</Tooltip>}>
            <span>
              {t('lastUpdate')} <ClockFill size={12} />
            </span>
          </OverlayTrigger>
        </div>
        <div>
          <SpinnerLoad
            element={<Badge variant='info'>{lastUpdated}</Badge>}
            show={loadingGlobalStats}
            size={'sm'}
            animation={'border'}
            variant={'info'}
          />
        </div>
        <div className='config-time'>
          <Configurations
            handleChangeRefreshTime={handleChangeRefreshTime}
            handleRefreshChecked={handleRefreshChecked}
            refreshIsChecked={refreshIsChecked}
            refreshTime={refreshTime}
          />
        </div>
      </div>
      <div className='translate-button'>
        <img alt={''} width={40} src={'./translateIcon.png'} />
      </div>
    </div>
  </Container>
);

export default translate('Header')(Header);
