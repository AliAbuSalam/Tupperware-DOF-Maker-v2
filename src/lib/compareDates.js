const compareDates = (firstDate, secondDate) => {
  if(parseInt(firstDate.year) !== parseInt(secondDate.year)){
    return false;
  }
  if(parseInt(firstDate.month) !== parseInt(secondDate.month)){
    return false;
  }
  if(parseInt(firstDate.week) !== parseInt(secondDate.week)){
    return false;
  }
  return true;
}

export default compareDates;