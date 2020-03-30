import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { InfoCircleFill } from 'react-bootstrap-icons';
import { translate } from 'react-translate';

const Configurations = ({ handleChangeRefreshTime, handleRefreshChecked, refreshIsChecked, refreshTime, t }) => (
  <div>
    <div className='config-overlay-info'>
      <OverlayTrigger key='bottom' placement='bottom' overlay={<Tooltip id='tooltipid'>{t('information')}</Tooltip>}>
        <span>
          <InfoCircleFill size={14} />
        </span>
      </OverlayTrigger>
    </div>

    <div className='config-select-time'>
      <select className='config-select' onChange={e => handleChangeRefreshTime(e)} defaultValue={refreshTime}>
        <option value={60000}>1 {t('timeSelect')}</option>
        <option value={60000 * 10}>10 {t('timeSelectPl')}</option>
        <option value={60000 * 30}>30 {t('timeSelectPl')}</option>
        <option value={60000 * 60}>1 {t('timeSelectHour')}</option>
      </select>
    </div>
    <div className='custom-control custom-switch'>
      <input
        type='checkbox'
        className='custom-control-input'
        id='customSwitches'
        checked={refreshIsChecked}
        onChange={() => handleRefreshChecked()}
      />
      <label className='custom-control-label' htmlFor='customSwitches'></label>
    </div>
  </div>
);

export default translate('Configurations')(Configurations);
