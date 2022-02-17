import React, {useState} from 'react';
import {Col, Row, SimpleTable} from 'adminlte-2-react';
import PropTypes from 'prop-types';
import Meta from '../core/models/Meta';
import {Button, Inputs} from 'adminlte-2-react';
import CustomPagination from './CustomPagination';

CustomDataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  paging: PropTypes.bool,
  info: PropTypes.bool,
  meta: PropTypes.instanceOf(Meta),
  params: PropTypes.object,
  status: PropTypes.string,
  onSelect: PropTypes.func,
  onPageChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  onPageLengthChange: PropTypes.func,
};

function CustomDataTable(props) {
  const {Text, Select} = Inputs;

  const {meta = {}, option = {}, status, params = {}, onPageLengthChange, onSearchChange} = props;
  const {total: totalElements, current_page: activePage, per_page: pageSize} = meta;
  const {page, pageInfo, search, pageLength} = option;

  const [searchString, setSearchString] = useState();

  const renderInfo = () => {
    let info = 'Showing _START_ to _END_ of _TOTAL_ entries'
    return info.replace('_START_', (1 + pageSize * (activePage - 1)).toString())
      .replace('_END_', Math.min(pageSize * (activePage - 1) + pageSize, totalElements).toString())
      .replace('_TOTAL_', totalElements);
  };

  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
  };

  const handlePageLengthChange = (e) => {
    onPageLengthChange(e.target.value);
  }

  const handleSearch = () => {
    onSearchChange(searchString);
  }

  return (
    <React.Fragment>
      <Row>
        {
          pageLength && (
            <Col sm={6}>
              <div className="comp-custom-datatable-page-length">
                <span style={{margin: '6px 5px 0 0'}}>Show</span>
                <Select
                  name="page_length"
                  id="pageLengthSelect"
                  labelPosition="none"
                  options={[
                    { text: '20', value: 20 },
                    { text: '50', value: 50 },
                    { text: '100', value: 100 },
                  ]}
                  value={params.limit || 20}
                  onChange={handlePageLengthChange}
                  width={70}
                />
                <span style={{margin: '6px 0 0 5px'}}>Entries</span>
              </div>
            </Col>
          )
        }
        {
          search && (
            <Col sm={6}>
              <div className="pull-right">
                <Text
                  name="search"
                  id="searchInput"
                  labelPosition="none"
                  buttonRight={<Button flat icon="fa-search" onClick={handleSearch} />}
                  defaultValue={params.keyword || searchString}
                  onChange={handleSearchChange}
                  width={250}
                />
              </div>
            </Col>
          )
        }
      </Row>
      <Row>
        <Col sm={12}>
          <SimpleTable {...props}/>
        </Col>
      </Row>
      <Row>
        {
          pageInfo && (
            <Col sm={5}>
              <div>
                {renderInfo()}
              </div>
            </Col>
          )
        }
        {
          page && (
            <Col sm={7}>
              <div className="pull-right">
                <CustomPagination
                  {...props}
                />
              </div>
            </Col>
          )
        }
      </Row>
    </React.Fragment>
  )
}

export default CustomDataTable;
