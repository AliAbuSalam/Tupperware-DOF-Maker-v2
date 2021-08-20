import React, { useEffect, useState, useRef } from 'react';

import AddModal from './AddModal';

const ActionButtons = ({ dofs }) => {
  const [fixedPosition, setFixedPosition] = useState(false);
  const containerContext = useRef();
  const placeholderDiv = useRef();

  useEffect(() => {
    const initialContainerTopValue = containerContext.current.getBoundingClientRect().bottom;
    console.log({ initialContainerTopValue });
    const handleScroll = () => {
      if(window.scrollY > initialContainerTopValue){
        setFixedPosition(true);
      } else {
        setFixedPosition(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return(
    <>
      <div style={!fixedPosition ? styles.container : { ...styles.container, ...styles.containerFixed }} ref={containerContext}>
        <AddModal dofs={dofs}/>
      </div>
      {
        fixedPosition
        ? <div style={{ height: '56px' }} ref={placeholderDiv}></div>
        : <></>
      }
    </>
  );
};

const styles = {
  container: {
    padding: '10px',
    background: 'white',
    width: '100%'
  },
  containerFixed: {
    position: 'fixed',
    top: 0,
    zIndex: 1
  }
}

export default ActionButtons;