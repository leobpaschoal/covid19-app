import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { translate } from 'react-translate';

import './TableInfoModal.css';

const TableInfoModal = ({ showInfoTableModal, handleShowInfoTableModal, t }) => (
  <Modal
    size='lg'
    aria-labelledby='contained-modal-title-vcenter'
    centered
    show={showInfoTableModal}
    onHide={handleShowInfoTableModal}
  >
    <Modal.Header closeButton>
      <Modal.Title id='contained-modal-title-vcenter'>{t('title')}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className='table-modal-information'>
        <p>
          <b>{t('subTitle')}</b>
        </p>
        <p>
          <b>{t('last24hInfo', { n: 1 })} </b>
          {t('last24hInfo', { n: 2 })}
        </p>
        <p>
          <b>{t('percentInfo', { n: 1 })} </b>
          {t('percentInfo', { n: 2 })}
        </p>
        <p>
          <b>{t('popInfo', { n: 1 })} </b>
          {t('popInfo', { n: 2 })}
        </p>
        <p>
          <b>{t('testsInfo', { n: 1 })} </b>
          {t('testsInfo', { n: 2 })}
        </p>
        <p>
          <b>{t('criticalInfo', { n: 1 })} </b>
          {t('criticalInfo', { n: 2 })}
        </p>
      </div>
    </Modal.Body>
    <Modal.Footer className='table-modal-footer'>
      <em>{t('utcInfo')}</em>
    </Modal.Footer>
  </Modal>
);

export default translate('TableInfoModal')(TableInfoModal);
