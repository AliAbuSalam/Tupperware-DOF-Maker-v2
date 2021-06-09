const monthToWeekParser = (monthValue) => {
  switch(monthValue){
    case 1:
      return [1,2,3,4,5];
    case 2:
      return [6,7,8,9];
    case 3:
      return [10,11,12,13];
    case 4:
      return [14,15,16,17,18];
    case 5:
      return [19,20,21,22];
    case 6:
      return [23,24,25,26];
    case 7:
      return [27,28,29,30,31];
    case 8:
      return [32,33,34,35];
    case 9:
      return [36,37,38,39];
    case 10:
      return [40,41,42,43,44];
    case 11:
      return [45,46,47,48];
    case 12:
      return [49,50,51,52];
    default:
      return [];
  }
};

export default monthToWeekParser;