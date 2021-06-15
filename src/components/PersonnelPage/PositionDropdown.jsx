import React from 'react';
import { Form } from 'semantic-ui-react';

import positionObjects from '../../lib/positionObject';

const PositionDropdown = ({ value, onChange, clearable }) => {
  return(
    <Form.Dropdown 
      label='Position'
      placeholder='Position'
      search
      selection
      clearable={clearable}
      options={positionObjects}
      value={value}
      onChange={onChange}
    />
  );
};

export default PositionDropdown;