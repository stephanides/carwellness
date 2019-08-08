import * as React from 'react';

const AddProduct = ({ submitProductCreate }) => (
  <div>
    <h3 className="mb-3">Správa produktov a služieb</h3>
    <form className="form-inline mb-2" onSubmit={submitProductCreate}>
      <div className="form-group mb-2 mr-2">
        <input type="text" className="form-control" id="title" placeholder="Názov produktu/služby" required />
      </div>
      <div className="form-group mb-2 mr-2">
        <input type="text" className="form-control" id="code" placeholder="Kód produktu/služby" required />
      </div>
      <div className="form-group mb-2 mr-2">
        <input type="number" className="form-control" id="price" step="0.01" placeholder="Cena produktu/služby" required />
      </div>
      <button type="submit" className="btn btn-primary mb-2">Vytvoriť</button>
    </form>
  </div>
);

export default AddProduct;
