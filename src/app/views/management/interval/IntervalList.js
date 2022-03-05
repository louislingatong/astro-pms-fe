import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {usePrevious} from '../../../utils/Hooks';
import {Box, Button, Content} from 'adminlte-2-react';
import {Col, Row} from 'react-bootstrap';
import {
  intervalList,
  intervalData,
  metaData,
  reqListStatus,
  intervalListAsync,
} from '../../../store/intervalSlice';
import {DataTable, Divider, Modal} from '../../../components';
import Interval from '../../../core/models/Interval';
import IntervalDetail from './IntervalDetail';

function IntervalList({name}) {
  const dispatch = useDispatch();

  const intervals = useSelector(intervalList);
  const interval = useSelector(intervalData);
  const meta = useSelector(metaData);
  const status = useSelector(reqListStatus);

  const isLoading = status === 'loading';

  const [localInterval, setLocalInterval] = useState(new Interval());
  const [localIntervals, setLocalIntervals] = useState(intervals);
  const [intervalModalShow, setIntervalModalShow] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [params, setParams] = useState({});

  const prevLocalInterval = usePrevious(localInterval);
  const prevParams = usePrevious(params);

  useEffect(() => {
    initList();
  }, []);

  useEffect(() => {
    if (localIntervals) {
      setLocalIntervals(intervals);
    }
  }, [intervals]);

  useEffect(() => {
    if (prevLocalInterval) {
      setLocalInterval(interval);
      handleModalClose();
      initList();
    }
  }, [interval]);

  useEffect(() => {
    if (prevLocalInterval
      && (prevLocalInterval.id !== localInterval.id)
      && !!localInterval.id) {
      handleModalOpen();
    }
  }, [localInterval]);

  useEffect(() => {
    if (prevParams) {
      initList();
    }
  }, [params]);

  const initList = () => {
    dispatch(intervalListAsync(params));
  };

  const handleRowSelect = (selectedRow) => {
    let newSelectedRowIds = selectedRowIds.slice();
    if (selectedRow.action === 'checked') {
      newSelectedRowIds.push(selectedRow.id);
    } else if (selectedRow.action === 'unchecked') {
      const i = newSelectedRowIds.indexOf(selectedRow);
      newSelectedRowIds.splice(i, 1)
    } else if (selectedRow.action === 'checked_all') {
      newSelectedRowIds = selectedRow.ids;
    } else if (selectedRow.action === 'unchecked_all') {
      newSelectedRowIds = [];
    } else {
      newSelectedRowIds = [selectedRow.id];
      setLocalInterval(selectedRow);
    }
    setSelectedRowIds(newSelectedRowIds);
  }

  const handlePageChange = (page) => {
    setParams({...params, page});
  };

  const handlePageLengthChange = (limit) => {
    setParams({...params, page: 1, limit});
  };

  const handleSearchChange = (keyword) => {
    const intervalId = params.interval_id;
    if (keyword) {
      !!intervalId ? setParams({interval_id: intervalId, keyword}) : setParams({keyword});
    } else {
      !!intervalId ? setParams({interval_id: intervalId}) : setParams({});
    }
  };

  const handleModalOpen = () => {
    setIntervalModalShow(true);
  };

  const handleModalClose = () => {
    setSelectedRowIds([]);
    setLocalInterval(new Interval());
    setIntervalModalShow(false);
  };

  const header = [
    {
      title: 'Interval',
      data: 'unit',
      render: (unit, row) => `${row.value} ${unit.name}`,
    },
  ];

  return (
    <React.Fragment>
      <Content title={name} browserTitle={name}>
        <Row>
          <Col xs={12}>
            <Button
              type="primary"
              text="Add New Interval"
              onClick={handleModalOpen}
              pullRight
            />
          </Col>
          <Divider/>
          <Col xs={12}>
            <Box>
              <Row>
                <Col xs={12}>
                  <DataTable
                    api
                    data={localIntervals}
                    columns={header}
                    selectedRowIds={selectedRowIds}
                    options={{
                      page: true,
                      pageInfo: true,
                      pageLength: true,
                      search: true,
                    }}
                    hover
                    striped
                    fixed
                    responsive
                    meta={meta}
                    multiple
                    rowSelect
                    onSelect={handleRowSelect}
                    onPageChange={handlePageChange}
                    onSearchChange={handleSearchChange}
                    onPageLengthChange={handlePageLengthChange}
                    isLoading={isLoading}
                  />
                </Col>
                <Divider/>
                <Col xs={12}>
                  {
                    !!selectedRowIds.length
                      && <Button type="danger" text={`Delete (${selectedRowIds.length})`} pullRight/>
                  }
                </Col>
              </Row>
            </Box>
          </Col>
        </Row>
        <Modal
          show={intervalModalShow}
          title={localInterval.id ? 'Interval Details' : 'Add New Interval'}
          modalSize="sm"
          closeButton
          onHide={handleModalClose}
        >
          <IntervalDetail data={localInterval}/>
        </Modal>
      </Content>
    </React.Fragment>
  )
}

export default IntervalList;
