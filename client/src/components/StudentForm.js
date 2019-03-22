/**
 * @fileoverview Component responsible for rendering the student form.
 * The student data should be validated, and if valid and submitted, it should be persisted.
 * If the creation was finished successfully, the user will be redirected to the students list.
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'informed';
import StudentFormField from './StudentFormField';
import { createStudentAction, fetchStudentAction, resetFormAction, updateStudentAction } from '../actions';
import { withRouter } from 'react-router-dom';
import { Button, Col, Icon, Row } from 'react-materialize';
import styles from './StudentForm.module.scss';

const formValidation = {
  firstName: firstName => !firstName || firstName.length < 4 ? 'First name should contain at least 4 characters' : undefined,
  lastName: lastName => !lastName || lastName.length < 4 ? 'Last name should contain at least 4 characters' : undefined,
  birthDate: birthDate => {
    if (!birthDate) {
      return 'Birth date is required.';
    }
    try {
      const date = new Date(birthDate);
      if (date > Date.now()) {
        return `Invalid date. Date "${birthDate}" is on the future.`;
      }
      return undefined;
    } catch (err) {
      return `Invalid date format "${birthDate}".`;
    }
  },
  photo: photoUrl => {
    if (!photoUrl) {
      return 'Photo is required.';
    }
    try {
      new URL(photoUrl);
    } catch (err) {
      return `Invalid photo URL "${photoUrl}".`;
    }
  }
};

const studentForm = ({ isSaving, error, history, match, selectedStudent, createStudentAction, fetchStudentAction, resetFormAction, updateStudentAction }) => {

  useEffect(() => {
    // When the component is updated and is done saving and does not contains errors,
    // it should redirect the user to the students list.
    if (isSaving === false && !error) {
      history.push('/');
      return () => resetFormAction();
    }
  }, [isSaving, error]); // Only runs this effect when isSaving or saveErrors has changed

  // Gets studentId from the route params, if matches
  const { studentId } = match.params;
  const isEdit = !!studentId;

  // If is editing a student, but there is no selectedStudent yet, we must fetch it
  if (isEdit) {
    if (error) {
      return <pre>An error occourred, please try again later</pre>;
    }
    if ((!selectedStudent || studentId !== selectedStudent.id.toString())) {
      fetchStudentAction(parseInt(studentId));
      return <pre>Loading...</pre>;
    }
  }
  return (
    <Row className={styles.container}>
      <Col className={styles.formContainer} s={12} m={8} xl={6} offset='m2 xl3'>
        <Form
          className={styles.form}
          initialValues={selectedStudent}
          onSubmit={student => isEdit
            ? updateStudentAction({ id: parseInt(studentId), ...student })
            : createStudentAction({ id: parseInt(studentId), ...student })}>
          {({ formState }) => {
            const { errors, pristine } = formState;
            const { firstName, lastName, birthDate, photo } = formValidation;
            return (
              <div>
                <h4 className={styles.header}>{studentId ? 'Edit a student' : 'Create a student'}</h4>
                <StudentFormField field="firstName" label='First name' validation={firstName} error={errors && errors.firstName} />
                <StudentFormField field="lastName" label='Last name' validation={lastName} error={errors && errors.lastName} />
                <StudentFormField field="birthDate" label='Birth date' type='date' validation={birthDate} error={errors && errors.birthDate} />
                <StudentFormField field="hobbies" label='Hobbies' type='multiple' placeholder='What are your hobbies? :)' />
                <StudentFormField field="photo" label='Photo URL' validation={photo} error={errors && errors.photo} />

                {error && <pre>{error.join('\n')}</pre>}

                <div className={styles.toolbar}>
                  {/* Cancel button */}
                  <Button className='red' waves='light' onClick={() => history.push('/')}>
                    Cancel
                  <Icon left>cancel</Icon>
                  </Button>

                  {/* Save button */}
                  <Button className='green' type="submit" disabled={pristine} waves='light'>
                    Save
                  <Icon left>check</Icon>
                  </Button>
                </div>
              </div>
            );
          }}
        </Form>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ form }) => {
  const { isSaving, error, selectedStudent } = form;
  return {
    isSaving,
    error,
    selectedStudent
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { createStudentAction, fetchStudentAction, resetFormAction, updateStudentAction },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(studentForm));