import { FC, ReactElement } from 'react';

import './style.css';

const Loader: FC = (): ReactElement => {
  return (
    <div className="loading-container">
      <div className="loader" />
    </div>
  );
};

export default Loader;
