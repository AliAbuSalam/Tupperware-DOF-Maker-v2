import React from 'react';
import { Card, Header, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import TableOfItems from './TableOfItems';

const styles = {
  closeIcon: {
    float: 'right'
  }
}

const DofCard = ({ dof, color, weekIndex }) => {
  const { date } = useParams();
  const history = useHistory();

  return(
    <Link to={location => `${location.pathname}${weekIndex}/${dof.id}`}>
      <Card fluid color={color}>
        <Card.Content>
          <Card.Header>{dof.owner.name}</Card.Header>
          <Card.Meta>{dof.owner.consultantId}</Card.Meta>
          <Card.Description>
            <Header as='h5'>Item</Header>
            <TableOfItems items={dof.usedItems} totalPrice={dof.totalPriceItems}/>
            <Header as='h5'>Star Item</Header>
            <TableOfItems items={dof.usedItemStars} totalPrice={dof.totalPriceStars} itemType='STAR_ITEM'/>
          </Card.Description>
          </Card.Content>
      </Card>
    </Link>
  );
};

export default DofCard;