import React from 'react';
import SpinnerLoad from '../Load/SpinnerLoad';
import { translate } from 'react-translate';
import { makeNumberThousandSeparator } from '../Utils/Numbers';
import { Row, Col, Card } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { Public } from '@material-ui/icons';

const Global = ({ globalStats, loadingGlobalStats, tCountry, t }) => {
  const handleLoading = (name, value, percent, tCountry) => (
    <SpinnerLoad
      element={
        <div>
          <div>
            <span>{name}</span>
          </div>
          <div className='adjust-circle-value'>
            <span>{makeNumberThousandSeparator(value, tCountry)}</span>
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
        <div className='global-card-title'>
          <div>
            <h5>
              <Public /> {t('cardTitle')}
            </h5>
          </div>
          <div></div>
        </div>
      </Card.Header>
      <Card.Body>
        <Row className='global-stats'>
          <Col>
            <div className='sonar-emitter confirmed-bg'>
              {handleLoading(t('confirmed'), globalStats.total_cases, false, tCountry)}
              <div className='sonar-wave confirmed-bg'></div>
            </div>
          </Col>
          <Col>
            <div className='sonar-emitter infected-bg'>
              {handleLoading(t('infecteds'), globalStats.total_infected, globalStats.percentInfected, tCountry)}
              <div className='sonar-wave infected-bg'></div>
            </div>
          </Col>
          <Col>
            <div className='sonar-emitter deaths-bg'>
              {handleLoading(t('deaths'), globalStats.total_deaths, globalStats.percentDeaths, tCountry)}
              <div className='sonar-wave deaths-bg'></div>
            </div>
          </Col>
          <Col>
            <div className='sonar-emitter recovered-bg'>
              {handleLoading(t('recovered'), globalStats.total_recovered, globalStats.percentRecovered, tCountry)}
              <div className='sonar-wave recovered-bg'></div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default translate('Global')(Global);
