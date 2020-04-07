import React from 'react';
import { translate } from 'react-translate';
import { Card, Badge } from 'react-bootstrap';
import { OpenInNew } from '@material-ui/icons';
import moment from 'moment';
import './News.css';

const News = ({ news, isDateFormatted, t }) => (
  <div>
    {news.map((n, key) => (
      <Card key={key} className='news-card'>
        <a target='_blank' href={n.url} rel='noopener noreferrer'>
          <Card.Header>
            <h5>
              <Badge variant='secondary'>[{n.source.name}]</Badge> {n.title} <OpenInNew />
            </h5>
          </Card.Header>
          <Card.Body>
            <div className='content-news-card-body'>
              <div>
                <img
                  alt={''}
                  src={n.urlToImage ? n.urlToImage : ''}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = './noImage.png';
                    e.target.width = 100;
                  }}
                />
              </div>
              <div>
                <em>{n.description}</em>
              </div>
            </div>
          </Card.Body>
        </a>
        <Card.Footer>
          <div className='content-news-card-footer'>
            {n.author
              ? t('publishedAt', {
                  n: 1,
                  data: (
                    <em>
                      {isDateFormatted
                        ? moment(n.publishedAt).format('DD/MM/YYYY HH:mm')
                        : moment(n.publishedAt).format('YYYY-MM-DD HH:mm')}
                    </em>
                  ),
                  author: n.author,
                })
              : t('publishedAt', {
                  n: 2,
                  data: (
                    <em>
                      {isDateFormatted
                        ? moment(n.publishedAt).format('DD/MM/YYYY HH:mm')
                        : moment(n.publishedAt).format('YYYY-MM-DD HH:mm')}
                    </em>
                  ),
                })}
          </div>
        </Card.Footer>
      </Card>
    ))}
  </div>
);

export default translate('News')(News);
