import React from 'react';
import { Table } from 'semantic-ui-react';

import parseToRp from '../../lib/parseToRp';
import ItemRow from './ItemRow';

const TableOfItems = ({ items, totalPrice, pageType, itemType }) => {
  return(
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell collapsing>Name</Table.HeaderCell>
          <Table.HeaderCell collapsing>Qty</Table.HeaderCell>
          {pageType === 'singleDof' ? <Table.HeaderCell collapsing>Price</Table.HeaderCell>: <></>}
          <Table.HeaderCell collapsing>Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) =>{
          return(
            <ItemRow key={item.itemName}item={item} pageType={pageType} itemType={itemType}/>
          );}
        )}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={pageType === 'singleDof' ? '3': '2'}>
            <b>
              Total: 
            </b>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <b>
              {parseToRp(totalPrice)}
            </b>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default TableOfItems;