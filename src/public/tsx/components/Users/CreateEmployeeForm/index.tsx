import * as React from 'react';

export default ({ createEmployee }) => {
  const submitForm = (e) => {
    e.preventDefault();
  
    const form = e.currentTarget;
    const name = form.name.value;
    const city = parseInt(form.city.value);
    const newEmployee = { name, city };

    createEmployee(newEmployee);
  };

  return (
    <div className="mb-4">
      <h3>Zamestnanci</h3>
      <form className="form-inline" onSubmit={submitForm}>
        <div className="form-group mr-2">
          <input type="text" className="form-control" id="name" name="name" placeholder="Meno zamestnanca" />
        </div>
        <div className="form-group mr-2">
          <select className="form-control" id="city" name="city">
            <option value="0">Vybrať</option>
            <option value="1">Nitra</option>
            <option value="2">Žilina</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Vytvoriť používateľa</button>
      </form>
    </div>
  );
};
