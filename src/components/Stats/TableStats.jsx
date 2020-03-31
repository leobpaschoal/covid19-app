import React from 'react';
import 'react-table/react-table.css';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import { translate } from 'react-translate';

import Card from 'react-bootstrap/Card';
import ReactTable from 'react-table';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import NumberFormat from 'react-number-format';
import { ChevronExpand } from 'react-bootstrap-icons';
import { TableChart } from '@material-ui/icons';
import SpinnerLoad from '../Load/SpinnerLoad';
import './TableStats.css';

const ReactTableFixedColumns = withFixedColumns(ReactTable);

const TableStats = ({ data, loadingAllCases, filterByCountry, inputSearchCountry, t }) => (
  <Card className='table-card-adjust'>
    <Card.Header>
      <h5>
        <TableChart /> {t('cardTitle')}
      </h5>
    </Card.Header>
    <Card.Body className='table-card-body-adjust'>
      <div>
        <SpinnerLoad
          element={
            <ReactTableFixedColumns
              showPaginationTop
              showPaginationBottom={false}
              data={data}
              columns={[
                {
                  Header: (
                    <input
                      className='input-search-country'
                      value={inputSearchCountry}
                      onChange={e => filterByCountry(e.target.value)}
                      placeholder={t('inputSearchCountry')}
                    />
                  ),
                  fixed: 'left',
                  headerClassName: 'country-table-header',
                  columns: [
                    {
                      Header: (
                        <span>
                          {t('countries')} <ChevronExpand size={14} />
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
                  Header: t('confirmed'),
                  headerClassName: 'confirmed-table-header',
                  columns: [
                    {
                      Header: (
                        <span>
                          {t('total')} <ChevronExpand size={14} />
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
                          {t('last24h')} <ChevronExpand size={14} />
                        </span>
                      ),
                      accessor: 'tableNewCases',
                      Cell: row => <span>+{row.original.new_cases}</span>,
                      className: 'confirmed-table-column',
                      headerClassName: 'confirmed-table-header'
                    }
                  ]
                },
                {
                  Header: t('infecteds'),
                  headerClassName: 'infected-table-header',
                  columns: [
                    {
                      Header: (
                        <span>
                          {t('total')} <ChevronExpand size={14} />
                        </span>
                      ),
                      accessor: 'tableInfecteds',
                      Cell: row => <span>{row.original.active_cases}</span>,
                      className: 'infected-table-column',
                      headerClassName: 'infected-table-header'
                    },
                    {
                      Header: t('percent'),
                      acessor: 'tablePercentInfecteds',
                      Cell: row => (
                        <NumberFormat
                          decimalScale={2}
                          displayType={'text'}
                          suffix={'%'}
                          value={row.original.tablePercentInfecteds}
                        />
                      ),
                      className: 'infected-table-column',
                      headerClassName: 'infected-table-header',
                      sortable: false
                    }
                  ]
                },
                {
                  Header: t('deaths'),
                  headerClassName: 'deaths-table-header',
                  columns: [
                    {
                      Header: (
                        <span>
                          {t('total')} <ChevronExpand size={14} />
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
                          {t('last24h')} <ChevronExpand size={14} />
                        </span>
                      ),
                      accessor: 'tableNewDeaths',
                      Cell: row => <span>+{row.original.new_deaths}</span>,
                      className: 'deaths-table-column',
                      headerClassName: 'deaths-table-header'
                    },
                    {
                      Header: t('percent'),
                      acessor: 'tablePercentDeaths',
                      Cell: row => (
                        <NumberFormat
                          decimalScale={2}
                          displayType={'text'}
                          suffix={'%'}
                          value={row.original.tablePercentDeaths}
                        />
                      ),
                      className: 'deaths-table-column',
                      headerClassName: 'deaths-table-header',
                      sortable: false
                    }
                  ]
                },
                {
                  Header: t('recovered'),
                  headerClassName: 'recovered-table-header',
                  columns: [
                    {
                      Header: (
                        <span>
                          {t('total')} <ChevronExpand size={14} />
                        </span>
                      ),
                      accessor: 'tableRecovered',
                      Cell: row => <span>{row.original.total_recovered}</span>,
                      className: 'recovered-table-column',
                      headerClassName: 'recovered-table-header'
                    },
                    {
                      Header: t('percent'),
                      acessor: 'tablePercentRecovered',
                      Cell: row => (
                        <NumberFormat
                          decimalScale={2}
                          displayType={'text'}
                          suffix={'%'}
                          value={row.original.tablePercentRecovered}
                        />
                      ),
                      className: 'recovered-table-column',
                      headerClassName: 'recovered-table-header',
                      sortable: false
                    }
                  ]
                },
                {
                  Header: t('critical'),
                  headerClassName: 'critical-table-header',
                  columns: [
                    {
                      Header: (
                        <span>
                          {t('total')} <ChevronExpand size={14} />
                        </span>
                      ),
                      accessor: 'tableCritical',
                      Cell: row => <span>{row.original.serious_critical}</span>,
                      className: 'critical-table-column',
                      headerClassName: 'critical-table-header'
                    }
                  ]
                }
              ]}
              defaultPageSize={20}
              className='table'
              showPageJump={false}
              previousText={t('paginationPrevious')}
              nextText={t('paginationNext')}
              rowsText={t('paginationRows')}
              pageText={t('paginationPage')}
              ofText={t('paginationOf')}
            />
          }
          circle
          show={loadingAllCases}
          size={'lg'}
          animation={'border'}
          variant={'dark'}
        />
      </div>
    </Card.Body>
  </Card>
);

export default translate('TableStats')(TableStats);
