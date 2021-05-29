import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Table, Button, Input } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { GET_ALL_ITEMS } from '../gql/queries';
import { SET_ITEMS } from '../reducers/itemReducers';
import { SET_ACTIVE_PAGE } from '../reducers/activePageReducers';
import parseToRp from '../lib/parseToRp';

const ItemsPage = () => {
  const { data, loading } = useQuery(GET_ALL_ITEMS);
  const itemsList = useSelector(state => state.items);
  const [nameFilter, setNameFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState(itemsList);
  const dispatch = useDispatch();
  dispatch(SET_ACTIVE_PAGE('items'));

  useEffect(() => {
    if(data && !loading){
      dispatch(SET_ITEMS(data.getAllItems))
    }
  }, [data, loading, dispatch]);

  /*useEffect(() => {
    setFilteredItems(itemsList);
  }, [itemsList, setFilteredItems]);*/

  useEffect(() => {
    if(nameFilter === ''){
      setFilteredItems(itemsList);
      return;
    }
    const newFilteredItems = itemsList.filter(item => item.name.includes(nameFilter));
    setFilteredItems(newFilteredItems);
  }, [nameFilter, setFilteredItems, itemsList]);

  return(
    <div>
      <Button color='green' style={{ marginLeft: '3%'}}>
        Add item
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing>No</Table.HeaderCell>
            <Table.HeaderCell>
              Name
              <Input 
                placeholder='Search...' 
                floated='right' 
                style={{ marginLeft: '5px'}}
                onChange={({ target }) => setNameFilter(target.value)}
              />
                
            </Table.HeaderCell>
            <Table.HeaderCell>price</Table.HeaderCell>
            <Table.HeaderCell>Stock</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredItems?.map((item, index) => 
            <Table.Row key={item.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{parseToRp(item.price)}</Table.Cell>
              <Table.Cell>{item.stock}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ItemsPage;