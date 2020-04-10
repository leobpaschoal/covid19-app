import React, { Component } from 'react';
import { monitor } from '../../client';
import moment from 'moment';
import { translate } from 'react-translate';
import { Timeline, UnfoldMore } from '@material-ui/icons';
import { replaceStringToNumber } from '../Utils/Numbers';
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, Legend, Label, ResponsiveContainer } from 'recharts';
import { Card, Accordion } from 'react-bootstrap';
import { countriesTranslated } from '../Utils/Utils';
import SpinnerLoad from '../Load/SpinnerLoad';
import Select from 'react-select';
import Flag from 'react-world-flags';

import './Graphic.css';

class Graphic extends Component {
  state = {
    casesByParticularCountry: [],
    loadingCasesByParticularCountry: false,
    countrySelected: '',
    flag: '',
  };

  getCasesByParticularCountry = async (country) => {
    if (country.value) {
      this.setState({ loadingCasesByParticularCountry: true });
      await monitor()
        .get('/cases_by_particular_country.php', {
          params: { country: country.value },
        })
        .then((response) => {
          if (response.statusText === 'OK') {
            const stats = response.data.stat_by_country;
            const filteredStats = stats.filter((stat) => moment(stat.record_date).format('HH:mm') === '23:50');
            filteredStats.push(stats.pop());
            const dataChart = filteredStats.map((fs) => ({
              name: this.setTranslateDate(moment(fs.record_date)),
              Confirmed: fs.total_cases ? replaceStringToNumber(fs.total_cases) : 0,
              Infected: fs.active_cases ? replaceStringToNumber(fs.active_cases) : 0,
              Deaths: fs.total_deaths ? replaceStringToNumber(fs.total_deaths) : 0,
              Recovered: fs.total_recovered ? replaceStringToNumber(fs.total_recovered) : 0,
            }));
            this.setState({
              casesByParticularCountry: dataChart,
              countrySelected: country.label,
              flag: countriesTranslated.find((ct) => ct.originalName === country.value).tlc.toLowerCase(),
            });
          } else {
            this.props.handleError(this.props.t('messageErrorParticularCountry'));
          }
        })
        .catch(() => {
          this.props.handleError(this.props.t('messageErrorParticularCountry'));
        });
      this.setState({ loadingCasesByParticularCountry: false });
    }
  };

  setTranslateCountry = (country) => {
    if (this.props.tCountry === 'br') {
      return country.brName;
    } else if (this.props.tCountry === 'es') {
      return country.esName;
    } else {
      return country.originalName;
    }
  };

  setTranslateDate = (date) => {
    if (this.props.tCountry === 'br') {
      return date.format('DD/MM/YYYY');
    }
    return date.format('YYYY-MM-DD');
  };

