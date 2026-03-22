import React from 'react';
import { useField } from 'formik';
import { FormHelperText } from '@mui/material';

const FormikTimePicker = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return { hours, minutes };
  };

  const formatTime = (hours, minutes) => {
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  const { hours, minutes } = parseTime(field.value || '00:00');

  const handleHoursChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value < 0) value = 0;
    if (value > 12) value = 12;
    const newHours = value.toString().padStart(2, '0');
    helpers.setValue(formatTime(newHours, minutes));
  };

  const handleMinutesChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value < 0) value = 0;
    if (value > 59) value = 59;
    const newMinutes = value.toString().padStart(2, '0');
    helpers.setValue(formatTime(hours, newMinutes));
  };


  const validateHours = (hour, minutes) => {

    if (isNaN(hour) || isNaN(minutes)) {
      return 'This field is required';
    }
    return undefined;
  };

  const hoursError = validateHours(parseInt(hours, 10), parseInt(minutes, 10));

  return (
    <div>
      <div className="d-flex items-center space-x-2 gap-1 item-center">
        <input
          type="number"
          value={parseInt(hours, 10)}
          onChange={handleHoursChange}
          onBlur={field.onBlur}
          min="0"
          max="12"
          className=""
          name={`${name}-hours`}
          style={{ width: '50%' }}
        />

        <span>:</span>
        <input
          type="number"
          value={parseInt(minutes, 10)}
          onChange={handleMinutesChange}
          onBlur={field.onBlur}
          min="0"
          max="59"
          className="w-16 px-2 py-1 border rounded"
          name={`${name}-minutes`}
          style={{ width: '49%' }}

        />
      </div>
      {hoursError && (
        <FormHelperText error className="formik-input-error mt-1">{hoursError}</FormHelperText>
      )}
    </div>
  );
};

export default FormikTimePicker;