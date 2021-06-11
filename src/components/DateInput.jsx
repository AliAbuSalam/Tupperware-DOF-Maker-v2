import React, { useEffect } from 'react';
import { Form } from 'semantic-ui-react';

import useMonthToWeek from '../hooks/useMonthToWeek';
import monthObject from '../lib/monthObject';
import forceInputToNumber from '../lib/forceInputToNumber';

const DateInput = ({ date, setDate }) => {
  const [weekValue, setMonthToParse] = useMonthToWeek();

  const handleChangeYear = ({ target }) => {
    setDate({
      ...date,
      year: forceInputToNumber(target.value)
    });
  };

  const handleChangeMonth = (_, data) => {
    setDate({
      ...date,
      month: data.value,
      week: ''
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
      <Form.Group width='equal'>
        <Form.Input 
          label='Year'
          placeholder='Year'
          value={date.year}
          onChange={handleChangeYear}
        />
        <Form.Dropdown 
          label='Month'
          search
          selection
          options={monthObject}
          onChange={handleChangeMonth}
        />
        <Form.Dropdown 
          label='Week'
          placeholder='Week'
          search
          selection
          options={weekValue}
          onChange={handleChangeWeek}
        />
      </Form.Group>
    </>
  );
};

export default DateInput;