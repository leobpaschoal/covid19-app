import React from 'react';
import { translate } from 'react-translate';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { ToggleButton, ToggleButtonGroup, Card } from 'react-bootstrap';

const Configurations = ({ handleChangeRefreshTime, handleRefreshChecked, refreshIsChecked, refreshTime, t }) => (
  <Card>
    <Card.Header>
      <h4>{t('configurations')}</h4>
    </Card.Header>
    <Card.Body>
      <div>
        <ToggleButtonGroup name='toggleButton' value={refreshTime} onChange={e => handleChangeRefreshTime(e)}>
          <ToggleButton variant='info' value={60000}>
            1 {t('timeSelect')}
          </ToggleButton>
          <ToggleButton variant='secondary' value={60000 * 10}>
            10 {t('timeSelectPl')}
          </ToggleButton>
          <ToggleButton value={60000 * 30}>30 {t('timeSelectPl')}</ToggleButton>
          <ToggleButton variant='danger' value={60000 * 60}>
            1 {t('timeSelectHour')}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className='switch-button-refresh'>
        <BootstrapSwitchButton
          size={'xl'}
          width={300}
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
      <div>{t('information')}</div>
    </Card.Footer>
  </Card>
);

export default translate('Configurations')(Configurations);
