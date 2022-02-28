import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Col, Content, Row} from 'adminlte-2-react';
import {metaData, reqListStatus, userList, userListAsync} from '../../store/userSlice';
import DataTable from '../../components/DataTable';

function UserList({name}) {
  const dispatch = useDispatch();

  const meta = useSelector(metaData);
  const list = useSelector(userList);
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
    dispatch(userListAsync(params));
  };

  const header = [
    {
      title: 'Name',
      data: 'full_name',
    },
    {
      title: 'Status',
      data: 'status',
      render: status => status.name,
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

export default UserList;
