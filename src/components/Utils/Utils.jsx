import React from 'react';
import NumberFormat from 'react-number-format';
// import matchSorter from 'match-sorter';
import '../Stats/TableStats.css';
import { ChevronExpand } from 'react-bootstrap-icons';

export const tableColumns = [
  {
    Header: <input defaultValue='' id='' type='text' placeholder='Search country' className='search-input-country' />,
    fixed: 'left',
    headerClassName: 'country-table-header',
    columns: [
      {
        Header: (
          <span>
            Countries <ChevronExpand size={14} />
          </span>
        ),
        id: 'countryName',
        accessor: 'country_name',
        className: 'country-table-column',
        headerClassName: 'country-table-header'
      }
    ]
  },
  {
    Header: 'Confirmed',
    headerClassName: 'confirmed-table-header',
    columns: [
      {
        Header: (
          <span>
            Total <ChevronExpand size={14} />
          </span>
        ),
        accessor: 'tableCases',
        Cell: row => <span>{row.original.cases}</span>,
        className: 'confirmed-table-column',
        headerClassName: 'confirmed-table-header'
      },
      {
        Header: (
          <span>
            Last 24h <ChevronExpand size={14} />
          </span>
        ),
        accessor: 'tableNewCases',
        Cell: row => <span>{row.original.new_cases}</span>,
        className: 'confirmed-table-column',
        headerClassName: 'confirmed-table-header'
      }
    ]
  },
  {
    Header: 'Infected',
    headerClassName: 'infected-table-header',
    columns: [
      {
        Header: (
          <span>
            Total <ChevronExpand size={14} />
          </span>
        ),
        accessor: 'tableInfecteds',
        Cell: row => <span>{row.original.active_cases}</span>,
        className: 'infected-table-column',
        headerClassName: 'infected-table-header'
      },
      {
        Header: 'Percent',
        acessor: 'tablePercentInfecteds',
        Cell: row => (
          <NumberFormat decimalScale={2} displayType={'text'} suffix={'%'} value={row.original.tablePercentInfecteds} />
        ),
        className: 'infected-table-column',
        headerClassName: 'infected-table-header',
        sortable: false
      }
    ]
  },
  {
    Header: 'Deaths',
    headerClassName: 'deaths-table-header',
    columns: [
      {
        Header: (
          <span>
            Total <ChevronExpand size={14} />
          </span>
        ),
        accessor: 'tableDeaths',
        Cell: row => <span>{row.original.deaths}</span>,
        className: 'deaths-table-column',
        headerClassName: 'deaths-table-header'
      },
      {
        Header: (
          <span>
            Last 24h <ChevronExpand size={14} />
          </span>
        ),
        accessor: 'tableNewDeaths',
        Cell: row => <span>{row.original.new_deaths}</span>,
        className: 'deaths-table-column',
        headerClassName: 'deaths-table-header'
      },
      {
        Header: 'Percent',
        acessor: 'tablePercentDeaths',
        Cell: row => (
          <NumberFormat decimalScale={2} displayType={'text'} suffix={'%'} value={row.original.tablePercentDeaths} />
        ),
        className: 'deaths-table-column',
        headerClassName: 'deaths-table-header',
        sortable: false
      }
    ]
  },
  {
    Header: 'Recovered',
    headerClassName: 'recovered-table-header',
    columns: [
      {
        Header: (
          <span>
            Total <ChevronExpand size={14} />
          </span>
        ),
        accessor: 'tableRecovered',
        Cell: row => <span>{row.original.total_recovered}</span>,
        className: 'recovered-table-column',
        headerClassName: 'recovered-table-header'
      },
      {
        Header: 'Percent',
        acessor: 'tablePercentRecovered',
        Cell: row => (
          <NumberFormat decimalScale={2} displayType={'text'} suffix={'%'} value={row.original.tablePercentRecovered} />
        ),
        className: 'recovered-table-column',
        headerClassName: 'recovered-table-header',
        sortable: false
      }
    ]
  },
  {
    Header: 'Critical',
    headerClassName: 'critical-table-header',
    columns: [
      {
        Header: (
          <span>
            Total <ChevronExpand size={14} />
          </span>
        ),
        accessor: 'tableCritical',
        Cell: row => <span>{row.original.serious_critical}</span>,
        className: 'critical-table-column',
        headerClassName: 'critical-table-header'
      }
    ]
  }
];
