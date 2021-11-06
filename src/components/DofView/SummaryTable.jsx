import React, { useEffect, useState } from 'react';
import { Table, Input } from 'semantic-ui-react';

import parseToRp from '../../lib/parseToRp';

const SummaryTable = ({ dofArray }) => {
  const [uniqueUsedItemsArray, setUniqueUsedItemsArray] = useState([]);
  const [uniqueUsedStarItemsArray, setUniqueUsedStarItemsArray] = useState([]);
  const [usedItemsFilter, setUsedItemsFilter] = useState('');
  const [usedStarItemsFilter, setUsedStarItemsFilter] = useState('');

  const createUniqueItemsArray = (itemsArray) => {
    let usedItems = [];
    itemsArray.forEach(dof => {
      usedItems = usedItems.concat(dof);
    })
    let uniqueUsedItems = [];
    usedItems.forEach(usedItems => {
      const isItemUnique = !uniqueUsedItems.some(item => (item.itemName === usedItems.itemName) && (item.price === usedItems.price));
      if(isItemUnique){
        uniqueUsedItems.push({
          itemName: usedItems.itemName,
          numberOfItems: usedItems.numberOfItems,
          price: usedItems.price
        });
      } else {
        uniqueUsedItems = uniqueUsedItems.map(item => {
          if(item.itemName === usedItems.itemName){
            return {
              ...item,
              numberOfItems: item.numberOfItems + usedItems.numberOfItems
            }
          }
          return item;
        });
      }
    });
    return uniqueUsedItems;
  }

  const filterWith = (filter) => (item) => {
    if(filter.trim() === ''){
      return true;
    }
    return item.itemName.toLowerCase().trim().includes(filter.toLowerCase().trim());
  };

  useEffect(() => {
    const usedItemsArray = dofArray.map(dof => dof.usedItems);
    const usedStarItemsArray = dofArray.map(dof => dof.usedItemStars);
    const uniqueUsedItems = createUniqueItemsArray(usedItemsArray);
    const uniqueUsedStarItems = createUniqueItemsArray(usedStarItemsArray);
    setUniqueUsedItemsArray(uniqueUsedItems);
    setUniqueUsedStarItemsArray(uniqueUsedStarItems);
  }, [dofArray]);

  const TableHeader = () => (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Number of Items</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Total</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );

  const TableFooter = ({ itemsArray }) => (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan={3}>
          <b>Total</b>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <b>
          {parseToRp(itemsArray.reduce((sum, currentItem) => {
            return sum + (currentItem.price*currentItem.numberOfItems);
          }, 0))}
          </b>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  )

  const mapItemsToTable = (item, index) => 
  (<Table.Row key={index}>
    <Table.Cell>{item.itemName}</Table.Cell>
    <Table.Cell>{item.numberOfItems}</Table.Cell>
    <Table.Cell>{parseToRp(item.price)}</Table.Cell>
    <Table.Cell>{parseToRp(item.numberOfItems*item.price)}</Table.Cell>
  </Table.Row>);

  return(
    <>
      <h3>Items</h3> 
      <Input placeholder='Search...' icon='search' onChange={({ target }) => setUsedItemsFilter(target.value)}/>
      <Table>
        <TableHeader />
        <Table.Body>
          {uniqueUsedItemsArray.filter(filterWith(usedItemsFilter)).map(mapItemsToTable)}
        </Table.Body>
        <TableFooter itemsArray={uniqueUsedItemsArray}/>
      </Table>
      <h3>Star Items</h3>
      <Input placeholder='Search...' icon='search' onChange={({ target }) => setUsedStarItemsFilter(target.value)}/>
      <Table>
        <TableHeader />
        <Table.Body>
          {uniqueUsedStarItemsArray.filter(filterWith(usedStarItemsFilter)).map(mapItemsToTable)}
        </Table.Body>
        <TableFooter itemsArray={uniqueUsedStarItemsArray}/>
      </Table>
    </>
    
  );
};

export default SummaryTable;