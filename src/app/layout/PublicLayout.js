import React from 'react';
import {Col, Box, Row, Inputs} from 'adminlte-2-react';
import logo from '../../assets/images/logo.png';
import {Link} from 'react-router-dom';

function PublicLayout({children}) {
  return (
    <Row>
      <Col xs={4}>
        <img height={100} src={logo} alt="Responsive image"/>
        <Row>
          {children}
        </Row>
      </Col>
    </Row>
  );
}

export default PublicLayout;
