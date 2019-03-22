/**
 * @fileoverview Component responsible for rendering the date input.
 * This component should return a String as its value, with the format MM/dd/yyyy.
 */

import React from 'react';
import { asField } from 'informed';
import Datepicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import styles from './DateInput.module.scss';

const DATE_FORMAT = 'MM/dd/yyyy';

export default asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const { forwardedRef, ...rest } = props;
  return (
    <div className={styles.container}>
      <Datepicker
        {...rest}
        ref={forwardedRef}
        value={value}
        onChange={date => {
          setValue(format(date, DATE_FORMAT));
        }}
        onBlur={() => {
          setTouched();
        }}
        dateFormat={DATE_FORMAT}
        strictParsing
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    </div>
  );
});