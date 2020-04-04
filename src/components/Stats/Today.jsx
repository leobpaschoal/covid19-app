import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import { translate } from 'react-translate';
import { Warning, Schedule } from '@material-ui/icons';
import { makeNumberThousandSeparator } from '../Utils/Numbers';

import SpinnerLoad from '../Load/SpinnerLoad';
import './Global.css';

const Today = ({ newCases, newDeaths, dayOccurrences, loadingGlobalStats, loadingAllCases, tCountry, t }) => {
  const handleLoadingGlobal = (name, value, language) => (
    <SpinnerLoad
      element={
        <div>
          <div>
            <span>{name}</span>
          </div>
          <div>
            <span>{makeNumberThousandSeparator(value, language)}</span>
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

  const handleLoadingAllCases = (name, value, language) => (
    <SpinnerLoad
      element={
        <div>
          <div>
            <span>{name}</span>
          </div>
          <div>
            <span>{makeNumberThousandSeparator(value, language)}</span>
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
          <h5>
            <Schedule /> {t('cardTitle')}
          </h5>
          <div className='today-info'>
            <p>{t('information')}</p>
          </div>
        </Card.Header>
        <Card.Body>
          <div className='adjust-circles'>
            <div>
              <div className='sonar-emitter confirmed-bg'>
                {handleLoadingGlobal(t('confirmed'), '+' + newCases, tCountry)}
                <div className='sonar-wave confirmed-bg'></div>
              </div>
            </div>
            <div>
              <div className='sonar-emitter deaths-bg'>
                {handleLoadingGlobal(t('deaths'), '+' + newDeaths, tCountry)}
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
              element={
                <span>
                  <Warning /> {dayOccurrences.country_name}
                </span>
              }
              show={loadingAllCases}
              size={'sm'}
              animation={'border'}
              variant={'dark'}
            />
          </h5>
          <div className='today-info'>
            <p>{t('informationCountry')}</p>
          </div>
        </Card.Header>
        <Card.Body>
          <div className='adjust-circles'>
            <div>
              <div className='sonar-emitter confirmed-bg'>
                {handleLoadingAllCases(t('confirmed'), '+' + dayOccurrences.new_cases, tCountry)}
                <div className='sonar-wave confirmed-bg'></div>
              </div>
            </div>
            <div>
              <div className='sonar-emitter deaths-bg'>
                {handleLoadingAllCases(t('deaths'), '+' + dayOccurrences.new_deaths, tCountry)}
                <div className='sonar-wave deaths-bg'></div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </CardGroup>
  );
};
export default translate('Today')(Today);
