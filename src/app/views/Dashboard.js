import React from 'react';
import {Content, Row, Col, Box} from 'adminlte-2-react';

function Dashboard(props) {
  const {name} = props;
  return (
    <Content title={name} browserTitle={name}>
      <Row>
        <Col xs={4}>
          <Box title="Notification" type="info" collapsable>
            Notification
          </Box>
        </Col>
        <Col xs={4}>
          <Box title="Jobs to be Done" type="warning" collapsable>
            Jobs to be Done
          </Box>
        </Col>
        <Col xs={4}>
          <Box title="Overdue Jobs" type="danger" collapsable>
            Overdue Jobs
          </Box>
        </Col>
      </Row>
    </Content>
  );
}

export default Dashboard;
