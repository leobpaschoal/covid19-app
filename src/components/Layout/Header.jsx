import React from 'react';
import './Header.css';
import Configurations from '../Stats/Configurations';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import SpinnerLoad from '../Load/SpinnerLoad';
import Container from 'react-bootstrap/Container';
import { ClockFill } from 'react-bootstrap-icons';

const Header = ({
  lastUpdated,
  loadingGlobalStats,
  handleChangeRefreshTime,
  handleRefreshChecked,
  refreshIsChecked,
  refreshTime
}) => (
  <Container fluid className='header-container'>
    <div>
      <div className='online-button'>
        <SpinnerLoad show size={'xl'} animation={'grow'} variant={refreshIsChecked ? 'success' : 'danger'} />
      </div>
      <div className='covid-logo'>
        <div className='covid-logo-title'>COVID-19</div>
        <div className='covid-logo-sub-title'>Real Time</div>
      </div>
      <div className='config'>
        <div>
          <OverlayTrigger key='bottom' placement='bottom' overlay={<Tooltip id='tooltipid'>UTC time</Tooltip>}>
            <span>
              Last update <ClockFill size={12} />
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
    </div>
  </Container>
);

export default Header;
