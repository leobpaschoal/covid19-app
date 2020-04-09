import React, { Component } from 'react';
import { monitor } from '../../client';
import moment from 'moment';
import { translate } from 'react-translate';
import { Timeline, UnfoldMore } from '@material-ui/icons';
import { replaceStringToNumber } from '../Utils/Numbers';
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, Legend, ResponsiveContainer } from 'recharts';
import { Card, Accordion } from 'react-bootstrap';
import { countriesTranslated } from '../Utils/Utils';
import SpinnerLoad from '../Load/SpinnerLoad';
import SelectSearch from 'react-select-search';
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
    if (country) {
      this.setState({ loadingCasesByParticularCountry: true });
      await monitor()
        .get('/cases_by_particular_country.php', {
          params: { country: country },
        })
        .then((response) => {
          if (response.statusText === 'OK') {
            const stats = response.data.stat_by_country;
            const filteredStats = stats.filter((stat) => moment(stat.record_date).format('HH:mm') === '23:50');
            filteredStats.push(stats.pop());
            console.log(filteredStats);
            const dataChart = filteredStats.map((fs) => ({
              name: moment(fs.record_date).format('YYYY-MM-DD'),
              Confirmed: fs.total_cases ? replaceStringToNumber(fs.total_cases) : 0,
              Infected: fs.active_cases ? replaceStringToNumber(fs.active_cases) : 0,
              Deaths: fs.total_deaths ? replaceStringToNumber(fs.total_deaths) : 0,
              Recovered: fs.total_recovered ? replaceStringToNumber(fs.total_recovered) : 0,
            }));
            this.setState({ casesByParticularCountry: dataChart });
          } else {
            console.log('error cases_by_particular_country');
          }
        })
        .catch((e) => {
          console.log(e + ' catch!');
        });
      this.setState({
        loadingCasesByParticularCountry: false,
        countrySelected: country,
        flag: countriesTranslated.find((ct) => ct.originalName === country).tlc.toLowerCase(),
      });
    }
  };

  countriesTranslatedByContinentOptions = () => {
    const countriesSorted = countriesTranslated.sort((a, b) => {
      const textA = a.originalName.toUpperCase();
      const textB = b.originalName.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    return [
      {
        type: 'group',
        name: 'Asia',
        items: countriesSorted
          .filter((fc) => fc.continent === 'Asia')
          .map((mc) => ({ name: mc.brName, value: mc.originalName })),
      },
      {
        type: 'group',
        name: 'Europe',
        items: countriesSorted
          .filter((fc) => fc.continent === 'Europe')
          .map((mc) => ({ name: mc.brName, value: mc.originalName })),
      },
      {
        type: 'group',
        name: 'Africa',
        items: countriesSorted
          .filter((fc) => fc.continent === 'Africa')
          .map((mc) => ({ name: mc.brName, value: mc.originalName })),
      },
      {
        type: 'group',
        name: 'North America',
        items: countriesSorted
          .filter((fc) => fc.continent === 'North America')
          .map((mc) => ({ name: mc.brName, value: mc.originalName })),
      },
      {
        type: 'group',
        name: 'South America',
        items: countriesSorted
          .filter((fc) => fc.continent === 'South America')
          .map((mc) => ({ name: mc.brName, value: mc.originalName })),
      },
      {
        type: 'group',
        name: 'Oceania',
        items: countriesSorted
          .filter((fc) => fc.continent === 'Oceania')
          .map((mc) => ({ name: mc.brName, value: mc.originalName })),
      },
    ];
  };

  render() {
    const { casesByParticularCountry, countrySelected, loadingCasesByParticularCountry, flag } = this.state;
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
                    <SelectSearch
                      key='countries'
                      value={countrySelected}
                      options={this.countriesTranslatedByContinentOptions()}
                      onChange={this.getCasesByParticularCountry}
                      placeholder={this.props.t('defaultSearchCountry')}
                      search
                      disabled={loadingCasesByParticularCountry}
                    />
                  }
                />
                <div>
                  <hr />
                  <div>
                    <Flag code={flag} height='40' style={{ border: '1px solid black' }} />
                  </div>
                  <ResponsiveContainer height={350}>
                    <AreaChart data={casesByParticularCountry} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                      <XAxis dataKey='name' />
                      <YAxis />
                      <CartesianGrid strokeDasharray='3 3' />
                      <Tooltip />
                      <Legend />
                      <Area
                        type='monotone'
                        dataKey='Confirmed'
                        stroke='#3b79b7'
                        fillOpacity={1}
                        fill='url(#colorConfirmed)'
                        style={{ border: '6px solid black' }}
                      />
                      <Area
                        type='monotone'
                        dataKey='Infected'
                        stroke='#696969'
                        fillOpacity={1}
                        fill='url(#colorInfected)'
                      />
                      <Area
                        type='monotone'
                        dataKey='Deaths'
                        stroke='#ad2836'
                        fillOpacity={1}
                        fill='url(#colorDeaths)'
                      />
                      <Area
                        type='monotone'
                        dataKey='Recovered'
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
