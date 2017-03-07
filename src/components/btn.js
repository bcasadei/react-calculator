import React from 'react';

const Btn = ({value, type, onBtnInput, btnClass}) => {

  return (
    <div className={btnClass} onClick={() => onBtnInput(value, type)}>
      {value}
    </div>
  );
};

Btn.defaultProps = {
  btnClass: "btn",
  type: "number"
}

export default Btn;
