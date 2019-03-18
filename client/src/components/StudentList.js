/**
 * @fileoverview Component responsible for rendering the student list.
 * The students data should be fetched by a saga and mapped as props through the Redux store.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class StudentList extends Component {
  render() {
    return (
      <ul>
        {this.props.students && this.props.students.map(({ firstName, lastName }) => {
          return <li key={`${lastName}/${firstName}`}>{lastName}, {firstName}</li>
        })}
      </ul>
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

export default connect(mapStateToProps)(StudentList);