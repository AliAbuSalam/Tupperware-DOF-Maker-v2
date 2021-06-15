import React from 'react';
import { Input } from 'semantic-ui-react';

const Filter = ({ filter, setFilter }) => {
  return(
    <Input
      placeholder='Search...' 
      floated='right' 
      style={{ marginLeft: '5px'}}
      value={filter}
      onChange={({ target }) => setFilter(target.value)}
  />
  );
};

export default Filter;