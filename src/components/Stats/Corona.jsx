import React, { Component, Fragment } from 'react';
import { monitor } from '../../client';
import './Global.css';
import Header from '../Layout/Header';

import Global from './Global';
import Today from './Today';
import Table from './Table';
import Container from 'react-bootstrap/Container';
import CountriesInfecteds from '../Modals/CountriesInfecteds';

class Corona extends Component {
  state = {
    globalStats: {},
    countriesStats: [],
    dayOccurrences: {},
    infectedCountries: [],
    infected: 0,
    showCountriesInfecteds: false,
    loadingGlobalStats: true,
    loadingAllCases: true,
    loadingInfectedCountries: true,
    manageTimeout: null
  };

  componentDidMount = () => {
    this.getSyncAll(false, 0);
  };

  getSyncAll = async (run, time) => {
    this.setState({ loadingGlobalStats: true, loadingAllCases: true });
    await this.getGlobalStats();
    await this.getAllCases();
    this.setState({ loadingGlobalStats: false, loadingAllCases: false });
    this.handleManageTimeout(run, time);
  };

  handleManageTimeout = (run, time) => {
    if (run) {
      this.setState({
        manageTimeout: setTimeout(() => {
          this.getSyncAll(true, time);
        }, time)
      });
    } else {
      if (this.state.manageTimeout !== null) {
        clearTimeout(this.state.manageTimeout);
      }
    }
  };

  getGlobalStats = async () => {
    await monitor()
      .get('/worldstat.php')
      .then(response => {
        if (response.statusText === 'OK') {
          this.setState({ globalStats: response.data });
          const totalCases = this.replaceStringToNumber(response.data.total_cases);
          const totalRecovered = this.replaceStringToNumber(response.data.total_recovered);
          this.setState({ infected: totalCases - totalRecovered });
          console.log();
          console.log('======== worldstat ==========');
          console.log(this.state.globalStats);
        } else {
          console.log('error worldstat');
        }
      })
      .catch(() => {
        console.log('catch! worldstat');
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
          this.setState({ countriesStats: dataCountriesStats });

          const maxValue = Math.max.apply(
            Math,
            dataCountriesStats.map(cs => this.replaceStringToNumber(cs.new_deaths))
          );

          this.setState({
            dayOccurrences: dataCountriesStats.find(dcs => this.replaceStringToNumber(dcs.new_deaths) === maxValue)
          });
          console.log('======== DAY OCCURENCES ==========');
          console.log(this.state.dayOccurrences);
        } else {
          console.log('error cases_by_country');
        }
      })
      .catch(() => {
        console.log('catch! cases_by_country');
      });
  };

  getAllInfectedCountries = async () => {
    this.setState({ loadingInfectedCountries: true });

    await monitor()
      .get('/affected.php')
      .then(response => {
        console.log('======== INFECTED COUNTRIES ==========');
        console.log(response);
        if (response.statusText === 'OK') {
          this.setState({ infectedCountries: response.data.affected_countries });
        } else {
          console.log('error affected');
        }
        this.setState({ loadingInfectedCountries: false });
      })
      .catch(() => {
        console.log('catch! affected');
      });
  };

  handleCountriesInfecteds = () => {
    this.state.showCountriesInfecteds
      ? this.setState({ showCountriesInfecteds: false })
      : this.setState({ showCountriesInfecteds: true });
  };

  replaceStringToNumber = string => parseInt(string.replace(',', ''));

  render() {
    const {
      globalStats,
      countriesStats,
      dayOccurrences,
      infected,
      showCountriesInfecteds,
      infectedCountries,
      loadingGlobalStats,
      loadingAllCases,
      loadingInfectedCountries
    } = this.state;

    return (
      <Fragment>
        <Header lastUpdated={globalStats.statistic_taken_at} handleManageTimeout={this.handleManageTimeout} />
        <Container>
          <Global
            infected={infected}
            globalStats={globalStats}
            handleCountriesInfecteds={this.handleCountriesInfecteds}
            loadingGlobalStats={loadingGlobalStats}
            loadingInfectedCountries={loadingInfectedCountries}
          />
          <Today
            loadingGlobalStats={loadingGlobalStats}
            loadingAllCases={loadingAllCases}
            dayOccurrences={dayOccurrences}
            newCases={globalStats.new_cases}
            newDeaths={globalStats.new_deaths}
          />
          <Table dataTable={countriesStats} />
          <CountriesInfecteds
            infectedCountries={infectedCountries}
            handleClose={this.handleCountriesInfecteds}
            show={showCountriesInfecteds}
          />
        </Container>
      </Fragment>
    );
  }
}

export default Corona;
