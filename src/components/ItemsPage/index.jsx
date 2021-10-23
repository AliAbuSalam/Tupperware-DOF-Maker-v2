import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Button, Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import CustomTable from '../Table';
import AddItem from './AddItem';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import ChangeStock from './ChangeStock';
import { GET_ALL_ITEMS } from '../../gql/queries';
import { SET_ITEMS } from '../../reducers/itemReducers';
import parseToRp from '../../lib/parseToRp';
import { SET_ACTIVE_PAGE } from '../../reducers/activePageReducers';
import Filter from '../Filter';
import NumberFilters, { filterNumberFunction } from '../NumberFilters';

const ItemsPage = () => {
  const [fetchItem, { data, loading, error }] = useLazyQuery(GET_ALL_ITEMS);
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
  const [activeItem, setActiveItem] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openStockModal, setOpenStockModal] = useState(false);
  const [stockModalAction, setStockModalAction] = useState('ADD');

  const dispatch = useDispatch();

  const handleItemClick = (item) => {
    if(mode === 'edit'){
      setActiveItem(item);
      setOpenEditModal(true);
    } else if(mode === 'delete'){
      setActiveItem(item);
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

  const handleStockChange = (item, action) => {
    setActiveItem(item);
    setStockModalAction(action);
    setOpenStockModal(true);
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
    const newFilteredItems = itemsList?.filter(item => item.name.toLowerCase().includes(nameFilter.toLowerCase()))
      .filter(item => filterNumberFunction(item.price, priceFilter))
      .filter(item => filterNumberFunction(item.stock, stockFilter));
    setFilteredItems(newFilteredItems);
  }, [nameFilter, setFilteredItems, itemsList, priceFilter, stockFilter]);

  return(
    <div>
      <AddItem style={{ marginLeft: '3rem' }}/>
      <EditItem open={openEditModal} setOpen={setOpenEditModal} item={activeItem}/>
      <Button color='yellow' style={{ marginLeft: '3rem'}} onClick={() => handleModeChange('edit')}>
        Edit item
      </Button>
      <DeleteItem open={openDeleteModal} setOpen={setOpenDeleteModal} item={activeItem}/>
      <Button floated='right' color='red' style={{ marginRight: '3rem'}} onClick={() => handleModeChange('delete')}>
        Delete item
      </Button>
      <ChangeStock open={openStockModal} setOpen={setOpenStockModal} action={stockModalAction} item={activeItem}/>
      <CustomTable mode={mode}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing>No</Table.HeaderCell>
            <Table.HeaderCell>
              Name
              <Filter
                value={nameFilter}
                setFilter={setNameFilter}
              />
                
            </Table.HeaderCell>
            <Table.HeaderCell>
              Price
              <NumberFilters setFilter={setPriceFilter}/>
            </Table.HeaderCell>
            <Table.HeaderCell>
              Stock
              <NumberFilters setFilter={setStockFilter} />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Price * Stock
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
              <Table.Cell>
                <Button 
                  floated='right'
                  color='green' 
                  size='mini' 
                  icon='plus' 
                  circular
                  onClick={() => handleStockChange(item, 'ADD')}
                />
                {item.stock}
                <Button 
                  floated='right'
                  color='orange' 
                  size='mini' 
                  icon='minus' 
                  circular
                  onClick={() => handleStockChange(item, 'REDUCE')}
                />
              </Table.Cell>
              <Table.Cell>{item.stock > 0 ? parseToRp(item.price * item.stock) : '-'}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='2'><b>Total of filtered items</b></Table.HeaderCell>
            <Table.HeaderCell colSpan='2'/>
            <Table.HeaderCell><b>{parseToRp(filteredItems?.reduce(calculatePriceTimesStock, 0))}</b></Table.HeaderCell>
          </Table.Row>
          <Table.HeaderCell colSpan='2'><b>Total</b></Table.HeaderCell>
          <Table.HeaderCell colSpan='2'/>
          <Table.HeaderCell><b>{parseToRp(itemsList?.reduce(calculatePriceTimesStock, 0))}</b></Table.HeaderCell>
        </Table.Footer>
      </CustomTable>
    </div>
  );
};

const calculatePriceTimesStock = (sum, currentItem) => {
  if(currentItem.stock <= 0){
    return sum;
  }
  return sum + (currentItem.price * currentItem.stock);
}

export default ItemsPage;