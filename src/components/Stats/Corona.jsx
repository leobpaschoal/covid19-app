import React, { Component } from 'react';
import { monitor, news } from '../../client';
import './Global.css';
import Header from '../Layout/Header';
import { replaceStringToNumber, calcPercent } from '../Utils/Numbers';
import Global from './Global';
import Today from './Today';
import News from '../News/News';
import About from '../About/About';
import TableStats from './TableStats';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { GraphUp, Newspaper, QuestionCircleFill } from 'react-bootstrap-icons';

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
    searchValue: ''
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
        console.log('======== cases_by_country ==========');
        console.log(response);
        if (response.statusText === 'OK') {
          const dataCountriesStats = response.data.countries_stat;

          this.setState({
            countriesStats: dataCountriesStats.map(cbc => ({
              ...cbc,
              country_name:
                cbc.country_name === 'Iran'
                  ? 'Islamic Republic of Iran'
                  : cbc.country_name === 'Togo'
                  ? 'Togolese Republic'
                  : cbc.country_name,
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
            }))
          });

          const maxValue = Math.max.apply(
            Math,
            dataCountriesStats.map(cs => replaceStringToNumber(cs.new_deaths))
          );

          this.setState({
            dayOccurrences: dataCountriesStats.find(dcs => replaceStringToNumber(dcs.new_deaths) === maxValue)
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
    await news()
      .get()
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

  setKeyTab = key => {
    this.setState({ keyTab: key });
  };

  render() {
    const {
      globalStats,
      countriesStats,
      dayOccurrences,
      loadingGlobalStats,
      loadingAllCases,
      refreshIsChecked,
      refreshTime,
      keyTab,
      news
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
                  Statistics <GraphUp />
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
              <TableStats data={countriesStats} loadingAllCases={loadingAllCases} />
            </Tab>
            <Tab
              eventKey='news'
              title={
                <span>
                  News <Newspaper />
                </span>
              }
            >
              <News news={news} />
            </Tab>
            <Tab
              eventKey='about'
              title={
                <span>
                  About <QuestionCircleFill />
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

export default Corona;
