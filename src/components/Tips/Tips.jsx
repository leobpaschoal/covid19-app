import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { EmojiObjectsOutlined, KeyboardArrowRight, OpenInNew } from '@material-ui/icons';
import { translate } from 'react-translate';

const Tips = ({ tCountry, t }) => {
  let siteLink,
    siteTitle = '';

  switch (tCountry) {
    case 'br':
      siteLink = 'https://coronavirus.saude.gov.br';
      siteTitle = 'coronavirus.saude.gov.br';
      break;
    case 'en':
      siteLink = 'https://www.cdc.gov/coronavirus/2019-nCoV/index.html';
      siteTitle = 'cdc.gov';
      break;
    case 'es':
      siteLink = 'https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov-China/home.htm';
      siteTitle = 'mscbs.gob.es';
      break;
    default:
      break;
  }
  return (
    <div>
      <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Card.Header>
          <h5 style={{ textAlign: 'center' }}>
            <EmojiObjectsOutlined style={{ marginTop: '-4px' }} /> {t('cardTitle')}
          </h5>
        </Card.Header>
        <Card.Body>
          <h6 style={{ textAlign: 'center' }}>{t('line1')}</h6>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <KeyboardArrowRight /> {t('line2')}
            </ListGroup.Item>
            <ListGroup.Item>
              <KeyboardArrowRight /> {t('line3')}
            </ListGroup.Item>
            <ListGroup.Item>
              <KeyboardArrowRight /> {t('line4')}
            </ListGroup.Item>
            <ListGroup.Item>
              <KeyboardArrowRight /> {t('line5')}
            </ListGroup.Item>
            <ListGroup.Item>
              <KeyboardArrowRight /> {t('line6')}
            </ListGroup.Item>
            <ListGroup.Item>
              <KeyboardArrowRight /> {t('line7')}
            </ListGroup.Item>
            <ListGroup.Item>
              <KeyboardArrowRight /> {t('line8')}
              <ul style={{ fontSize: '14px' }}>
                <li>{t('list1')}</li>
                <li>{t('list2')}</li>
                <li>{t('list3')}</li>
                <li>{t('list4')}</li>
              </ul>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer style={{ fontSize: '14px' }}>
          {t('cardFooter', {
            informationSite: (
              <a href={siteLink} rel='noopener noreferrer' target='_blank'>
                {siteTitle} <OpenInNew style={{ fontSize: '14px' }} />
              </a>
            )
          })}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default translate('Tips')(Tips);
