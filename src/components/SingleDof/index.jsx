import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Ref, Segment, Header, Loader, Button, Sticky, Form } from 'semantic-ui-react';
import { useParams } from 'react-router';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { GET_DOF } from '../../gql/queries';
import monthValueToText from  '../../lib/monthValueToText';
import TableOfItems from '../DofPage/TableOfItems';
import ItemInputForm from './ItemInputForm';
import { GET_ALL_ITEMS } from '../../gql/queries';
import { SET_ITEMS, UPDATE_ITEMS } from '../../reducers/itemReducers';
import { SET_ITEMS_STAR } from '../../reducers/itemStarReducers';
import { SET_STAR_PRICE } from '../../reducers/itemStarReducers';
import { GET_ALL_PERSONNEL } from '../../gql/queries';
import { SET_DOF_TO_EDIT } from '../../reducers/dofEditReducers';
import { ADD_USED_ITEM_DOF_EDIT } from '../../reducers/dofEditReducers';
import { ADD_USED_STAR_ITEM_DOF_EDIT } from '../../reducers/dofEditReducers';
import { SET_PEOPLE } from '../../reducers/personReducers';
import { RESET_EDIT_FLAG } from '../../reducers/dofEditReducers';
import { SAVE_DOF } from '../../gql/queries';
import useStarItems from '../../hooks/useStarItems';
import AvailableItems from './AvailableItems';
import parseToRp from '../../lib/parseToRp';
import DiscountInput from '../DofPage/DiscountInput';
import DeleteDof from './DeleteDof';
import clipboardButtons from './ClipboardButtons';
import ClipboardButtons from './ClipboardButtons';

