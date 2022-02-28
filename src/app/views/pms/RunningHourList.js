import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {metaData, reqListStatus, runningHourList, runningHourListAsync} from '../../store/runningHourSlice';
import {activeVesselSubMenu} from '../../store/navbarMenuSlice';
import {Box, Col, Content, Row} from 'adminlte-2-react';
import DataTable from '../../components/DataTable';
import {usePrevious} from '../../utils/Hooks';

function RunningHourList({name}) {
  const dispatch = useDispatch();

  const activeVessel = useSelector(activeVesselSubMenu);
  const meta = useSelector(metaData);
  const list = useSelector(runningHourList);
  const status = useSelector(reqListStatus);

  const [params, setParams] = useState();

  const prevList = usePrevious(list);

  useEffect(() => {
    if (activeVessel.id && !(list.length == prevList)) {
      setParams({vessel_id: activeVessel.id});
    }
  }, [activeVessel, list]);

  useEffect(() => {
    if (params) {
      initList();
    }
  }, [params]);

  const handlePageChange = (page) => {
    setParams((prevState) => ({...prevState, page}));
  };

  const handlePageLengthChange = (limit) => {
    setParams((prevState) => ({...prevState, page: 1, limit}));
  };

  const handleSearchChange = (keyword) => {
    keyword
      ? setParams({vessel_id: activeVessel.id, keyword})
      : setParams({vessel_id: activeVessel.id});
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
                striped
                border
                meta={meta}
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
