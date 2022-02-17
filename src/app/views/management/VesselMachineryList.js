import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {metaData, reqStatus, vesselMachineryList, vesselMachineryListAsync} from '../../store/vesselMachinerySlice';
import {Box, Col, Content, Row} from "adminlte-2-react";
import CustomDataTable from "../../components/CustomDataTable";

function VesselMachineryList({name}) {
  const dispatch = useDispatch();
  const meta = useSelector(metaData);
  const list = useSelector(vesselMachineryList);
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
    dispatch(vesselMachineryListAsync(params));
  };

  const header = [
    {
      title: 'Department',
      data: 'machinery',
      render: machinery => machinery.department.name,
    },
    {
      title: 'Machinery',
      data: 'machinery',
      render: machinery => machinery.name,
    },
    {
      title: 'Model',
      data: 'machinery',
      render: machinery => machinery.model.name,
    },
    {
      title: 'Maker',
      data: 'machinery',
      render: machinery => machinery.maker.name,
    },
    {
      title: 'In-charge',
      data: 'incharge_rank',
      render: incharge_rank => incharge_rank.name,
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

export default VesselMachineryList;
