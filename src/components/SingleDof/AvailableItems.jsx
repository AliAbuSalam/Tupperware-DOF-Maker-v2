import React from 'react';
import { Table } from 'semantic-ui-react';

import parseToRp from '../../lib/parseToRp';

const AvailableItems = ({ items }) => {
  return(
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Stock</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items?.map(item => {
          return(
            <Table.Row key={item.id} negative={item.stock < 0}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.stock}</Table.Cell>
              <Table.Cell>{parseToRp(item.price)}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default AvailableItems;