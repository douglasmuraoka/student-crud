/**
 * @fileoverview Component responsible for rendering the multiple select input.
 * With this component, the user can input multiple values. It returns
 * an array of strings as its value.
 */

import React from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import { asField } from 'informed';
import styles from './MultipleInput.module.scss';

export default asField(({ fieldState, fieldApi, placeholder, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const { ...rest } = props;
  return (
    <CreatableSelect
      {...rest}
      isClearable
      value={value && value.map(value => ({ label: value, value }))}
      onChange={selectedOptions => {
        setTouched();
        // selectedOptions is an array of { label: string, value: string }
        setValue(selectedOptions.map(option => option.value));
      }}
      isMulti={true}
      components={{
        Menu: () => null,
        IndicatorsContainer: () => null,
        Input: ({ onChange }) => <input className={styles.input} onChange={onChange} />
      }}
      placeholder={placeholder}
    />
  );
});