import React, { Component } from 'react';
import { monitor, news } from '../../client';
import { replaceStringToNumber, calcPercent } from '../Utils/Numbers';
import { translate } from 'react-translate';
import { countriesTranslated } from '../Utils/Utils';

import Header from '../Layout/Header';
import Configurations from '../Stats/Configurations';
import Global from './Global';
import Today from './Today';
import TableStats from './TableStats';
import Graphic from '../Graphics/Graphic';
import News from '../News/News';
import Tips from '../Tips/Tips';
import About from '../About/About';
import Translate from '../Translate/Translate';
import Errors from '../Utils/Errors';

import {
  HelpOutline,
  DescriptionOutlined,
  TrendingUpOutlined,
  Language,
  EmojiObjectsOutlined,
  Settings,
  Autorenew,
} from '@material-ui/icons';

import { Container, Tabs, Tab } from 'react-bootstrap';
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
    inputSearchCountry: '',
    showError: false,
    messageError: '',
  };

  componentDidMount = () => {
    this.getSyncAll(true, this.state.refreshTime);
    this.getNews();
  };

  UNSAFE_componentWillReceiveProps = async (nextProps) => {
    this.setState({ loadingGlobalStats: true, loadingAllCases: true, loadingNews: true });
    await this.getGlobalStats();
    await this.getAllCases();
    this.setState({ loadingGlobalStats: false, loadingAllCases: false });
    this.getNews(nextProps.tCountry);
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
      .then((response) => {
        if (response.statusText === 'OK') {
          const res = response.data;
          res.new_cases = replaceStringToNumber(res.new_cases);
          res.new_deaths = replaceStringToNumber(res.new_deaths);

          res.total_cases = replaceStringToNumber(res.total_cases);
          res.total_recovered = replaceStringToNumber(res.total_recovered);
          res.total_deaths = replaceStringToNumber(res.total_deaths);
          res.total_infected = res.total_cases - (res.total_recovered + res.total_deaths);

          res.percentInfected = calcPercent(res.total_infected, res.total_cases);
          res.percentDeaths = calcPercent(res.total_deaths, res.total_cases);
          res.percentRecovered = calcPercent(res.total_recovered, res.total_cases);

          this.setState({ globalStats: res });
        } else {
          this.handleError(this.props.t('messageErrorStatistics'));
        }
      })
      .catch(() => {
        this.handleError(this.props.t('messageErrorStatistics'));
      });
  };

  getAllCases = async () => {
    await monitor()
      .get('/cases_by_country.php')
      .then((response) => {
        if (response.statusText === 'OK') {
          const dataCountriesStats = response.data.countries_stat.sort(
            (a, b) => replaceStringToNumber(b.cases) - replaceStringToNumber(a.cases)
          );

          const dataCountriesStatsPrepared = dataCountriesStats.map((cbc) => {
            const objCountryFind = countriesTranslated.find((ct) => ct.originalName === cbc.country_name);
            let chosenCountry = cbc.country_name; // Default api

            if (objCountryFind) {
              if (this.props.tCountry === 'es') {
                chosenCountry = objCountryFind.esName;
              }

              if (this.props.tCountry === 'br') {
                chosenCountry = objCountryFind.brName;
              }
            }

            return {
              ...cbc,
              country_name: chosenCountry !== '' ? chosenCountry : 'Unknown',
              cases: replaceStringToNumber(cbc.cases),
              new_cases: replaceStringToNumber(cbc.new_cases),
              deaths: replaceStringToNumber(cbc.deaths),
              new_deaths: replaceStringToNumber(cbc.new_deaths),
              active_cases: replaceStringToNumber(cbc.active_cases),
              total_recovered: cbc.total_recovered !== 'N/A' ? replaceStringToNumber(cbc.total_recovered) : 0,
              serious_critical: replaceStringToNumber(cbc.serious_critical),
              tablePercentInfecteds: calcPercent(cbc.active_cases, cbc.cases),
              tablePercentDeaths: calcPercent(cbc.deaths, cbc.cases),
              tablePercentRecovered: cbc.total_recovered !== 'N/A' ? calcPercent(cbc.total_recovered, cbc.cases) : 0,
            };
          });

          this.setState({
            countriesStats: dataCountriesStatsPrepared,
            filteredCountries: dataCountriesStatsPrepared,
          });

          const maxValue = Math.max.apply(
            Math,
            dataCountriesStatsPrepared.map((cs) => cs.new_deaths)
          );

          this.setState({
            dayOccurrences: dataCountriesStatsPrepared.find((dcs) => dcs.new_deaths === maxValue),
          });
        } else {
          this.handleError(this.props.t('messageErrorStatistics'));
        }
      })
      .catch(() => {
        this.handleError(this.props.t('messageErrorStatistics'));
      });
  };

  getNews = async (nextCountryProps) => {
    let country = 'us';
    let type = 'coronavirus';

    if (nextCountryProps) {
      if (nextCountryProps === 'br') {
        country = 'br';
        type = 'coronavírus';
      }
    } else if (this.props.tCountry === 'br') {
      country = 'br';
      type = 'coronavírus';
    }

    await news()
      .get(`/top-headlines?q=${type}&country=${country}&category=health&apiKey=a126f00f72124e758e38dbab92d31aa3`)
      .then((response) => {
        const res = response.data;
        if (res.status === 'ok') {
          this.setState({
            news: res.articles.filter((art) => art.source.name !== 'Correiobraziliense.com.br'),
          });
        } else {
          this.handleError(this.props.t('messageErrorNews'));
        }
      })
      .catch(() => {
        this.handleError(this.props.t('messageErrorNews'));
      });
    this.setState({ loadingNews: false });
  };

  handleManageTimeout = (run, time) => {
    clearTimeout(this.state.manageTimeout);
    if (run) {
      this.setState({
        manageTimeout: setTimeout(() => {
          this.getSyncAll(true, time);
        }, time),
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

  handleChangeRefreshTime = (value) => {
    this.setState({ refreshTime: value });
    if (this.state.refreshIsChecked) {
      this.handleManageTimeout(true, value);
    }
  };

  handleError = (msg) => {
    this.setState({ showError: !this.state.showError, messageError: msg });
  };

  filterByCountry = (value) => {
    this.setState({
      inputSearchCountry: value,
      filteredCountries: this.state.countriesStats.filter(
        (country) => country.country_name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      ),
    });
  };

  setKeyTab = (key) => {
    this.setState({ keyTab: key });
  };

  render() {
    const {
      globalStats,
      filteredCountries,
      dayOccurrences,
      loadingGlobalStats,
      loadingAllCases,
      loadingNews,
      refreshIsChecked,
      refreshTime,
      keyTab,
      news,
      inputSearchCountry,
      showError,
      messageError,
    } = this.state;

    return (
      <div>
        <Errors showError={showError} messageError={messageError} handleError={this.handleError} />
        <Header
          lastUpdated={globalStats.statistic_taken_at}
          loadingGlobalStats={loadingGlobalStats}
          refreshIsChecked={refreshIsChecked}
          tCountry={this.props.tCountry}
        />
        <Container>
          <Tabs activeKey={keyTab} onSelect={(k) => this.setKeyTab(k)}>
            <Tab
              eventKey='global'
              title={
                <span>
                  {this.props.t('statisticsTab')} <TrendingUpOutlined />
                </span>
              }
            >
              <Global
                globalStats={globalStats}
                loadingGlobalStats={loadingGlobalStats}
                tCountry={this.props.tCountry}
              />
              <Today
                loadingGlobalStats={loadingGlobalStats}
                loadingAllCases={loadingAllCases}
                dayOccurrences={dayOccurrences}
                newCases={globalStats.new_cases}
                newDeaths={globalStats.new_deaths}
                tCountry={this.props.tCountry}
              />
              <Graphic tCountry={this.props.tCountry} handleError={this.handleError} />
              <TableStats
                data={filteredCountries}
                loadingAllCases={loadingAllCases}
                inputSearchCountry={inputSearchCountry}
                filterByCountry={this.filterByCountry}
                tCountry={this.props.tCountry}
              />
            </Tab>
            <Tab
              disabled={loadingNews}
              eventKey='news'
              title={
                <span>
                  {this.props.t('newsTab')}{' '}
                  {loadingNews ? <Autorenew className='corona-news-spin' /> : <DescriptionOutlined />}
                </span>
              }
            >
              <News news={news} isDateFormatted={this.props.tCountry === 'br' ? true : false} />
            </Tab>
            <Tab
              eventKey='tips'
              title={
                <span>
                  {this.props.t('tipsTab')} <EmojiObjectsOutlined />
                </span>
              }
            >
              <Tips tCountry={this.props.tCountry} />
            </Tab>
            <Tab
              eventKey='about'
              title={
                <span>
                  {this.props.t('aboutTab')} <HelpOutline />
                </span>
              }
            >
              <About />
            </Tab>
            <Tab eventKey='configuration' title={<Settings />}>
              <Configurations
                handleChangeRefreshTime={this.handleChangeRefreshTime}
                handleRefreshChecked={this.handleRefreshChecked}
                refreshIsChecked={refreshIsChecked}
                refreshTime={refreshTime}
              />
            </Tab>
            <Tab eventKey='translate' title={<Language />}>
              <Translate />
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}

export default translate('Corona')(Corona);
