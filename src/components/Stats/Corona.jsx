import React, { Component } from 'react';
import { monitor, news } from '../../client';
import { GraphUp, Newspaper, QuestionCircleFill } from 'react-bootstrap-icons';
import { replaceStringToNumber, calcPercent } from '../Utils/Numbers';
import { translate } from 'react-translate';
import { countriesTranslated } from '../Utils/Utils';

import Header from '../Layout/Header';
import Global from './Global';
import Today from './Today';
import TableStats from './TableStats';
import News from '../News/News';
import About from '../About/About';

import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './Global.css';

class Corona extends Component {
  state = {
    globalStats: {},
    countriesStats: [],
    dayOccurrences: {},
    news: [],
    loadingGlobalStats: true,
    loadingAllCases: true,
    loadingNews: true,
    manageTimeout: null,
    refreshTime: 60000 * 10,
    refreshIsChecked: true,
    keyTab: 'global',
    inputSearchCountry: ''
  };

  componentDidMount = () => {
    this.getSyncAll(true, this.state.refreshTime);
    this.getNews();
  };

  getSyncAll = async (run, time) => {
    this.setState({ loadingGlobalStats: true, loadingAllCases: true });
    await this.getGlobalStats();
    await this.getAllCases();
    this.setState({ loadingGlobalStats: false, loadingAllCases: false });
    this.handleManageTimeout(run, time);
  };

  getGlobalStats = async () => {
    await monitor()
      .get('/worldstat.php')
      .then(response => {
        if (response.statusText === 'OK') {
          const res = response.data;

          const totalCases = replaceStringToNumber(res.total_cases);
          const totalRecovered = replaceStringToNumber(res.total_recovered);
          const totalDeaths = replaceStringToNumber(res.total_deaths);

          res.infected = totalCases - (totalRecovered + totalDeaths);
          res.percentInfected = calcPercent(res.infected, res.total_cases);
          res.percentDeaths = calcPercent(res.total_deaths, res.total_cases);
          res.percentRecovered = calcPercent(res.total_recovered, res.total_cases);

          this.setState({ globalStats: res });
          console.log('======== worldstat ==========');
          console.log(this.state.globalStats);
        } else {
          console.log('error worldstat');
        }
      })
      .catch(e => {
        console.log(e + ' --- catch! worldstat');
      });
  };

  getAllCases = async () => {
    await monitor()
      .get('/cases_by_country.php')
      .then(response => {
        if (response.statusText === 'OK') {
          console.log('======== cases_by_country ==========');
          console.log(response);

          const dataCountriesStats = response.data.countries_stat.sort(
            (a, b) => replaceStringToNumber(b.cases) - replaceStringToNumber(a.cases)
          );

          const dataCountriesStatsPrepared = dataCountriesStats.map(cbc => {
            const objCountryFind = countriesTranslated.find(ct => ct.originalName === cbc.country_name);
            let chosenCountry = cbc.country_name; // Default api

            if (this.props.tCountry === 'es') {
              chosenCountry = objCountryFind.esName;
            }

            if (this.props.tCountry === 'br') {
              chosenCountry = objCountryFind.brName;
            }

            return {
              ...cbc,
              country_name: chosenCountry,
              tableCases: replaceStringToNumber(cbc.cases),
              tableNewCases: replaceStringToNumber(cbc.new_cases),
              tableDeaths: replaceStringToNumber(cbc.deaths),
              tableNewDeaths: replaceStringToNumber(cbc.new_deaths),
              tableInfecteds: replaceStringToNumber(cbc.active_cases),
              tableRecovered: replaceStringToNumber(cbc.total_recovered),
              tableCritical: replaceStringToNumber(cbc.serious_critical),
              tablePercentInfecteds: calcPercent(cbc.active_cases, cbc.cases),
              tablePercentDeaths: calcPercent(cbc.deaths, cbc.cases),
              tablePercentRecovered: calcPercent(cbc.total_recovered, cbc.cases)
            };
          });

          this.setState({
            countriesStats: dataCountriesStatsPrepared,
            filteredCountries: dataCountriesStatsPrepared
          });

          const maxValue = Math.max.apply(
            Math,
            dataCountriesStatsPrepared.map(cs => replaceStringToNumber(cs.new_deaths))
          );

          this.setState({
            dayOccurrences: dataCountriesStatsPrepared.find(dcs => replaceStringToNumber(dcs.new_deaths) === maxValue)
          });
          console.log('======== DAY OCCURENCES ==========');
          console.log(this.state.dayOccurrences);
        } else {
          console.log('error cases_by_country');
        }
      })
      .catch(e => {
        console.log(e + 'catch! cases_by_country');
      });
  };

