import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Col, Row} from 'react-bootstrap';
import {Button} from 'adminlte-2-react';
import DataTable from '../../../components/DataTable';
import Divider from '../../../components/Divider';
import MachineryForm from '../form/MachineryForm';
import SubCategoryForm from '../form/SubCategoryForm';
import {reqDataStatus} from '../../../store/machinerySlice';

function MachineryDetail({data: localMachinery}) {
  const status = useSelector(reqDataStatus);

  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([]);
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);

  const handleRowSelect = (rows) => {
    setSelectedSubCategoryIds(rows)
  };

  const hasId = !!localMachinery.id;
  const isLoading = status === 'loading';

  const header = [
    {
      title: 'Name',
      data: 'name',
    }
  ];

  return (
    <React.Fragment>
      <MachineryForm data={localMachinery}/>
      {
        hasId && (
          <React.Fragment>
            <Row>
              <Divider type="line"/>
            </Row>
            <Row className="display-flex">
              <Col xs={6} className="display-flex align-items-center">
                <h4>Sub Categories</h4>
              </Col>
              <Col xs={6} className="display-flex align-items-center justify-content-end">
                {
                  !showSubCategoryForm && (
                    <Button type="primary"
                            text="Add Sub Category"
                            onClick={() => setShowSubCategoryForm(!showSubCategoryForm)}/>
                  )
                }
              </Col>
            </Row>
            <Row>
              <Divider type="line"/>
            </Row>
            {showSubCategoryForm && <SubCategoryForm machineryId={localMachinery.id}/>}
            <Divider/>
            <Row>
              <Col xs={12}>
                <DataTable
                  data={localMachinery.sub_categories}
                  columns={header}
                  options={{
                    page: true,
                    pageInfo: true,
                    pageLength: true,
                    search: true,
                  }}
                  striped
                  hover
                  responsive
                  fixed
                  multiple
                  onSelect={handleRowSelect}
                  isLoading={isLoading}
                />
              </Col>
            </Row>
            <Divider/>
            <Row>
              <Col xs={12}>
                {
                  !!selectedSubCategoryIds.length
                  && <Button type="danger" text={`Delete (${selectedSubCategoryIds.length})`} pullRight/>
                }
              </Col>
            </Row>
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
}

export default MachineryDetail;
