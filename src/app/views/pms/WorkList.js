import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {metaData, reqStatus, workList, workListAsync} from '../../store/workSlice';
import {selectedVessel} from '../../store/navbarMenuSlice';
import {Box, Col, Content, Row} from 'adminlte-2-react';
import CustomDataTable from '../../components/CustomDataTable';

function WorkList({name}) {
  const dispatch = useDispatch();
  const activeVessel = useSelector(selectedVessel);
  const meta = useSelector(metaData);
  const list = useSelector(workList);
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

export default WorkList;
