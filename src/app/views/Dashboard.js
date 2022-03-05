import React from 'react';
import { useHistory } from 'react-router-dom';
import {Content, Infobox2} from 'adminlte-2-react';
import {Col, Row} from 'react-bootstrap';

function Dashboard(props) {
  const history = useHistory();
  const {name} = props;

  const redirect = (status) => {
    history.push('/works', {status});
  }

  return (
    <Content title={name} browserTitle={name}>
      <Row>
        <Col xs={4}>
          <Infobox2 icon="fas-cog" title="150" text="Works to be done" color="yellow" footerText="More Info"
                    to="javascript:" onFooterClick={() => redirect('WARNING')}/>
        </Col>
        <Col xs={4}>
          <Infobox2 icon="fas-wrench" title="150" text="Overdue Works" color="red" footerText="More Info"
                    to="javascript:" onFooterClick={() => redirect('OVERDUE')}/>
        </Col>
      </Row>
    </Content>
  );
}

export default Dashboard;
