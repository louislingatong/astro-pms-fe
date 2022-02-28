import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {usePrevious} from '../../../utils/Hooks';
import {Col, Row} from 'react-bootstrap';
import {Box, Button, Content} from 'adminlte-2-react';
import DataTable from '../../../components/DataTable';
import Modal from '../../../components/Modal';
import Divider from '../../../components/Divider';
import {
  machineryList,
  machineryData,
  metaData,
  reqListStatus,
  machineryListAsync,
} from '../../../store/machinerySlice';
import MachineryDetail from './MachineryDetail';
import Machinery from '../../../core/models/Machinery';
import VesselDepartmentSelect from "../../../components/select/VesselDepartmentSelect";

function MachineryList({name}) {
  const dispatch = useDispatch();

  const machineries = useSelector(machineryList);
  const machinery = useSelector(machineryData);
  const meta = useSelector(metaData);
  const status = useSelector(reqListStatus);

  const [localMachineries, setLocalMachineries] = useState(machineries);
  const [localMachinery, setLocalMachinery] = useState(machinery);
  const [params, setParams] = useState({});
  const [machineryModalShow, setMachineryModalShow] = useState(false);
  const [selectedMachineryIds, setSelectedMachineryIds] = useState([]);

  const prevLocalMachinery = usePrevious(localMachinery);
  const prevParams = usePrevious(params);

  const isLoading = status === 'loading';

  useEffect(() => {
    if (localMachineries && !localMachineries.length) {
      initList();
    }
  }, [localMachineries]);

  useEffect(() => {
    if (localMachineries) {
      setLocalMachineries(machineries);
    }
  }, [localMachineries, machineries]);

  useEffect(() => {
    if (prevLocalMachinery) {
      setLocalMachinery(machinery);
      initList();
    }
  }, [machinery]);

  useEffect(() => {
    if (prevLocalMachinery
      && prevLocalMachinery.id !== localMachinery.id
      && !!localMachinery.id) {
      handleModalOpen();
    }
  }, [localMachinery]);

  useEffect(() => {
    if (prevParams) {
      initList();
    }
  }, [params]);

  const initList = () => {
    dispatch(machineryListAsync(params));
  };

  const handleRowSelect = (row) => {
    if (Array.isArray(row)) {
      setSelectedMachineryIds(row);
    } else {
      setLocalMachinery(row)
    }
  };

  const handlePageChange = (page) => {
    setParams({...params, page});
  };

  const handlePageLengthChange = (limit) => {
    setParams({...params, page: 1, limit});
  };

  const handleSearchChange = (keyword) => {
    const {department} = params;
    if (keyword) {
      !!department ? setParams({department, keyword}) : setParams({keyword});
    } else {
      !!department ? setParams({department}) : setParams({});
    }
  };

  const handleSelectDepartmentChange = (e) => {
    const department = e.target.value;
    !!department ? setParams({department}) : setParams({});
  };

  const handleModalOpen = () => {
    setMachineryModalShow(true);
  };

  const handleModalClose = () => {
    setLocalMachinery(new Machinery());
    setMachineryModalShow(false);
  };

  const header = [
    {
      title: 'Department',
      data: 'department',
      render: department => department.name,
      width: 20,
    },
    {
      title: 'Name',
      data: 'name',
      width: 50,
    },
    {
      title: 'Code',
      data: 'code_name',
    },
  ];

  return (
    <React.Fragment>
      <Content title={name} browserTitle={name}>
        <Row>
          <Col xs={12}>
            <Button
              type="primary"
              text="Add New Machinery"
              onClick={handleModalOpen}
              pullRight
            />
          </Col>
          <Divider/>
          <Col xs={12}>
            <Box>
              <Row>
                <Col xs={12} sm={4} md={3} lg={2}>
                  <VesselDepartmentSelect
                    name="vesselDepartment"
                    id="vesselDepartment"
                    placeholder="Department"
                    allowClear={true}
                    onChange={handleSelectDepartmentChange}
                  />
                </Col>
                <Col xs={12}>
                  <Divider type="line"/>
                </Col>
                <Col xs={12}>
                  <DataTable
                    api
                    data={localMachineries}
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
                  {
                    !!selectedMachineryIds.length
                    && <Button type="danger" text={`Delete (${selectedMachineryIds.length})`} pullRight/>
                  }
                </Col>
              </Row>
            </Box>
          </Col>
        </Row>
        <Modal
          show={machineryModalShow}
          title={localMachinery.id ? 'Machinery Details' : 'Add New Machinery'}
          modalSize="lg"
          closeButton
          onHide={handleModalClose}
        >
          <MachineryDetail data={localMachinery}/>
        </Modal>
      </Content>
    </React.Fragment>
  )
}

export default MachineryList;
