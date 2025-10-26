
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <ClipLoader size={50} color="#007BFF" />
    </div>
  );
};

export default Loader;
