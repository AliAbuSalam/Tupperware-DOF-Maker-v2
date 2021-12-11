import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

const DeleteIcon = (props) => {
  const [mouseHover, setMouseHover] = useState(false);
  return(
    <Icon
      name='delete' 
      onMouseEnter={() => setMouseHover(true)} 
      onMouseLeave={() => setMouseHover(false)} 
      {...props}
      style={mouseHover ? { ...styles.deleteIcon, ...styles.deleteIconOnHover, ...props.style }: { ...styles.deleteIcon, ...props.style}}
    />
  );
};

const styles = {
  deleteIcon: {
    float: 'right',
    cursor: 'pointer',
    color: '#e21c08'
  },
  deleteIconOnHover: {
    color: '#ff0000'
  }
}

export default DeleteIcon;