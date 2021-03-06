import * as React from 'react';

export default ({ createEmployee }) => {
  const submitForm = (e) => {
    e.preventDefault();
  
    const form = e.currentTarget;
    const name = form.name.value;
    const city = parseInt(form.city.value);
    const newEmployee = { name, city };

    if (city > 0) {
      form.city.setCustomValidity('');
      createEmployee(newEmployee);
    } else {
      form.city.setCustomValidity('Vyberte prevádzku!');
      form.city.reportValidity();
    }
  };

  return (
    <div className="mb-4">
      <h3 className="mb-2">Zamestnanci</h3>
      <form className="form-inline" onSubmit={submitForm}>
        <div className="form-group mr-2">
          <input type="text" className="form-control" id="name" name="name" placeholder="Meno a priezvisko zamestnanca" required />
        </div>
        <div className="form-group mr-2">
          <select className="form-control" id="city" name="city">
            <option value="0">Vybrať prevádzku</option>
            <option value="1">Nitra</option>
            <option value="2">Žilina</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Vytvoriť používateľa</button>
      </form>
    </div>
  );
};
