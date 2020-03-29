import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const SpinnerLoad = ({ size, animation, variant, show, element, circle }) =>
  show ? (
    <Spinner className={circle ? 'spinner-circle' : ''} variant={variant} animation={animation} size={size} />
  ) : element ? (
    element
  ) : (
    ''
  );

export default SpinnerLoad;
