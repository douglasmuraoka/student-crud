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
import ConfirmDialog from './ConfirmDialog';
import styles from './StudentList.module.scss';

class StudentList extends Component {
  state = {
    openDialog: true,
    selectedStudentId: undefined
  }

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
          onDelete={() => this.openDeleteDialog(id)}>
          {lastName}, {firstName}
        </Card>
      );
    })
  )

  openDeleteDialog = studentId => {
    this.setState({
      openDialog: true,
      selectedStudentId: studentId
    });
  }

  onCancelDeleteStudent = () => {
    this.setState({
      openDialog: false,
      selectedStudentId: null
    });
  }

  onConfirmDeleteStudent = () => {
    this.props.deleteStudentAction(this.state.selectedStudentId);
    this.setState({
      openDialog: false,
      selectedStudentId: null
    });
  }

  render() {
    return (
      <>
        <Row className={styles.componentContainer}>
          <h1 className={styles.title}>Mesaic</h1>
          <hr className={styles.titleSeparator} />
          <h4 className={styles.subTitle}>students list</h4>

          <Col s={12} m={10} xl={8} offset='m1 xl2' className={styles.cardsContainer}>

            {/* Students cards  */}
            {this.renderStudentsCards()}

            {/* Fixed "Add" button */}
            <Button floating large className={[styles.addStudentButton, 'green'].join(' ')} waves='light' icon='add' onClick={() => this.props.history.push('/student/new')} />
          </Col>
        </Row>
        <ConfirmDialog
          open={this.state.openDialog}
          title='Delete a student'
          onCancel={this.onCancelDeleteStudent}
          confirmLabel='Delete'
          onConfirm={this.onConfirmDeleteStudent}>
          Are you sure you want to delete a student?
        </ConfirmDialog>
      </>
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