import React from 'react';
import 'react-table/react-table.css';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import { translate } from 'react-translate';
import { makeNumberThousandSeparator } from '../Utils/Numbers';

import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactTable from 'react-table';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import NumberFormat from 'react-number-format';
import { TableChart, UnfoldMore, Info } from '@material-ui/icons';
import SpinnerLoad from '../Load/SpinnerLoad';
import './TableStats.css';

const ReactTableFixedColumns = withFixedColumns(ReactTable);

const TableStats = ({ data, loadingAllCases, filterByCountry, inputSearchCountry, tCountry, t }) => (
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
                          {t('countries')} <UnfoldMore style={{ fontSize: '18px' }} />
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
                          {t('total')} <UnfoldMore style={{ fontSize: '18px' }} />
                        </span>
                      ),
                      accessor: 'cases',
                      Cell: row => <span>{makeNumberThousandSeparator(row.original.cases, tCountry)}</span>,
                      className: 'confirmed-table-column',
                      headerClassName: 'confirmed-table-header'
                    },
                    {
                      Header: (
                        <span>
                          {t('last24h')} <UnfoldMore style={{ fontSize: '18px' }} />
                        </span>
                      ),
                      accessor: 'new_cases',
                      Cell: row => <span>+{makeNumberThousandSeparator(row.original.new_cases, tCountry)}</span>,
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
                          {t('total')} <UnfoldMore style={{ fontSize: '18px' }} />
                        </span>
                      ),
                      accessor: 'active_cases',
                      Cell: row => <span>{makeNumberThousandSeparator(row.original.active_cases, tCountry)}</span>,
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
                          {t('total')} <UnfoldMore style={{ fontSize: '18px' }} />
                        </span>
                      ),
                      accessor: 'deaths',
                      Cell: row => <span>{makeNumberThousandSeparator(row.original.deaths, tCountry)}</span>,
                      className: 'deaths-table-column',
                      headerClassName: 'deaths-table-header'
                    },
                    {
                      Header: (
                        <span>
                          {t('last24h')} <UnfoldMore style={{ fontSize: '18px' }} />
                        </span>
                      ),
                      accessor: 'new_deaths',
                      Cell: row => <span>+{makeNumberThousandSeparator(row.original.new_deaths, tCountry)}</span>,
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
                          {t('total')} <UnfoldMore style={{ fontSize: '18px' }} />
                        </span>
                      ),
                      accessor: 'total_recovered',
                      Cell: row => <span>{makeNumberThousandSeparator(row.original.total_recovered, tCountry)}</span>,
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
                  Header: (
                    <span>
                      <OverlayTrigger
                        key='left'
                        placement='left'
                        overlay={<Tooltip id='tooltipid'>{t('infoCritical')}</Tooltip>}
                      >
                        <span>
                          {t('critical')} <Info style={{ fontSize: '16px' }} />
                        </span>
                      </OverlayTrigger>
                    </span>
                  ),
                  headerClassName: 'critical-table-header',
                  columns: [
                    {
                      Header: (
                        <span>
                          {t('total')} <UnfoldMore style={{ fontSize: '18px' }} />
                        </span>
                      ),
                      accessor: 'serious_critical',
                      Cell: row => <span>{makeNumberThousandSeparator(row.original.serious_critical, tCountry)}</span>,
                      className: 'critical-table-column',
                      headerClassName: 'critical-table-header'
                    }
                  ]
                }
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
