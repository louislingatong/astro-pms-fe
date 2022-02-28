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
  const listStatus = useSelector(reqListStatus);

  const [localIntervals, setLocalIntervals] = useState(intervals);
  const [localInterval, setLocalInterval] = useState(new Interval());
  const [params, setParams] = useState({});
  const [intervalModalShow, setIntervalModalShow] = useState(false);
  const [selectedIntervalIds, setSelectedIntervalIds] = useState([]);

  const prevLocalInterval = usePrevious(localInterval);
  const prevParams = usePrevious(params);

  const isLoading = listStatus === 'loading';

  useEffect(() => {
    if (localIntervals && !localIntervals.length) {
      initList();
    }
  }, [localIntervals]);

  useEffect(() => {
    if (localIntervals) {
      setLocalIntervals(intervals);
    }
  }, [localIntervals, intervals]);

  useEffect(() => {
    if (prevLocalInterval) {
      handleModalClose();
      initList();
    }
  }, [interval]);

  useEffect(() => {
    if (prevLocalInterval && prevLocalInterval.id !== localInterval.id && !!localInterval.id) {
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

  const handleRowSelect = (row) => {
    if (Array.isArray(row)) {
      setSelectedIntervalIds(row);
    } else {
      setLocalInterval(row);
    }
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
                  {!!selectedIntervalIds.length
                  && <Button type="danger" text={`Delete (${selectedIntervalIds.length})`} pullRight/>}
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