  countriesTranslatedByContinentOptions = () => {
    const countriesSorted = countriesTranslated.sort((a, b) => {
      const textA = this.setTranslateCountry(a).toUpperCase();
      const textB = this.setTranslateCountry(b).toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    return [
      {
        label: (
          <div className='graphic-continents'>
            <div>
              <img src='./flags/continents/europe.png' alt='' />
            </div>
            <div>{this.props.t('europe')}</div>
          </div>
        ),
        options: countriesSorted
          .filter((fc) => fc.continent === 'Europe')
          .map((mc) => ({ label: this.setTranslateCountry(mc), value: mc.originalName })),
      },
      {
        label: (
          <div className='graphic-continents'>
            <div>
              <img src='./flags/continents/namerica.png' alt='' />
            </div>
            <div>{this.props.t('northAmerica')}</div>
          </div>
        ),
        options: countriesSorted
          .filter((fc) => fc.continent === 'North America')
          .map((mc) => ({ label: this.setTranslateCountry(mc), value: mc.originalName })),
      },
      {
        label: (
          <div className='graphic-continents'>
            <div>
              <img src='./flags/continents/samerica.png' alt='' />
            </div>
            <div>{this.props.t('southAmerica')}</div>
          </div>
        ),
        options: countriesSorted
          .filter((fc) => fc.continent === 'South America')
          .map((mc) => ({ label: this.setTranslateCountry(mc), value: mc.originalName })),
      },
      {
        label: (
          <div className='graphic-continents'>
            <div>
              <img src='./flags/continents/asia.png' alt='' />
            </div>
            <div>{this.props.t('asia')}</div>
          </div>
        ),
        options: countriesSorted
          .filter((fc) => fc.continent === 'Asia')
          .map((mc) => ({ label: this.setTranslateCountry(mc), value: mc.originalName })),
      },
      {
        label: (
          <div className='graphic-continents'>
            <div>
              <img src='./flags/continents/africa.png' alt='' />
            </div>
            <div>{this.props.t('africa')}</div>
          </div>
        ),
        options: countriesSorted
          .filter((fc) => fc.continent === 'Africa')
          .map((mc) => ({ label: this.setTranslateCountry(mc), value: mc.originalName })),
      },
      {
        label: (
          <div className='graphic-continents'>
            <div>
              <img src='./flags/continents/oceania.png' alt='' />
            </div>
            <div>{this.props.t('oceania')}</div>
          </div>
        ),
        options: countriesSorted
          .filter((fc) => fc.continent === 'Oceania')
          .map((mc) => ({ label: this.setTranslateCountry(mc), value: mc.originalName })),
      },
    ];
  };

  render() {
    const { casesByParticularCountry, countrySelected, loadingCasesByParticularCountry, flag } = this.state;

    const customStyles = {
      container: (base) => ({
        ...base,
        maxWidth: 400,
        padding: '0 10px 0 10px',
        margin: '0 auto',
        fontSize: '14px',
      }),
      groupHeading: (base) => ({
        ...base,
        backgroundColor: 'lightgray',
        color: 'black',
        padding: 5,
      }),
    };

    return (
      <Accordion>
        <Card className='graphic-card-content'>
          <Accordion.Toggle as={Card.Header} eventKey='0'>
            <div className='graphic-card-header'>
              <div>
                <h5>
                  <Timeline className='graphic-icon-title' /> {this.props.t('cardTitle')}{' '}
                </h5>
              </div>
              <div>
                <UnfoldMore className='graphic-icon-toggle' />
              </div>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='0'>
            <Card.Body className='graphic-card-body'>
              <div className='graphic-itens'>
                <SpinnerLoad
                  size={'xs'}
                  animation={'border'}
                  variant={'dark'}
                  show={loadingCasesByParticularCountry}
                  element={
                    <Select
                      options={this.countriesTranslatedByContinentOptions()}
                      onChange={this.getCasesByParticularCountry}
                      isSearchable
                      placeholder={countrySelected ? countrySelected : this.props.t('defaultSearchCountry')}
                      styles={customStyles}
                    />
                  }
                />
                <div>
                  <hr />
                  <div style={{ display: countrySelected ? 'block' : 'none' }}>
                    <Flag code={flag} height='40' style={{ border: '1px solid black' }} />
                  </div>
                  <ResponsiveContainer height={350}>
                    <AreaChart data={casesByParticularCountry} margin={{ top: 10, right: 10, left: 5, bottom: 0 }}>
                      <defs>
                        <linearGradient id='colorConfirmed' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='5%' stopColor='#3b79b7' stopOpacity={0.8} />
                          <stop offset='95%' stopColor='#3b79b7' stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id='colorInfected' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='5%' stopColor='#696969' stopOpacity={0.8} />
                          <stop offset='95%' stopColor='#696969' stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id='colorDeaths' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='5%' stopColor='#ad2836' stopOpacity={0.8} />
                          <stop offset='95%' stopColor='#ad2836' stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id='colorRecovered' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='5%' stopColor='#228b22' stopOpacity={0.8} />
                          <stop offset='95%' stopColor='#228b22' stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey='name'>
                        <Label value={this.props.t('date')} offset={0} position='insideBottom' />
                      </XAxis>
                      <YAxis label={{ value: this.props.t('peoples'), angle: -90, position: 'insideLeft' }} />
                      <CartesianGrid strokeDasharray='3 3' />
                      <Tooltip />
                      <Legend align={'right'} />
                      <Area
                        type='monotone'
                        dataKey='Confirmed'
                        name={this.props.t('confirmed')}
                        stroke='#3b79b7'
                        fillOpacity={1}
                        fill='url(#colorConfirmed)'
                        style={{ border: '6px solid black' }}
                      />
                      <Area
                        type='monotone'
                        dataKey='Infected'
                        name={this.props.t('infecteds')}
                        stroke='#696969'
                        fillOpacity={1}
                        fill='url(#colorInfected)'
                      />
                      <Area
                        type='monotone'
                        dataKey='Deaths'
                        name={this.props.t('deaths')}
                        stroke='#ad2836'
                        fillOpacity={1}
                        fill='url(#colorDeaths)'
                      />
                      <Area
                        type='monotone'
                        dataKey='Recovered'
                        name={this.props.t('recovered')}
                        stroke='#228b22'
                        fillOpacity={1}
                        fill='url(#colorRecovered)'
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default translate('Graphic')(Graphic);
