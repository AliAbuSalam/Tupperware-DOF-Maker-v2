import React, { useEffect } from 'react';

import OmsetDateInput from './OmsetDateInput';

const OmsetPage = () => {
  useEffect(() => {
    console.log('omsetPage');
  }, []);
  return(
    <div>
      <OmsetDateInput />
    </div>
  );
};

export default OmsetPage;