  getNews = async () => {
    this.setState({ loadingNews: true });

    let country = 'us';
    let type = 'coronavirus';

    switch (this.props.tCountry) {
      case 'br':
        country = 'br';
        type = 'coronavírus';
        break;
      default:
        break;
    }

    await news()
      .get(`/top-headlines?q=${type}&country=${country}&category=health&apiKey=a126f00f72124e758e38dbab92d31aa3`)
      .then(response => {
        console.log('======== NEWS ==========');
        const res = response.data;
        console.log(response);
        if (res.status === 'ok') {
          this.setState({ news: res.articles });
        } else {
          console.log('error news');
        }
        this.setState({ loadingNews: false });
      })
      .catch(e => {
        console.log(e + 'catch news');
      });
  };

  handleManageTimeout = (run, time) => {
    clearTimeout(this.state.manageTimeout);

    if (run) {
      this.setState({
        manageTimeout: setTimeout(() => {
          this.getSyncAll(true, time);
        }, time)
      });
    }
  };

  handleRefreshChecked = () => {
    this.setState({ refreshIsChecked: !this.state.refreshIsChecked });

    if (!this.state.refreshIsChecked) {
      this.handleManageTimeout(true, this.state.refreshTime);
    } else {
      this.handleManageTimeout(false);
    }
  };

  handleChangeRefreshTime = event => {
    this.setState({ refreshTime: event.target.value });
    if (this.state.refreshIsChecked) {
      this.handleManageTimeout(true, event.target.value);
    }
  };

  filterByCountry = value => {
    this.setState({
      inputSearchCountry: value,
      filteredCountries: this.state.countriesStats.filter(
        country => country.country_name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      )
    });
  };

  setKeyTab = key => {
    this.setState({ keyTab: key });
  };

  render() {
    const {
      globalStats,
      filteredCountries,
      dayOccurrences,
      loadingGlobalStats,
      loadingAllCases,
      refreshIsChecked,
      refreshTime,
      keyTab,
      news,
      inputSearchCountry
    } = this.state;

    return (
      <div>
        <Header
          lastUpdated={globalStats.statistic_taken_at}
          handleChangeRefreshTime={this.handleChangeRefreshTime}
          handleRefreshChecked={this.handleRefreshChecked}
          refreshIsChecked={refreshIsChecked}
          refreshTime={refreshTime}
          loadingGlobalStats={loadingGlobalStats}
        />
        <Container>
          <Tabs activeKey={keyTab} onSelect={k => this.setKeyTab(k)}>
            <Tab
              eventKey='global'
              title={
                <span>
                  {this.props.t('statisticsTab')} <GraphUp />
                </span>
              }
            >
              <Global globalStats={globalStats} loadingGlobalStats={loadingGlobalStats} />
              <Today
                loadingGlobalStats={loadingGlobalStats}
                loadingAllCases={loadingAllCases}
                dayOccurrences={dayOccurrences}
                newCases={globalStats.new_cases}
                newDeaths={globalStats.new_deaths}
              />
              <TableStats
                data={filteredCountries}
                loadingAllCases={loadingAllCases}
                inputSearchCountry={inputSearchCountry}
                filterByCountry={this.filterByCountry}
              />
            </Tab>
            <Tab
              eventKey='news'
              title={
                <span>
                  {this.props.t('newsTab')} <Newspaper />
                </span>
              }
            >
              <News news={news} />
            </Tab>
            <Tab
              eventKey='about'
              title={
                <span>
                  {this.props.t('aboutTab')} <QuestionCircleFill />
                </span>
              }
            >
              <About />
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}

export default translate('Corona')(Corona);
