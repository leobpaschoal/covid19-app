import React from 'react';
import Card from 'react-bootstrap/Card';
import './News.css';
import { BoxArrowInUpRight } from 'react-bootstrap-icons';
import moment from 'moment';
import Badge from 'react-bootstrap/Badge';

const News = ({ news }) => (
  <div>
    {news.map((n, key) => (
      <Card key={key} className='news-card'>
        <Card.Header>
          <h6>
            <a target='_blank' href={n.url} rel='noopener noreferrer'>
              <Badge variant='secondary'>[{n.source.name}]</Badge> {n.title} <BoxArrowInUpRight />
            </a>
          </h6>
        </Card.Header>
        <Card.Body>
          <div className='content-news-card-body'>
            <div>
              {/* <img width={200} src={n.urlToImage ? n.urlToImage : ''} /> */}
              <img
                alt={''}
                width={200}
                src={n.urlToImage ? n.urlToImage : ''}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png';
                }}
              />
            </div>
            <div>{n.description}</div>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className='content-news-card-footer'>
            Published At {moment(n.publishedAt).format('YYYY-MM-DD HH:MM')} by <em>{n.author}</em>
          </div>
        </Card.Footer>
      </Card>
    ))}
  </div>
);

export default News;
