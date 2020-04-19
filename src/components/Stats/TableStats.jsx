import React from 'react';
import 'react-table/react-table.css';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import { translate } from 'react-translate';
import { makeNumberThousandSeparator } from '../Utils/Numbers';

import Card from 'react-bootstrap/Card';
import ReactTable from 'react-table';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import NumberFormat from 'react-number-format';
import { TableChart, UnfoldMore, InfoOutlined } from '@material-ui/icons';

import TableInfoModal from '../Utils/TableInfoModal';
import SpinnerLoad from '../Load/SpinnerLoad';
import './TableStats.css';

const ReactTableFixedColumns = withFixedColumns(ReactTable);

const TableStats = ({
  data,
  loadingAllCases,
  filterByCountry,
  handleShowInfoTableModal,
  showInfoTableModal,
  inputSearchCountry,
  tCountry,
  t,
}) => (
  <div>
    <TableInfoModal handleShowInfoTableModal={handleShowInfoTableModal} showInfoTableModal={showInfoTableModal} />
    <Card className='table-card-adjust'>
      <Card.Header>
        <div className='table-card-header'>
          <div>
            <h5>
              <TableChart /> {t('cardTitle')}
            </h5>
          </div>
          <div>
            <InfoOutlined onClick={handleShowInfoTableModal} className='table-icon-toggle' />
          </div>
        </div>
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
                        onChange={(e) => filterByCountry(e.target.value)}
                        placeholder={t('inputSearchCountry')}
                      />
                    ),
                    fixed: 'left',
                    headerClassName: 'country-table-header',
                    columns: [
                      {
                        Header: (
                          <span>
                            {t('countries')} <UnfoldMore style={{ fontSize: '18px' }} />
                          </span>
                        ),
                        id: 'countryName',
                        accessor: 'country_name',
                        className: 'country-table-column',
                        headerClassName: 'country-table-header',
                      },
                    ],
                  },
                  {
                    Header: t('confirmed'),
                    headerClassName: 'confirmed-table-header',
                    columns: [
                      {
                        Header: (
                          <span>
                            {t('total')} <UnfoldMore style={{ fontSize: '18px' }} />
                          </span>
                        ),
                        accessor: 'cases',
                        Cell: (row) => <span>{makeNumberThousandSeparator(row.original.cases, tCountry)}</span>,
                        className: 'confirmed-table-column',
                        headerClassName: 'confirmed-table-header',
                      },
                      {
                        Header: (
                          <span>
                            {t('last24h')} <UnfoldMore style={{ fontSize: '18px' }} />
                          </span>
                        ),
                        accessor: 'new_cases',
                        Cell: (row) => <span>+{makeNumberThousandSeparator(row.original.new_cases, tCountry)}</span>,
                        className: 'confirmed-table-column',
                        headerClassName: 'confirmed-table-header',
                      },
                      {
                        Header: (
                          <span>
                            {t('per1m')} <UnfoldMore style={{ fontSize: '18px' }} />
                          </span>
                        ),
                        accessor: 'total_cases_per_1m_population',
                        Cell: (row) => (
                          <span>
                            {makeNumberThousandSeparator(row.original.total_cases_per_1m_population, tCountry)}
                          </span>
                        ),
                        className: 'confirmed-table-column',
                        headerClassName: 'confirmed-table-header',
                      },
                    ],
                  },
                  {
                    Header: t('infecteds'),
                    headerClassName: 'infected-table-header',
                    columns: [
                      {
                        Header: (
                          <span>
                            {t('total')} <UnfoldMore style={{ fontSize: '18px' }} />
                          </span>
                        ),
                        accessor: 'active_cases',
                        Cell: (row) => <span>{makeNumberThousandSeparator(row.original.active_cases, tCountry)}</span>,
                        className: 'infected-table-column',
                        headerClassName: 'infected-table-header',
                      },
                      {
                        Header: t('percent'),
                        acessor: 'tablePercentInfecteds',
                        Cell: (row) => (
                          <NumberFormat
                            decimalScale={2}
                            displayType={'text'}
                            suffix={'%'}
                            value={row.original.tablePercentInfecteds}
                          />
                        ),
                        className: 'infected-table-column',
                        headerClassName: 'infected-table-header',
                        sortable: false,
                      },
                    ],
                  },
                  {
                    Header: t('deaths'),
                    headerClassName: 'deaths-table-header',
                    columns: [
                      {
                        Header: (
                          <span>
                            {t('total')} <UnfoldMore style={{ fontSize: '18px' }} />
                          </span>
                        ),
                        accessor: 'deaths',
                        Cell: (row) => <span>{makeNumberThousandSeparator(row.original.deaths, tCountry)}</span>,
                        className: 'deaths-table-column',
                        headerClassName: 'deaths-table-header',
                      },
                      {
                        Header: (
                          <span>
                            {t('last24h')} <UnfoldMore style={{ fontSize: '18px' }} />
                          </span>
                        ),
                        accessor: 'new_deaths',
                        Cell: (row) => <span>+{makeNumberThousandSeparator(row.original.new_deaths, tCountry)}</span>,
                        className: 'deaths-table-column',
                        headerClassName: 'deaths-table-header',
                      },
                      {
                        Header: (
                          <span>
                            {t('per1m')} <UnfoldMore style={{ fontSize: '18px' }} />
                          </span>
                        ),
                        accessor: 'deaths_per_1m_population',
                        Cell: (row) => (
                          <span>{makeNumberThousandSeparator(row.original.deaths_per_1m_population, tCountry)}</span>
                        ),
                        className: 'deaths-table-column',
                        headerClassName: 'deaths-table-header',
                      },
                      {
                        Header: t('percent'),
                        acessor: 'tablePercentDeaths',
                        Cell: (row) => (
                          <NumberFormat
                            decimalScale={2}
                            displayType={'text'}
                            suffix={'%'}
                            value={row.original.tablePercentDeaths}
                          />
                        ),
                        className: 'deaths-table-column',
                        headerClassName: 'deaths-table-header',
                        sortable: false,
                      },
                    ],
                  },
                  {
                    Header: t('recovered'),
                    headerClassName: 'recovered-table-header',
                    columns: [
                      {
                        Header: (
                          <span>
                            {t('total')} <UnfoldMore style={{ fontSize: '18px' }} />
                          </span>
                        ),
                        accessor: 'total_recovered',
                        Cell: (row) => (
                          <span>{makeNumberThousandSeparator(row.original.total_recovered, tCountry)}</span>
                        ),
                        className: 'recovered-table-column',
                        headerClassName: 'recovered-table-header',
                      },
                      {
                        Header: t('percent'),
                        acessor: 'tablePercentRecovered',
                        Cell: (row) => (
                          <NumberFormat
                            decimalScale={2}
                            displayType={'text'}
                            suffix={'%'}
                            value={row.original.tablePercentRecovered}
                          />
                        ),
                        className: 'recovered-table-column',
                        headerClassName: 'recovered-table-header',
                        sortable: false,
                      },
                    ],
                  },
                  {
                    Header: t('critical'),
                    headerClassName: 'critical-table-header',
                    columns: [
                      {
                        Header: (
                          <span>
                            {t('total')} <UnfoldMore style={{ fontSize: '18px' }} />
                          </span>
                        ),
                        accessor: 'serious_critical',
                        Cell: (row) => (
                          <span>{makeNumberThousandSeparator(row.original.serious_critical, tCountry)}</span>
                        ),
                        className: 'critical-table-column',
                        headerClassName: 'critical-table-header',
                      },
                    ],
                  },
                  {
                    Header: t('tests'),
                    headerClassName: 'tests-table-header',
                    columns: [
                      {
                        Header: (
                          <span>
                            {t('total')} <UnfoldMore style={{ fontSize: '18px' }} />
                          </span>
                        ),
                        accessor: 'total_tests',
                        Cell: (row) => <span>{makeNumberThousandSeparator(row.original.total_tests, tCountry)}</span>,
                        className: 'tests-table-column',
                        headerClassName: 'tests-table-header',
                      },
                      {
                        Header: (
                          <span>
                            {t('per1m')} <UnfoldMore style={{ fontSize: '18px' }} />
                          </span>
                        ),
                        accessor: 'tests_per_1m_population',
                        Cell: (row) => (
                          <span>{makeNumberThousandSeparator(row.original.tests_per_1m_population, tCountry)}</span>
                        ),
                        className: 'tests-table-column',
                        headerClassName: 'tests-table-header',
                      },
                    ],
                  },
                ]}
                defaultPageSize={25}
                pageSizeOptions={[25, 50, 100]}
                className='table'
                showPageJump={false}
                previousText={t('paginationPrevious')}
                nextText={t('paginationNext')}
                rowsText={t('paginationRows')}
                pageText={t('paginationPage')}
                ofText={t('paginationOf')}
                noDataText={t('noRowsFound')}
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
  </div>
);

export default translate('TableStats')(TableStats);
