import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {metaData, reqListStatus, vesselList, vesselListAsync} from '../../store/vesselSlice';
import {Box, Col, Content, Row} from 'adminlte-2-react';
import DataTable from '../../components/DataTable';

function VesselList({name}) {
  const dispatch = useDispatch();

  const meta = useSelector(metaData);
  const list = useSelector(vesselList);
  const status = useSelector(reqListStatus);

  const [params, setParams] = useState();

  useEffect(() => {
    if (!params) {
      setParams({});
    }
  }, [list]);

  useEffect(() => {
    if (params) {
      initList();
    }
  }, [params]);

  const handleRowSelect = (row) => {
    console.log(row);
  }

  const handlePageChange = (page) => {
    setParams((prevState) => ({...prevState, page}));
  };

  const handlePageLengthChange = (limit) => {
    setParams((prevState) => ({...prevState, page: 1, limit}));
  };

  const handleSearchChange = (keyword) => {
    keyword ? setParams({keyword}) : setParams({});
  };

  const initList = () => {
    dispatch(vesselListAsync(params));
  };

  const header = [
    {
      title: 'Owner',
      data: 'owner',
      render: owner => owner.name,
    },
    {
      title: 'Name',
      data: 'name',
    },
  ];

  return (
    <React.Fragment>
      <Content title={name} browserTitle={name}>
        <Row>
          <Col xs={12}>
            <Box>
              <DataTable
                api
                data={list}
                columns={header}
                options={{
                  page: true,
                  pageInfo: true,
                  pageLength: true,
                  search: true,
                }}
                hover
                striped
                border
                meta={meta}
                onSelect={handleRowSelect}
                onPageChange={handlePageChange}
                onSearchChange={handleSearchChange}
                onPageLengthChange={handlePageLengthChange}
              />
            </Box>
          </Col>
        </Row>
      </Content>
    </React.Fragment>
  )
}

export default VesselList;
