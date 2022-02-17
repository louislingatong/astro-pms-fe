import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {metaData, reqStatus, runningHourList, runningHourListAsync} from '../../store/runningHourSlice';
import {selectedVessel} from '../../store/navbarMenuSlice';
import {Box, Col, Content, Row} from 'adminlte-2-react';
import CustomDataTable from '../../components/CustomDataTable';

function RunningHourList({name}) {
  const dispatch = useDispatch();
  const activeVessel = useSelector(selectedVessel);
  const meta = useSelector(metaData);
  const list = useSelector(runningHourList);
  const status = useSelector(reqStatus);
  const [params, setParams] = useState();

  useEffect(() => {
    if (activeVessel.id && !list) {
      setParams({vessel_id: activeVessel.id});
    }
  }, [activeVessel, list]);

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
    dispatch(runningHourListAsync(params));
  };

  const header = [
    {
      title: 'Machinery Code',
      data: 'machinery',
      render: machinery => machinery.code_name,
    },
    {
      title: 'Machinery',
      data: 'machinery',
      render: machinery => machinery.name,
    },
    {
      title: 'Running Hours',
      data: 'current_running_hour',
      render: currentRunningHour => currentRunningHour.running_hours,
    },
    {
      title: 'Updating Date',
      data: 'current_running_hour',
      render: currentRunningHour => currentRunningHour.updating_date,
    },
    {
      title: 'Encoded Date',
      data: 'current_running_hour',
      render: currentRunningHour => currentRunningHour.created_at,
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

export default RunningHourList;
