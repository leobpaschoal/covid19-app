import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { InfoCircleFill } from 'react-bootstrap-icons';
import { translate } from 'react-translate';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

const Configurations = ({ handleChangeRefreshTime, handleRefreshChecked, refreshIsChecked, refreshTime, t }) => (
  <div className='global-configurations-refresh'>
    <div className='info-time-lapse'>
      <OverlayTrigger key='bottom' placement='bottom' overlay={<Tooltip id='tooltipid'>{t('information')}</Tooltip>}>
        <span>
          <InfoCircleFill size={28} />
        </span>
      </OverlayTrigger>
    </div>
    <div className='switch-button'>
      <BootstrapSwitchButton
        size={'xs'}
        checked={refreshIsChecked}
        onChange={() => handleRefreshChecked()}
        onstyle='success'
        offstyle='danger'
        onlabel={t('onLabel')}
        offlabel={t('offLabel')}
      />
    </div>
    <div className='info'>
      <div className='select-time'>
        <select onChange={e => handleChangeRefreshTime(e)} defaultValue={refreshTime}>
          <option value={60000}>1 {t('timeSelect')}</option>
          <option value={60000 * 10}>10 {t('timeSelectPl')}</option>
          <option value={60000 * 30}>30 {t('timeSelectPl')}</option>
          <option value={60000 * 60}>1 {t('timeSelectHour')}</option>
        </select>
      </div>
    </div>
  </div>
);

export default translate('Configurations')(Configurations);
