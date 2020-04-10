import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '@material-ui/icons';

import './Translate.css';
import Card from 'react-bootstrap/Card';

const Translate = () => (
  <div className='translate-card'>
    <Card>
      <Card.Header>
        <Language style={{ fontSize: '30px' }} />
      </Card.Header>
      <Card.Body>
        <div className='content-body-translate'>
          <div>
            <Link to='/'>
              <div>
                <img alt='' width={80} height={50} src='https://covid19realtime.info/flags/usa.gif' />
              </div>
              <div>English</div>
            </Link>
          </div>
          <div>
            <Link to='/pt-br'>
              <div>
                <img alt='' width={80} height={50} src='https://covid19realtime.info/flags/brazil.gif' />
              </div>
              <div>Português</div>
            </Link>
          </div>
          <div>
            <Link to='/es'>
              <div>
                <img alt='' width={80} height={50} src='https://covid19realtime.info/flags/spain.gif' />
              </div>
              <div>Español</div>
            </Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  </div>
);

export default Translate;
