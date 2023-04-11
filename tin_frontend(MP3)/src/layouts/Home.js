import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GroupList from "../components/lists/GroupList";
import StudentList from "../components/lists/StudentList";
import TeacherGroupList from "../components/lists/TeacherGroupList";
import TeacherList from "../components/lists/TeacherList";
import UserList from "../components/lists/UserList";

function Home() {
  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <h5 className="text-primary text-center mt-2">User</h5>
          <UserList />
        </Col>
        <Col lg={12} md={12} sm={12}>
          <h5 className="text-success text-center mt-2">Student</h5>
          <StudentList />
        </Col>
        <Col lg={12} md={12} sm={12}>
          <h5 className="text-danger text-center mt-2">Teacher</h5>
          <TeacherList />
        </Col>
        <Col lg={12} md={12} sm={12}>
          <h5 className="text-warning text-center mt-2">TeacherGroup</h5>
          <TeacherGroupList />
        </Col>
        <Col lg={12} md={12} sm={12}>
          <h5 className="text-info text-center mt-2">Group</h5>
          <GroupList />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
