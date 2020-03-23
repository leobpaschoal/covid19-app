import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Badge from 'react-bootstrap/Badge';

import SpinnerLoad from '../Load/SpinnerLoad';
import './Global.css';

const Today = ({ newCases, newDeaths, dayOccurrences, loadingGlobalStats, loadingAllCases }) => {
  const handleLoadingGlobal = (name, value) => (
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

  const handleLoadingAllCases = (name, value) => (
    <SpinnerLoad
      element={
        <Fragment>
          <div>{name}</div>
          <div>{value}</div>
        </Fragment>
      }
      circle
      show={loadingAllCases}
      size={'lg'}
      animation={'border'}
      variant={'light'}
    />
  );
  return (
    <CardGroup>
      <Card>
        <Card.Header>
          <h5>
            Today <Badge variant='warning'>Worldwide</Badge>
          </h5>
          <div className='today-info'>
            <p>Occurrences in the whole world.</p>
          </div>
        </Card.Header>
        <Card.Body>
          <div className='adjust-circles'>
            <div>
              <div className='sonar-emitter cases-bg'>
                {handleLoadingGlobal('Cases', newCases)}
                <div className='sonar-wave cases-bg'></div>
              </div>
            </div>
            <div>
              <div className='sonar-emitter deaths-bg'>
                {handleLoadingGlobal('Deaths', newDeaths)}
                <div className='sonar-wave deaths-bg'></div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <h5>
            Today{' '}
            <SpinnerLoad
              element={<Badge variant='danger'>{dayOccurrences.country_name}</Badge>}
              show={loadingAllCases}
              size={'sm'}
              animation={'border'}
              variant={'danger'}
            />
          </h5>
          <div className='today-info'>
            <p>Today's country with more deaths.</p>
          </div>
        </Card.Header>
        <Card.Body>
          <div className='adjust-circles'>
            <div>
              <div className='sonar-emitter cases-bg'>
                {handleLoadingAllCases('Cases', dayOccurrences.new_cases)}
                <div className='sonar-wave cases-bg'></div>
              </div>
            </div>
            <div>
              <div className='sonar-emitter deaths-bg'>
                {handleLoadingAllCases('Deaths', dayOccurrences.new_deaths)}
                <div className='sonar-wave deaths-bg'></div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </CardGroup>
  );
};
export default Today;

// country_name: 'USA';
// cases: '26,111';
// deaths: '324';
// region: '';
// total_recovered: '176';
// new_deaths: '68';
// new_cases: '6,728';
// serious_critical: '64';
// active_cases: '25,611';
// total_cases_per_1m_population: '79';
