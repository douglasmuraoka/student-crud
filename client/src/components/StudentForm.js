/**
 * @fileoverview Component responsible for rendering the student form.
 * The student data should be validated, and if valid and submitted, it should be persisted.
 * If the creation was finished successfully, the user will be redirected to the students list.
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form } from 'informed';
import StudentFormField from './StudentFormField';
import { createStudentAction, resetFormAction } from '../actions';
import { withRouter } from 'react-router-dom';

const formValidation = {
  firstName: firstName => !firstName || firstName.length < 5 ? 'First name should contain at least 5 characters' : undefined,
  lastName: lastName => !lastName || lastName.length < 5 ? 'Last name should contain at least 5 characters' : undefined,
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

const studentForm = ({ isSaving, saveErrors, dispatch, history }) => {

  useEffect(() => {
    // When the component is updated and is done saving and does not contains errors,
    // it should redirect the user to the students list.
    if (isSaving === false && !saveErrors) {
      history.push('/');
      return () => dispatch(resetFormAction());
    }
  }, [isSaving, saveErrors]); // Only runs this effect when isSaving or saveErrors has changed

  const { firstName, lastName, birthDate, photo } = formValidation;
  return (
    <Form onSubmit={student => dispatch(createStudentAction(student))}>
      {({ formState }) => {
        const { errors, pristine } = formState;
        return (
          <div>
            <StudentFormField field="firstName" label='First name' validation={firstName} error={errors && errors.firstName} />
            <StudentFormField field="lastName" label='Last name' validation={lastName} error={errors && errors.lastName} />
            <StudentFormField field="birthDate" label='Birth date' type='date' validation={birthDate} error={errors && errors.birthDate} />
            <StudentFormField field="hobbies" label='Hobbies' type='multiple' placeholder='What are your hobbies? :)' />
            <StudentFormField field="photo" label='Photo URL' validation={photo} error={errors && errors.photo} />

            {saveErrors && <pre>{saveErrors.join('\n')}</pre>}

            <button type="submit" disabled={pristine}>
              Submit
            </button>
          </div>
        );
      }}
    </Form>
  );
};

const mapStateToProps = ({ form }) => {
  const { isSaving, error } = form;
  return {
    isSaving,
    saveErrors: error
  };
};

export default withRouter(connect(mapStateToProps)(studentForm));