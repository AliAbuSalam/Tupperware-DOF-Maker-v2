import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Table, Button, Input } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import NumberFilters from './NumberFilters';
import AddItem from './AddItem';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import { GET_ALL_ITEMS } from '../../gql/queries';
import { SET_ITEMS } from '../../reducers/itemReducers';
import parseToRp from '../../lib/parseToRp';
import { SET_ACTIVE_PAGE } from '../../reducers/activePageReducers';

const filterNumberFunction = (value, filterObject) => {
  switch(filterObject.operator){
    case '=':
      return value === filterObject.value[0];
    case '>':
      return value > filterObject.value[0];
    case '>=':
      return value >= filterObject.value[0];
    case '<':
      return value < filterObject.value[0];
    case '<=':
      return value <= filterObject.value[0];
    case 'range':
      return value >= filterObject.value[0] && value <= filterObject.value[1];
    default:
      return true;
  }
}

const ItemsPage = () => {
  const [fetchItem ,{ data, loading, error }] = useLazyQuery(GET_ALL_ITEMS);
  const itemsList = useSelector(state => state.items);
  const [nameFilter, setNameFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState({
    operator: 'none',
    value: null
  });
  const [stockFilter, setStockFilter] = useState({
    operator: 'none',
    value: null
  });
  const [filteredItems, setFilteredItems] = useState(itemsList);
  const [mode, setMode] = useState('normal');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [itemToDelete, setItemtoDelete] = useState({});

  const dispatch = useDispatch();

  const handleItemClick = (item) => {
    if(mode === 'edit'){
      setItemToEdit(item);
      setOpenEditModal(true);
    } else if(mode === 'delete'){
      setItemtoDelete(item);
      setOpenDeleteModal(true);
    }
  };

  const handleModeChange = (newMode) => {
    if(mode === 'normal'){
      setMode(newMode);
    }
    if(mode === newMode){
      setMode('normal');
    }
  };

  useEffect(() => {
    fetchItem();
    dispatch(SET_ACTIVE_PAGE('items'))
  }, []); /* eslint-disable-line */

  useEffect(() => {
    if(data && !loading){
      dispatch(SET_ITEMS(data.getAllItems))
    }
  }, [data, loading, dispatch, error]);

  useEffect(() => {
    const newFilteredItems = itemsList?.filter(item => {
      if(nameFilter === ''){
        return true;
      }
      return item.name.includes(nameFilter)
    })
      .filter(item => filterNumberFunction(item.price, priceFilter))
      .filter(item => filterNumberFunction(item.stock, stockFilter));
    setFilteredItems(newFilteredItems);
  }, [nameFilter, setFilteredItems, itemsList, priceFilter, stockFilter]);

  return(
    <div>
      <AddItem style={{ marginLeft: '3rem' }}/>
      <EditItem open={openEditModal} setOpen={setOpenEditModal} item={itemToEdit}/>
      <Button color='yellow' style={{ marginLeft: '3rem'}} onClick={() => handleModeChange('edit')}>
        Edit item
      </Button>
      <DeleteItem open={openDeleteModal} setOpen={setOpenDeleteModal} item={itemToDelete}/>
      <Button floated='right' color='red' style={{ marginRight: '3rem'}} onClick={() => handleModeChange('delete')}>
        Delete item
      </Button>
      <Table 
        celled 
        selectable={mode !== 'normal' ? true : false} 
        color={mode === 'edit' ? 'grey': mode === 'delete' ? 'red' : undefined} 
        inverted={mode !== 'normal' ? true: false}
      >
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
            <Table.HeaderCell>
              price
              <NumberFilters setFilter={setPriceFilter}/>
            </Table.HeaderCell>
            <Table.HeaderCell>
              Stock
              <NumberFilters setFilter={setStockFilter} />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredItems?.map((item, index) => 
            <Table.Row 
              key={item.id} 
              negative={item.stock < 0} 
              onClick={() => handleItemClick(item)}
            >
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