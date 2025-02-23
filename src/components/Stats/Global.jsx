import React from 'react';
import SpinnerLoad from '../Load/SpinnerLoad';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import NumberFormat from 'react-number-format';
// import { InfoCircleFill } from 'react-bootstrap-icons';
// import Button from 'react-bootstrap/Button';
// import Tooltip from 'react-bootstrap/Tooltip';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Badge from 'react-bootstrap/Badge';

const Global = ({ globalStats, loadingGlobalStats }) => {
  const handleLoading = (name, value, percent) => (
    <SpinnerLoad
      element={
        <div>
          <div>
            <span>{name}</span>
          </div>
          <div className='adjust-circle-value'>
            <span>{value}</span>
          </div>
          {percent && (
            <div className='global-circle-percent'>
              <NumberFormat decimalScale={2} displayType={'text'} suffix={'%'} value={percent} />
            </div>
          )}
        </div>
      }
      circle
      show={loadingGlobalStats}
      size={'lg'}
      animation={'border'}
      variant={'light'}
    />
  );

  return (
    <Card className='global-card-align'>
      <Card.Header>
        <h5>Global Statistics</h5>
      </Card.Header>
      <Card.Body>
        <Row className='global-stats'>
          <Col>
            <div className='sonar-emitter confirmed-bg'>
              {handleLoading('Confirmed', globalStats.total_cases)}
              <div className='sonar-wave confirmed-bg'></div>
            </div>
          </Col>
          <Col>
            <div className='sonar-emitter infected-bg'>
              {handleLoading(
                'Infected',
                <NumberFormat displayType={'text'} thousandSeparator={true} value={globalStats.infected} />,
                globalStats.percentInfected
              )}
              <div className='sonar-wave infected-bg'></div>
            </div>
          </Col>
          <Col>
            <div className='sonar-emitter deaths-bg'>
              {handleLoading('Deaths', globalStats.total_deaths, globalStats.percentDeaths)}
              <div className='sonar-wave deaths-bg'></div>
            </div>
          </Col>
          <Col>
            <div className='sonar-emitter recovered-bg'>
              {handleLoading('Recovered', globalStats.total_recovered, globalStats.percentRecovered)}
              <div className='sonar-wave recovered-bg'></div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Global;
