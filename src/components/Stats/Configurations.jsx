import React from 'react';
import { translate } from 'react-translate';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Card from 'react-bootstrap/Card';
import { Settings, Info, Timelapse } from '@material-ui/icons';

const Configurations = ({ handleChangeRefreshTime, handleRefreshChecked, refreshIsChecked, refreshTime, t }) => (
  <Card className='configuration-card'>
    <Card.Header>
      <h4>
        <Settings className='configuration-settings-icon' /> {t('configurations')}
      </h4>
    </Card.Header>
    <Card.Body className='configuration-body'>
      <div>
        <select
          className='configuration-select'
          value={refreshTime}
          onChange={e => handleChangeRefreshTime(e.target.value)}
        >
          <option value={60000}>1 {t('timeSelect')}</option>
          <option value={60000 * 10}>10 {t('timeSelectPl')}</option>
          <option value={60000 * 30}>30 {t('timeSelectPl')}</option>
          <option value={60000 * 60}>1 {t('timeSelectHour')}</option>
        </select>{' '}
        <Timelapse style={{ fontSize: '30px', marginTop: '-4px' }} />
      </div>
      <div className='configuration-switch-button-refresh'>
        <BootstrapSwitchButton
          size={'xl'}
          width={240}
          checked={refreshIsChecked}
          onChange={() => handleRefreshChecked()}
          onstyle='success'
          offstyle='danger'
          onlabel={t('onLabel')}
          offlabel={t('offLabel')}
        />
      </div>
    </Card.Body>
    <Card.Footer>
      <div>
        <Info /> {t('information')}
      </div>
    </Card.Footer>
  </Card>
);

export default translate('Configurations')(Configurations);
