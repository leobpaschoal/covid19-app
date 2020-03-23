import React, { Fragment } from 'react';
import SpinnerLoad from '../Load/SpinnerLoad';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import NumberFormat from 'react-number-format';

const Global = ({ globalStats, infected, handleCountriesInfecteds, loadingGlobalStats, loadingInfectedCountries }) => {
  const handleLoading = (name, value) => (
    <SpinnerLoad
      element={
        <Fragment>
          <div>{name}</div>
          <div>{value}</div>
        </Fragment>
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
        <div className='card-header-adjust'>
          <h5>
            Global <Badge variant='dark'>Statistics</Badge>
          </h5>
          <OverlayTrigger
            placement={'bottom'}
            overlay={
              <Tooltip>
                Click to see all countries <strong>infected</strong>!
              </Tooltip>
            }
          >
            <Button size='sm' variant='danger' disabled={loadingInfectedCountries} onClick={handleCountriesInfecteds}>
              <SpinnerLoad
                element={'Countries'}
                show={loadingInfectedCountries}
                size={'sm'}
                animation={'border'}
                variant={'light'}
              />
            </Button>
          </OverlayTrigger>
        </div>
      </Card.Header>
      <Card.Body>
        <Row className='global-stats'>
          <Col>
            <div className='sonar-emitter cases-bg'>
              {handleLoading('Cases', globalStats.total_cases)}
              <div className='sonar-wave cases-bg'></div>
            </div>
          </Col>
          <Col>
            <div className='sonar-emitter infected-bg'>
              {handleLoading(
                'Infected',
                <NumberFormat displayType={'text'} thousandSeparator={true} value={infected} />
              )}
              <div className='sonar-wave infected-bg'></div>
            </div>
          </Col>
          <Col>
            <div className='sonar-emitter deaths-bg'>
              {handleLoading('Deaths', globalStats.total_deaths)}
              <div className='sonar-wave deaths-bg'></div>
            </div>
          </Col>
          <Col>
            <div className='sonar-emitter recovered-bg'>
              {handleLoading('Recovered', globalStats.total_recovered)}
              <div className='sonar-wave recovered-bg'></div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Global;
