import React, {Fragment} from 'react';
import './style.scss'

const BaseButton = ({text, selected, onClick}) => {
  return (
    <Fragment>
      <button
        className={`s-btn base-button ${
          selected === text ? 'is-active' : ''
        }`}
        style={{margin: '0'}}
        onClick={onClick}
      >
        {text}
      </button>
    </Fragment>
  );
};

export default BaseButton;
