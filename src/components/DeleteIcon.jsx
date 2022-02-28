import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

const DeleteIcon = ({ name, defaultStyle, onHoverStyle, style, ...rest }) => {
  const [mouseHover, setMouseHover] = useState(false);
  return(
    <Icon
      name={name || 'delete'} 
      onMouseEnter={() => setMouseHover(true)} 
      onMouseLeave={() => setMouseHover(false)} 
      {...rest}
      style={
        mouseHover ? 
        { 
          ...defaultStyle || styles.default,
          ...onHoverStyle || styles.defaultOnHover, 
          ...style 
        }: { 
          ...defaultStyle || styles.default, 
          ...style
        }}
    />
  );
};

const styles = {
  default: {
    float: 'right',
    cursor: 'pointer',
    color: '#e21c08'
  },
  defaultOnHover: {
    color: '#ff0000'
  }
}

export default DeleteIcon;