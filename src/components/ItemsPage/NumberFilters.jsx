import React, { useState } from 'react';
import { Dropdown, Button, Input, Icon } from 'semantic-ui-react';

const NumberFilters = ({ setFilter }) => {
  const [operator, setOperator] = useState('=');
  const [inputValue, setInputValue] = useState('');
  const [lowerRange, setLowerRange] = useState('');
  const [upperRange, setUpperRange] = useState('');
  const operatorList = ['=', '>=', '>', '<=', '<', 'range'];

  const applyFilter = () => {
    const parsedInput = parseInt(inputValue);
    const parsedLowerRange = parseInt(lowerRange);
    const parsedUpperRange = parseInt(upperRange);

    if(operator === 'range' && 
      Number.isInteger(parsedLowerRange) &&
      Number.isInteger(parsedUpperRange)
    ){
      setFilter({
        operator,
        value: [parsedLowerRange, parsedUpperRange]
      });
    } else if(operator !== 'range' && Number.isInteger(parsedInput)){
      const filterObject = {
        operator,
        value: [parsedInput]
      };
      console.log('filterObject: ', filterObject);
      setFilter(filterObject);
    }
  };

  const handleClear = () => {
    setFilter({
      operator: 'none',
      value: null
    });
    setInputValue('');
    setLowerRange('');
    setUpperRange('');
  }

  return(
    <>
      <Dropdown text={operator} style={{ marginLeft: '3rem' }}>
        <Dropdown.Menu>
          {operatorList.map((op, index) => 
            <Dropdown.Item 
              text={op} 
              onClick={() => setOperator(op)} 
              key={index}
            />
          )}
        </Dropdown.Menu>
      </Dropdown>
      {operator === 'range'
        ? <>
          <Input 
            size='small'
            value={lowerRange} 
            onChange={({ target}) => setLowerRange(target.value)}
          /> to 
          <Input 
            size='small'
            value={upperRange}
            onChange={({ target }) => setUpperRange(target.value)}
          />
        </>
        : <Input size='small' value={inputValue} onChange={({ target }) => setInputValue(target.value)}/>
      }
      <Button icon onClick={applyFilter} compact>
        <Icon name='filter'/>
      </Button>
      <Button onClick={handleClear} compact>
        clear
      </Button>
    </>
  );
};

export default NumberFilters;