import React from 'react';
import { ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const NoMatch = () => (
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <h4>
      <Link to='/'>
        Page not found <ArrowBack />{' '}
      </Link>
    </h4>
  </div>
);

export default NoMatch;
