/**
 * @fileoverview Component responsible for rendering the student list.
 * The students data should be fetched by a saga and mapped as props through the Redux store.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchStudentsAction } from '../actions';

class StudentList extends Component {
  state = {
    selectedIds: {}
  };

  componentDidMount() {
    if (!this.props.students) {
      this.props.fetchStudentsAction();
    }
  }

  toggleStudentSelected = studentId => {
    const { selectedIds } = this.state;
    this.setState({
      selectedIds: {
        ...selectedIds,
        [studentId]: !selectedIds[studentId]
      }
    });
  };

  renderEditButton = () => {
    const selectedIds = Object.entries(this.state.selectedIds).filter(([, selected]) => selected);
    if (selectedIds.length !== 1) {
      return null;
    }
    const studentId = selectedIds[0][0]; // first entry, gets its entry key
    return <Link to={`/${studentId}`}>Edit</Link>
  };

  render() {
    return (
      <section>
        <ul>
          {this.props.students && this.props.students.map(({ firstName, lastName }) => {
            const studentId = `${lastName}_${firstName}`;
            return (
              <li key={studentId}>
                <input type='checkbox' checked={this.state.selectedIds[studentId]} onClick={() => this.toggleStudentSelected(studentId)} />
                {lastName}, {firstName}
              </li>
            );
          })}
        </ul>
        <Link to='/new'>Add</Link>
        {this.renderEditButton()}
      </section>
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
    { fetchStudentsAction },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);