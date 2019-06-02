import * as React from 'react'

export default ({ handleAddOrder, handleModal }) => (
    <div className="row">
      <div className="col-12 pb-3 pt-3">
        <button onClick={() => {
          console.log('CLICKED');
            handleAddOrder(true, () => {
                handleModal("", true, false);
            });
        }} className="btn btn-primary">Pridať objednávku</button>
      </div>
    </div>
);