const SingleDof = () => {
  const { id: dofId, weekIndex } = useParams();
  const dofFromGlobalState = useSelector(state => state.dofs.dofs[weekIndex]?.dof?.find(dof => dof.id === dofId));
  const items = useSelector(state => state.items);
  const itemsStar = useSelector(state => state.itemsStar);
  const personnel = useSelector(state => state.people);
  const dof = useSelector(state => state.dofEdit);
  const editFlag = useSelector(state => state.dofEdit?.isDofEdited);
  const [getDof, { loading, data }] = useLazyQuery(GET_DOF, { variables: { id: dofId }});
  const [saveDof, { error: errorSaveDof }] = useMutation(SAVE_DOF);
  const [getItems, { loading: itemsLoading, data: itemsData }] = useLazyQuery(GET_ALL_ITEMS);
  const [getPersonnel, { loading: personnelLoading, data: personnelData }] = useLazyQuery(GET_ALL_PERSONNEL);
  const { fetchItems: getItemsStar, fetchPrice: getStarPrice, starItemsResult, starPriceResult } = useStarItems();
  const dispatch = useDispatch();
  const refObject = useRef();
  const listOfItemsInDof = dof?.usedItems.map(usedItem => usedItem.itemName);
  const listOfStarsInDof = dof?.usedItemStars.map(usedItem => usedItem.itemName);

  const handleSave = () => {
    if(personnel.length === 0 || !dof){
      return;
    }
    const owner = personnel.find(person => person.name === dof.owner.name)?.id;
    if(!owner){
      console.log('Owner id doesn\'t exist');
    }
    saveDof({
      variables: {
        id: dofId,
        owner,
        date: {
          year: dof.date.year,
          month: dof.date.month,
          week: dof.date.week
        },
        usedItems: dof.usedItems.map(item => mapUsedItemsForSaveDof(item, items)),
        usedItemStars: dof.usedItemStars.map(item => mapUsedItemsForSaveDof(item, itemsStar.itemsList)),
        discount: dof.discount
      }
    }).then(result => {
      dispatch(SET_DOF_TO_EDIT(result.data.editDof.dof));
      dispatch(UPDATE_ITEMS(result.data.editDof.changedItems));
      dispatch(RESET_EDIT_FLAG());
    }).catch(error => console.error('error: ', error))
  };

  const mapUsedItemsForSaveDof = (item, itemArray) => {
    const matchedItem = itemArray.find(itemFromArray => itemFromArray.name === item.itemName);
    if(!matchedItem){
      console.error('item can\'t be found');
      return;
    }
    return {
      item: matchedItem.id,
      price: item.price,
      numberOfItems: item.numberOfItems,
      totalPrice: item.totalPrice
    };
  };

  useEffect(() => {
    if(!dofFromGlobalState){
      getDof();
    } else {
      dispatch(SET_DOF_TO_EDIT(dofFromGlobalState));
    }
    if(!items){
      getItems();
    }
    if(itemsStar.itemsList.length === 0){
      getItemsStar();
      getStarPrice();
    }
    if(personnel.length === 0){
      getPersonnel();
    }
  }, []);

  useEffect(() => {
    if(!itemsLoading && itemsData){
      dispatch(SET_ITEMS(itemsData.getAllItems));
    }
  }, [itemsLoading, itemsData, dispatch]);

  
  useEffect(() => {
    if(!personnelLoading && personnelData){
      dispatch(SET_PEOPLE(personnelData.getPersons));
    }
  }, [personnelLoading, personnelData,dispatch]);

  useEffect(() => {
    if(data && !loading){
      dispatch(SET_DOF_TO_EDIT(data.getDof));
    }
  }, [data, loading, dispatch]);

  useEffect(() => {
    if(starItemsResult.data && !starItemsResult.loading){
      dispatch(SET_ITEMS_STAR(starItemsResult.data.getAllItemsStar));
    }
  }, [starItemsResult, dispatch]);

  useEffect(() => {
    if(starPriceResult.data && !starPriceResult.loading){
      dispatch(SET_STAR_PRICE(starPriceResult.data.getStarPrice.price));
    }
  }, [starPriceResult, dispatch]);

  return(
    <div>
      <div style={{ textAlign: 'center'}}>
        <Header as='h2'>{dof?.owner?.name}</Header>
        <Header as='h4'>{dof?.date.year} {monthValueToText(dof?.date.month)} week {dof?.date.week}</Header>
      </div>

      <div>
        <Button style={styles.saveButton} disabled={!editFlag} onClick={handleSave} size='big' color={editFlag ? 'green': 'grey'}>Save</Button>
        <ClipboardButtons style={styles.clipboardButtons} dof={dof}/>
        <DeleteDof dof={dof} style={styles.deleteButton} weekIndex={weekIndex}/>
      </div>

      <Grid columns='2'>
        <Grid.Row stretched>
          <Grid.Column>
            <Ref innerRef={refObject}>
              <Segment>
                <Sticky context={refObject}>
                  <Header as='h3'>Total: {parseToRp(dof?.totalPrice)}</Header>
                  <DiscountInput/>
                  <Header as='h3'>Items</Header>
                  {dof ? <TableOfItems items={dof.usedItems} totalPrice={dof.totalPriceItems} pageType='singleDof'/>: <></>}
                  {items ? <ItemInputForm items={items.filter(item => !listOfItemsInDof?.includes(item.name))} reducerFunction={ADD_USED_ITEM_DOF_EDIT}/>: <Segment placeholder><Loader active/></Segment>}
                  <Header as='h3'>Star Items</Header>
                  {dof ? <TableOfItems items={dof.usedItemStars} totalPrice={dof.totalPriceStars} pageType='singleDof' itemType='STAR_ITEM'/>: <></>}
                  {itemsStar ? <ItemInputForm items={itemsStar.itemsList.filter(item => !listOfStarsInDof?.includes(item.name))} reducerFunction={ADD_USED_STAR_ITEM_DOF_EDIT}/>:<Segment placeholder><Loader active/></Segment>}
                </Sticky>
              </Segment>
            </Ref>
          </Grid.Column>
        <Grid.Column>
          <Segment>
            <AvailableItems items={items}/>
          </Segment>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const styles = {
  saveButton: {
    margin: '1rem'
  },
  deleteButton: {
    float: 'right',
    marginTop: '1.6rem',
    marginRight: '1rem',
  },
  clipboardButtons: {
    marginLeft: '2rem'
  }
}

export default SingleDof;