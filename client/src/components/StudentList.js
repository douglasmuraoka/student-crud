/**
 * @fileoverview Component responsible for rendering the student list.
 * The students data should be fetched by a saga and mapped as props through the Redux store.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchStudentsAction, deleteStudentAction } from '../actions';
import { Button, Col, Row } from 'react-materialize';
import Card from './Card';
import styles from './StudentList.module.scss';

class StudentList extends Component {
  componentDidMount() {
    if (!this.props.students) {
      this.props.fetchStudentsAction();
    }
  }

  renderStudentsCards = () => (
    this.props.students && this.props.students.map(({ id, firstName, lastName, photo }) => {
      return (
        <Card
          key={id}
          avatar={photo}
          avatarAlt={`${lastName}, ${firstName} avatar`}
          onEdit={() => this.props.history.push(`/student/${id}`)}
          onDelete={() => this.props.deleteStudentAction(id)}>
          {lastName}, {firstName}
        </Card>
      );
    })
  )

  render() {
    return (
      <Row className={styles.componentContainer}>
        <Col s={12} m={10} xl={8} offset='m1 xl2' className={styles.cardsContainer}>

          {/* Students cards  */}
          {this.renderStudentsCards()}

          {/* Floating toolbar */}
          <section className={styles.toolbar}>
            <Button floating large className={[styles.addStudentButton, 'green'].join(' ')} waves='light' icon='add' onClick={() => this.props.history.push('/student/new')} />
          </section>
        </Col>
      </Row>
    )
  };
};

const mapStateToProps = ({ students }) => {
  const { data, error } = students;
  return {
    students: data,
    error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { fetchStudentsAction, deleteStudentAction },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentList));