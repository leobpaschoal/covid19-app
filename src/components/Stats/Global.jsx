import React from 'react';
import SpinnerLoad from '../Load/SpinnerLoad';
import { translate } from 'react-translate';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import NumberFormat from 'react-number-format';
import { Public } from '@material-ui/icons';

const Global = ({ globalStats, loadingGlobalStats, t }) => {
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
              {handleLoading(t('confirmed'), globalStats.total_cases)}
              <div className='sonar-wave confirmed-bg'></div>
            </div>
          </Col>
          <Col>
            <div className='sonar-emitter infected-bg'>
              {handleLoading(
                t('infecteds'),
                <NumberFormat displayType={'text'} thousandSeparator={true} value={globalStats.infected} />,
                globalStats.percentInfected
              )}
              <div className='sonar-wave infected-bg'></div>
            </div>
          </Col>
          <Col>
            <div className='sonar-emitter deaths-bg'>
              {handleLoading(t('deaths'), globalStats.total_deaths, globalStats.percentDeaths)}
              <div className='sonar-wave deaths-bg'></div>
            </div>
          </Col>
          <Col>
            <div className='sonar-emitter recovered-bg'>
              {handleLoading(t('recovered'), globalStats.total_recovered, globalStats.percentRecovered)}
              <div className='sonar-wave recovered-bg'></div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default translate('Global')(Global);
