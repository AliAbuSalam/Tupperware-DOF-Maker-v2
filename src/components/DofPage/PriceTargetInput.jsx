import React, { useEffect, useState } from 'react';
import { Table, Input } from 'semantic-ui-react';

import forceInputToNumber from '../../lib/forceInputToNumber';
import parseToRp from '../../lib/parseToRp';

const styles = {
  mismatched: {
    color: 'red'
  },
  matched: {
    color: 'green'
  }
}

const PriceTargetInput = ({ currentTotal }) => {
  const [target, setTarget] = useState('');
  const [targetAndCurrentDifference, setTargetAndCurrentDifference] = useState();

  useEffect(() => {
    if(target && currentTotal){
      const difference = currentTotal - parseInt(target);
      setTargetAndCurrentDifference(difference);
    }
  }, [target, currentTotal])

  return(
    <>
      <Table.Row>
        <Table.HeaderCell colSpan='3'><b>Target:</b></Table.HeaderCell>
        <Table.HeaderCell >
          <b>Rp. </b>
          <Input value={target} onChange={({ target }) => setTarget(forceInputToNumber(target.value))}/>
        </Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell colSpan='3'></Table.HeaderCell>
        <Table.HeaderCell>
          {currentTotal && target
            ? <b style={targetAndCurrentDifference !== 0 ? styles.mismatched: styles.matched}>{parseToRp(targetAndCurrentDifference)}</b>
            : <b>-</b>
          }
        </Table.HeaderCell>
      </Table.Row>
    </>
  );
};

export default PriceTargetInput;