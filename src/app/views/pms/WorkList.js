import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {metaData, reqListStatus, workList, workListAsync} from '../../store/workSlice';
import {activeVesselSubMenu} from '../../store/navbarMenuSlice';
import {Box, Col, Content, Row} from 'adminlte-2-react';
import DataTable from '../../components/DataTable';
import {usePrevious} from '../../utils/Hooks';

function WorkList({name}) {
  const dispatch = useDispatch();

  const activeVessel = useSelector(activeVesselSubMenu);
  const meta = useSelector(metaData);
  const list = useSelector(workList);
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
    dispatch(workListAsync(params));
  };

  const header = [
    {
      title: 'Code',
      data: 'code',
    },
    {
      title: 'Sub Category',
      data: 'sub-category',
      render: subCategory => subCategory.name,
    },
    {
      title: 'Description',
      data: 'description',
      render: description => description.name,
    },
    {
      title: 'Intervals',
      data: 'interval',
      render: interval => `${interval.value} ${interval.unit.name}`,
    },
    {
      title: 'Date Installed',
      data: 'installed_date',
    },
    {
      title: 'Last Done',
      data: 'current_work',
      render: currentWork => currentWork.last_done,
    },
    {
      title: 'Due Date',
      data: 'due_date',
    },
    {
      title: 'Status',
      data: 'status',
    },
    {
      title: 'Instructions',
      data: 'current_work',
      render: currentWork => currentWork.instructions,
    },
    {
      title: 'Remarks',
      data: 'current_work',
      render: currentWork => currentWork.remarks,
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

export default WorkList;
