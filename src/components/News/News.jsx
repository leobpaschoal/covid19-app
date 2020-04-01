import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { OpenInNew } from '@material-ui/icons';
import moment from 'moment';
import './News.css';

const News = ({ news }) => (
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
                  width={200}
                  src={n.urlToImage ? n.urlToImage : ''}
                  onError={e => {
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
            Published At {moment(n.publishedAt).format('YYYY-MM-DD HH:MM')} <em>{n.author && 'by ' + n.author}</em>
          </div>
        </Card.Footer>
      </Card>
    ))}
  </div>
);

export default News;
