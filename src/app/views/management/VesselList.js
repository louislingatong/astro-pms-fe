import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {metaData, reqStatus, vesselList, vesselListAsync} from '../../store/vesselSlice';
import {Box, Col, Content, Row} from 'adminlte-2-react';
import CustomDataTable from '../../components/CustomDataTable';

function VesselList({name}) {
  const dispatch = useDispatch();
  const meta = useSelector(metaData);
  const list = useSelector(vesselList);
  const status = useSelector(reqStatus);
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
    setParams((prevState) => ({...prevState, page}))
  };

  const handlePageLengthChange = (limit) => {
    setParams((prevState) => ({...prevState, limit}))
  };

  const handleSearchChange = (keyword) => {
    setParams((prevState) => ({...prevState, keyword}))
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
              <CustomDataTable
                data={list?.length ? list : null}
                columns={header}
                option={{
                  page: true,
                  pageInfo: true,
                  pageLength: true,
                  search: true,
                }}
                hover
                striped
                border
                meta={meta}
                params={params}
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
