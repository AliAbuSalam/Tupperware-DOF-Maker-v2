import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Segment } from 'semantic-ui-react';

import monthValueToText from '../../lib/monthValueToText';
import parseOmsetDateToMonth from '../../lib/omsetDateToMonth';
import OmsetTable from './OmsetTable/OmsetTable';
import AddOmsetModal from './AddOmsetModal';

const OmsetView = () => {
  const omsetsData = useSelector(state => state.omsets);
  const [monthObject, setMonthObject] = useState([]);
  const [activeDate, setActiveDate] = useState();
  const [omsetIdToEdit, setOmsetIdToEdit] = useState(null);

  const handleChangeMonth = (_, data) => {
    const valueSplit = data.value.split(' ');
    const month = parseInt(valueSplit[0]);
    const year = parseInt(valueSplit[1]);
    setActiveDate({
      month,
      year
    });
  };

  useEffect(() => {
    setMonthObject(parseOmsetDateToMonth(omsetsData.dateFrom, omsetsData.dateTo));
    setActiveDate(omsetsData.dateFrom);
  }, [omsetsData]);

  if(!omsetsData.dateFrom){
    return(<></>);
  }

  const OmsetPlanObject = ({ omset }) => {
    const group = omset.individualTarget;
    const dofs = omsetsData.relatedDofs.filter(dof => group.map(group => group.personId).includes(dof.owner.personId));
    return(
      <OmsetTable 
        omset={omset}
        dofs={dofs}
        setOmsetToEdit={setOmsetIdToEdit}
        editMode={omsetIdToEdit === omset.id}
      />
    );
  };

  return(
    <div style={styles.mainDiv}>
      {activeDate ?
        <>
          <h2 style={styles.header}>{monthValueToText(activeDate.month)} {activeDate.year}</h2> 
          <h4 style={styles.header}>
            Group: {omsetsData.group ? omsetsData.group.member.find(member => member.isLeader).name: <>-</> }
          </h4>
        </>
        :
        <></>
      }
      <div style={styles.dropdownDiv}>
        {
          monthObject.length > 0 ?
          <Dropdown 
            selection
            options={monthObject}
            onChange={handleChangeMonth}
          />:
          <></>
        }
      </div>
      <AddOmsetModal style={styles.addOmsetButton} date={activeDate}/>
      <Segment style={styles.omsetDiv}>
        {omsetsData.omsetPlans.filter(plan => 
            plan.date.year === activeDate?.year 
            && plan.date.month === activeDate?.month
          ).map(omset => 
          <OmsetPlanObject
            key={omset.id}
            omset={omset}
          />
        )}
      </Segment>
    </div>
  );
};

const styles = {
  mainDiv: {
    marginTop: '3em'
  },
  dropdownDiv: {
    textAlign: 'center'
  },
  header: {
    textAlign: 'center'
  },
  omsetDiv: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  },
  addOmsetButton: {
    marginLeft: '1em'
  }
}

export default OmsetView;