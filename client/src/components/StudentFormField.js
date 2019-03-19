/**
 * @fileoverview Component responsible for rendering any form field.
 * The field should contain a label, the input field, and the error message
 * content (if any).
 * This component and all its dependencies must be compatible with the informed Form.
 */

import React from 'react';
import { Text } from 'informed';
import DateInput from './DateInput';
import MultipleInput from './MultipleInput';

export default ({ field, label, validation, error, type = 'text', placeholder }) => {
  // Renders a different input component accordingly with its type
  let inputComponent;
  switch (type) {
    case 'date':
      inputComponent = <DateInput field={field} validate={validation} />;
      break;
    case 'multiple':
      inputComponent = <MultipleInput field={field} placeholder={placeholder} />
      break;
    default:
      inputComponent = <Text field={field} validate={validation} />;
      break;
  }
  return (
    <label>
      {label}: {inputComponent}
      <div>{error}</div>
    </label>
  );
};