import { useState, useEffect } from 'react';

import monthToWeekParser from '../lib/monthToWeekParser';

const useMonthToWeek = () => {
  const [monthValue, setMonthValue] = useState();
  const [weekValue, setWeekValue] = useState([]);

  const mapToDropdownObject = (arrays) => {
    return arrays.map(val => {
      return {
        key: val,
        value: val,
        text: val.toString()
      }
     });
  }

  useEffect(() => {
    setWeekValue(mapToDropdownObject(monthToWeekParser(monthValue)));
  }, [monthValue]);

  return [weekValue, setMonthValue];
};

export default useMonthToWeek;