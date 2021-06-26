import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';

import { GET_ALL_ITEMS_STAR } from '../../gql/queries';
import { SET_ITEMS_STAR } from '../../reducers/itemStarReducers';
import { GET_STAR_PRICE } from '../../gql/queries';
import { SET_STAR_PRICE as SET_STAR_PRICE_STATE } from '../../reducers/itemStarReducers';
import { SET_ACTIVE_PAGE } from '../../reducers/activePageReducers';
import CustomTable from '../Table';
import Filter from '../Filter';
import NumberFilters, { filterNumberFunction } from '../NumberFilters';
import parseToRp from '../../lib/parseToRp';
import AddItemStar from './AddItemStar';
import EditItemStar from './EditItemStar';

const ItemsStarPage = () => {
  const items = useSelector(state => state.itemsStar.itemsList);
  const starPrice = useSelector(state => state.itemsStar.price);
  const [fetchItems, { data: dataItems, loading: loadingItems }] = useLazyQuery(GET_ALL_ITEMS_STAR);
  const [fetchPrice, { data: dataPrice, loading: loadingPrice }] = useLazyQuery(GET_STAR_PRICE);
  const [filteredItems, setFilteredItems] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [starCostFilter, setStarCostFilter] = useState({
    operator: 'none',
    value: null
  });
  const [priceFilter, setPriceFilter] = useState({
    operator: 'none',
    value: null
  });
  const [mode, setMode] = useState('normal');
  const [openEditItemStar, setOpenEditItemStar] = useState(false);
  const [activeItem, setActiveItem] = useState();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    if(mode !== 'edit'){
      setMode('edit');
    } else if(mode === 'edit'){
      setMode('normal');
    }
  }

  const handleItemClick = (item) => {
    if(mode === 'edit'){
      setActiveItem(item);
      setOpenEditItemStar(true);
    }
  };

  useEffect(() => {
    dispatch(SET_ACTIVE_PAGE('itemsStar'));
    fetchPrice();
    fetchItems();
  }, []);

  useEffect(() => {
    if(dataItems && !loadingItems){
      dispatch(SET_ITEMS_STAR(dataItems.getAllItemsStar));
    }
  }, [dataItems, loadingItems, dispatch]);

  useEffect(() => {
    if(dataPrice && !loadingPrice){
      dispatch(SET_STAR_PRICE_STATE(dataPrice.getStarPrice.price))
    }
  }, [dataPrice, loadingPrice, dispatch]);

  useEffect(() => {
    const newlyFilteredItems = items.filter(item => item.name.toLowerCase().includes(nameFilter))
      .filter(item => filterNumberFunction(item.starCost, starCostFilter))
      .filter(item => filterNumberFunction(item.price, priceFilter));
    setFilteredItems(newlyFilteredItems);
  }, [items, nameFilter, starCostFilter, priceFilter]);

  return(
    <div>
      <AddItemStar />
      <Button color='yellow' style={{ marginLeft: '3rem' }} onClick={handleEditClick}>Edit Star Item</Button>
      <EditItemStar open={openEditItemStar} setOpen={setOpenEditItemStar} activeItem={activeItem} setActiveItem={setActiveItem}/>
      <CustomTable mode={mode}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing>
              Name
              <Filter filter={nameFilter} setFilter={setNameFilter}/>
            </Table.HeaderCell>
            <Table.HeaderCell collapsing>
              starCost
              <NumberFilters setFilter={setStarCostFilter}/>
            </Table.HeaderCell>
            <Table.HeaderCell collapsing>
              Price
              <NumberFilters setFilter={setPriceFilter}/>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredItems.map(item => 
            <Table.Row
              onClick={() => handleItemClick(item)}
              key={item.id}
            >
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.starCost}</Table.Cell>
              <Table.Cell>{parseToRp(item.price)}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </CustomTable>
    </div>
  );
};

export default ItemsStarPage;