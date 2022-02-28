import React, { useEffect } from 'react';
import { Form } from 'semantic-ui-react';

import useMonthToWeek from '../hooks/useMonthToWeek';
import monthObject from '../lib/monthObject';
import forceInputToNumber from '../lib/forceInputToNumber';

const DateInput = ({ date, setDate, clearableWeek, clearableMonth, noWeek, style, disabled }) => {
  const [weekValue, setMonthToParse] = useMonthToWeek();

  const handleChangeYear = ({ target }) => {
    setDate({
      ...date,
      year: forceInputToNumber(target.value)
    });
  };

  const handleChangeMonth = (_, data) => {
    const newDateObject = {
      ...date,
      month: data.value
    }
    setDate({ 
      ...newDateObject, 
      ...(noWeek ? {}: { week: ''})
    });
  };

  const handleChangeWeek = (_, data) => {
    setDate({
      ...date,
      week: data.value,
    });
  };

  useEffect(() => {
    setMonthToParse(date.month);
  }, [date.month, setMonthToParse]);

  return(
    <>
      <Form.Group width='equal' style={{ ...style }}>
        <Form.Input 
          label='Year'
          placeholder='Year'
          value={date.year}
          onChange={handleChangeYear}
          disabled={disabled}
        />
        <Form.Dropdown 
          label='Month'
          search
          selection
          clearable={false || clearableMonth}
          options={monthObject}
          onChange={handleChangeMonth}
          disabled={disabled}
        />
        {
          noWeek ?
          <></> :
          <Form.Dropdown 
            label='Week'
            placeholder='Week'
            search
            clearable={false || clearableWeek}
            selection
            options={weekValue}
            onChange={handleChangeWeek}
            disabled={disabled}
          />
        }
      </Form.Group>
    </>
  );
};

export default DateInput;