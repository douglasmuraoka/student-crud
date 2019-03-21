/**
 * @fileoverview Component responsible for rendering the student list.
 * The students data should be fetched by a saga and mapped as props through the Redux store.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchStudentsAction, deleteStudentAction } from '../actions';

class StudentList extends Component {
  state = {
    selectedIds: {}
  };

  componentDidMount() {
    if (!this.props.students) {
      this.props.fetchStudentsAction();
    }
  }

  toggleStudentSelected = id => {
    const { selectedIds } = this.state;
    this.setState({
      selectedIds: {
        ...selectedIds,
        [id]: !selectedIds[id]
      }
    });
  };

  renderEditAndDeleteButtons = () => {
    const selectedIds = Object.entries(this.state.selectedIds).filter(([, selected]) => selected);
    if (selectedIds.length !== 1) {
      return null;
    }
    const id = parseInt(selectedIds[0][0]); // first entry, gets its entry key
    return (
      <>
        <Link to={`/student/${id}`}>Edit</Link>
        <button onClick={() => this.props.deleteStudentAction(id)}>Delete</button>
      </>
    );
  };

  render() {
    return (
      <section>
        <ul>
          {this.props.students && this.props.students.map(({ id, firstName, lastName }) => {
            return (
              <li key={id}>
                <input type='checkbox' checked={this.state.selectedIds[id]} onClick={() => this.toggleStudentSelected(id)} />
                {lastName}, {firstName}
              </li>
            );
          })}
        </ul>
        <Link to='/student/new'>Add</Link>
        {this.renderEditAndDeleteButtons()}
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
    { fetchStudentsAction, deleteStudentAction },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);