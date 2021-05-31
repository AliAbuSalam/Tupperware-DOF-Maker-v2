import React, { useState } from 'react';
import { Dropdown, Button, Input, Icon } from 'semantic-ui-react';

const NumberFilters = ({ setFilter }) => {
  const [operator, setOperator] = useState('>=');
  const [inputValue, setInputValue] = useState('');
  const [lowerRange, setLowerRange] = useState('');
  const [upperRange, setUpperRange] = useState('');

  const applyFilter = () => {
    console.log('applying filter....');
    const parsedInput = parseInt(inputValue);
    const parsedLowerRange = parseInt(lowerRange);
    const parsedUpperRange = parseInt(upperRange);

    if(operator === 'range' && 
      Number.isInteger(parsedLowerRange) &&
      Number.isInteger(parsedUpperRange)
    ){
      console.log('setting range filter...');
      setFilter({
        operator,
        value: [parsedLowerRange, parsedUpperRange]
      });
    } else if(operator !== 'range' && Number.isInteger(parsedInput)){
      console.log('setting standard filter...');
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
          <Dropdown.Item text='>=' onClick={() => setOperator('>=')}/>
          <Dropdown.Item text='>' onClick={() => setOperator('>')}/>
          <Dropdown.Item text='<=' onClick={() => setOperator('<=')}/>
          <Dropdown.Item text='<' onClick={() => setOperator('<')}/>
          <Dropdown.Item text='range' onClick={() => setOperator('range')}/>
        </Dropdown.Menu>
      </Dropdown>
      {operator === 'range'
        ? <>
          <Input 
            value={lowerRange} 
            onChange={({ target}) => setLowerRange(target.value)}
          /> to 
          <Input 
            value={upperRange}
            onChange={({ target }) => setUpperRange(target.value)}
          />
        </>
        : <Input value={inputValue} onChange={({ target }) => setInputValue(target.value)}/>
      }
      <Button icon onClick={applyFilter}>
        <Icon name='filter'/>
      </Button>
      <Button onClick={handleClear}>
        clear
      </Button>
    </>
  );
};

export default NumberFilters;