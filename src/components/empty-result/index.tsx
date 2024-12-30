import { FC, ReactElement } from 'react';

import './style.css';

type EmptyResultProps = { message: string };

const EmptyResult: FC<EmptyResultProps> = ({ message }): ReactElement => (
  <div className="empty-result-container">
    <p className="empty-result-text">{message}</p>
  </div>
);

export default EmptyResult;
