import monthObject from './monthObject';

const parseOmsetDateToMonth = (dateFrom, dateTo) => {
  if(!dateTo) return [];
  
  if(dateTo.year === dateFrom.year){
    return monthObject.filter(month => month.value >= dateFrom.month && month.value <=dateTo.month)
      .map(month => ({ 
        ...month,
        key: month.value + ' ' + dateFrom.year,
        value: month.value + ' ' + dateFrom.year 
        //The value is changed to a string combination of month and year.
        //It's because the program throws a warning when i put object as the value and i need to put month and year to the value.
      }));
  }

  if(dateTo.year - dateFrom.year > 0){
    let monthsArrayToReturn = [];
    for(
      let currentYear = dateFrom.year;
      currentYear >= dateFrom.year && currentYear <= dateTo.year;
      currentYear++
    ){
      let filterFunction = () => true; //no filter at the start

      if(currentYear === dateFrom.year){
        filterFunction = month => month.value >= dateFrom.month
      } else if(currentYear === dateTo.year){
        filterFunction = month => month.value <= dateTo.month
      }

      const filteredMonth = monthObject.filter(filterFunction)
      .map(month => ({ 
        key: month.value + ' ' + currentYear,
        value: month.value + ' ' + currentYear,
        text: month.text + ' ' + currentYear
      }));
      monthsArrayToReturn = monthsArrayToReturn.concat(filteredMonth);
    }
    return monthsArrayToReturn;
  }
  return [];
};

export default parseOmsetDateToMonth;