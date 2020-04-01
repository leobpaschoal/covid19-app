import React from 'react';
import { translate } from 'react-translate';
import Toast from 'react-bootstrap/Toast';
import { Error } from '@material-ui/icons';

const Errors = ({ messageError, showError, handleError, t }) => (
  <div
    style={{
      position: 'fixed',
      top: 5,
      right: 5,
      display: showError ? 'block' : 'none',
      zIndex: 999
    }}
  >
    <Toast onClose={() => handleError()} show={showError} delay={10000} autohide>
      <Toast.Header style={{ color: 'red', fontWeight: 'bold' }}>
        <Error />
        {t('errorTitle')}
      </Toast.Header>
      <Toast.Body>{messageError}</Toast.Body>
    </Toast>
  </div>
);

export default translate('Errors')(Errors);
