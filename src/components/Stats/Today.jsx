import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import SpinnerLoad from '../Load/SpinnerLoad';
import './Global.css';

const Today = ({ newCases, newDeaths, dayOccurrences, loadingGlobalStats, loadingAllCases }) => {
  const handleLoadingGlobal = (name, value) => (
    <SpinnerLoad
      element={
        <div>
          <div>
            <span>{name}</span>
          </div>
          <div>
            <span>{value}</span>
          </div>
        </div>
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
        <div>
          <div>
            <span>{name}</span>
          </div>
          <div>
            <span>{value}</span>
          </div>
        </div>
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
          <h5>Worldwide</h5>
          <div className='today-info'>
            <p>Occurrences in the past 24 hours.</p>
          </div>
        </Card.Header>
        <Card.Body>
          <div className='adjust-circles'>
            <div>
              <div className='sonar-emitter confirmed-bg'>
                {handleLoadingGlobal('Confirmed', '+' + newCases)}
                <div className='sonar-wave confirmed-bg'></div>
              </div>
            </div>
            <div>
              <div className='sonar-emitter deaths-bg'>
                {handleLoadingGlobal('Deaths', '+' + newDeaths)}
                <div className='sonar-wave deaths-bg'></div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <h5>
            <SpinnerLoad
              element={<span>{dayOccurrences.country_name}</span>}
              show={loadingAllCases}
              size={'sm'}
              animation={'border'}
              variant={'dark'}
            />
          </h5>
          <div className='today-info'>
            <p>Today's country with more deaths.</p>
          </div>
        </Card.Header>
        <Card.Body>
          <div className='adjust-circles'>
            <div>
              <div className='sonar-emitter confirmed-bg'>
                {handleLoadingAllCases('Confirmed', '+' + dayOccurrences.new_cases)}
                <div className='sonar-wave confirmed-bg'></div>
              </div>
            </div>
            <div>
              <div className='sonar-emitter deaths-bg'>
                {handleLoadingAllCases('Deaths', '+' + dayOccurrences.new_deaths)}
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
