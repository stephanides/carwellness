import * as React from 'react';

export default ({ employeeList, cityType, handleChangeCityType, handleRemoveEmployee }) => (
  <div>
    <div className="row">
      <div className="form-group col-4">
        <select
          id="cityFilter"
          className="form-control"
          onChange={(e) => {
            const newCityType = parseInt(e.currentTarget.value);
            handleChangeCityType(newCityType);
          }}
          defaultValue={cityType}
        >
          <option value="0">Všetci zamestnanci</option>
          <option value="1">Nitra</option>
          <option value="2">Žilina</option>
        </select>
      </div>
    </div>
    <div className="row">
      <div className="col-6">
        <div className='list-group mb-2' key={1}>
          <div className='list-group-item list-group-item-primary'>
            <div className="row">
              <div className="col-4 d-flex align-items-center">Meno zamestnanca</div>
              <div className="col-4 d-flex justify-content-center align-items-center">Prevádzka</div>
              <div className="col-4"></div>
            </div>
          </div>
          {
            employeeList && employeeList.length > 0 ?
            (
              cityType === 0 ?
              (
                employeeList.map((item: any, i: number) => {
                  return (
                    <div className="list-group-item" key={i}>
                      <div className="row">
                        <div className="col-4 d-flex align-items-center">{item.name}</div>
                        <div className="col-4 d-flex justify-content-center align-items-center">{item.city < 2 ? 'Nitra' : 'Žilina'}</div>
                        <div className="col-4 d-flex justify-content-end align-items-center">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              handleRemoveEmployee(item._id);
                            }}
                          >Odstrániť</button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                employeeList.filter((item: any) => (item.city === cityType)).map((item: any, i: number) => {
                  return (
                    <div className="list-group-item" key={i}>
                      <div className="row">
                        <div className="col-4 d-flex align-items-center">{item.name}</div>
                        <div className="col-4 d-flex justify-content-center align-items-center">{item.city < 2 ? 'Nitra' : 'Žilina'}</div>
                        <div className="col-4 d-flex justify-content-end align-items-center">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              handleRemoveEmployee(item._id);
                            }}
                          >Odstrániť</button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              <div className="row">
                <div className="col">
                  <h6 className='text-center'>Neboli nájdení žiadni užívatelia</h6>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  </div>
);
