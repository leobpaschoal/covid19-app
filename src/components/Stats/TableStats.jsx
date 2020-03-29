import React from 'react';
import 'react-table/react-table.css';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import Card from 'react-bootstrap/Card';
import ReactTable from 'react-table';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import { tableColumns } from '../Utils/Utils';
import SpinnerLoad from '../Load/SpinnerLoad';
import './TableStats.css';

const ReactTableFixedColumns = withFixedColumns(ReactTable);

const TableStats = ({ data, loadingAllCases }) => (
  <Card className='table-card-adjust'>
    <Card.Header>
      <h5>Countries Statistics</h5>
    </Card.Header>
    <Card.Body className='table-card-body-adjust'>
      <div>
        <SpinnerLoad
          element={
            <ReactTableFixedColumns
              showPaginationTop
              showPaginationBottom={false}
              data={data}
              columns={tableColumns}
              defaultPageSize={20}
              className='table'
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

export default TableStats;
