import * as React from 'react';

export default ({
  i, item, boss, list, changeOrder, updateItem, orderState, carType, program, usersList, employeeList, updateOrderArriveTime, handleModal
}) => {
  const dt: Date = new Date(item['date']);
  const day: number = dt.getDate();
  const month: string = dt.getMonth() < 10 ? '0'+(dt.getMonth()+1) : String((dt.getMonth()+1));
  const year: number = dt.getFullYear();
  const h: string = dt.getUTCHours() < 10 ? '0'+dt.getUTCHours() : String(dt.getUTCHours());
  const min: string = dt.getMinutes() < 10 ? '0'+dt.getMinutes() : String(dt.getMinutes());
  let programs: Array<JSX.Element> = [];

  for(let k: number = 0; k < item['program'].length; k++) {
    if(item['program'][k]) {
      const spanElement: JSX.Element = <span className='text-nowrap' key={k}>{program[k]}</span>
      programs.push(spanElement)
    }
  }

  return (
    <tr className={
      list[i]['orderState'] > 0 ?
      (
        list[i]['orderState'] > 1 ? 'bg-success' : 'bg-danger'
      ) : 'bg-new'
    }>
      <th className='text-center' scope='row'>{i+1}</th>
      {
        boss === 0 ?
        (
          item['city'] < 2 ?
          <td className='text-center'>Nitra</td> :
          <td className='text-center'>Žilina</td>
        ) : null
      }
      <td className='text-center'>{day+'/'+month+'/'+year+' - '}<span className='badge badge-info'>{h + ':' + min}</span></td>
      <td className='text-center'>
        <select
          value={list[i]['orderState']}
          onChange={e => {
            const orders: Array<object> = list;
  
            orders[i]['orderState'] = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].value)
  
            changeOrder(orders[i])                            
            updateItem(orders[i])
          }}
        >
          {
            orderState.map((stateItem: any, j: number) => <option value={j} key={j}>{stateItem}</option>)
          }
        </select>
      </td>
      <td className='d-flex flex-column text-center'>{programs}</td>
      <td className='text-center'>{item['carType'] > 1 ? carType[1] : carType[0]}</td>
      <td className='text-center'>{item['carTypeDetail']}</td>
      <td className='text-center'>{item['fullName']}</td>
      <td className='text-center'>{item['phone']}</td>
      <td className='text-center'>
        <input
          type='time'
          id={`time-${i}`}
          name="time"
          value={item.managedTime}
          onChange={(e) => {
            const orders: Array<object> = list;
            const managedTime = e.currentTarget.value;

            if (managedTime && managedTime.length > 0) {
              orders[i]['managedTime'] = managedTime;
              updateOrderArriveTime(orders);
            }
          }}
        />
        <button
          type="button"
          className="btn btn-danger"
          onClick={(e) => {
            const orders: Array<object> = list;
            const managedTime = (e.currentTarget.previousElementSibling as HTMLInputElement).value;
            
            if (managedTime && managedTime.length > 0) {
              orders[i]['managedTime'] = managedTime;
              updateItem(orders[i]);
            }
        }}>Nastaviť</button>
      </td>
      <td>
        {
          employeeList ? (
          <select
            onChange={(e) => {
              const selectEl = e.currentTarget;
              const uId = selectEl.options[selectEl.options.selectedIndex].value;
              const orders: Array<object> = list;
  
              orders[i]['managed'] = uId;
              updateItem(orders[i])
            }}
          >
            <option value={0}>Vybrať</option>
            {
              employeeList.map((item: any, j: number) => {
                const { name, _id } = item;
  
                return (
                  <option
                    key={j}
                    value={_id}
                    selected={
                      list[i]['managed'] ? (
                        list[i]['managed'] === item._id ? true : false
                      ) : false
                    }
                  >{`${name}`}</option>
                );
              })
            }
          </select>
          ) : ""
        }
      </td>
      {/* <td className='text-center'>{item['email']}</td> */}
      <td className='text-center'>
        {
          item['message'] && item['message'] !== '' ?
          <button
            type='button'
            className='message'
            onClick={() => {
              handleModal(item['message'], true)
            }}
          >
            <span className='badge badge-info'>
              <i className='far fa-envelope' />
            </span>
          </button> : null
        }
      </td>
      <td>
        <button
          type='button'
          disabled
          className="btn btn-link"
          onClick={() => {
            // handleModal("Objednavkovy formular", true, true)
          }}
        >
          <span className='badge badge-secondary'>
            <i className='fas fa-print' />
          </span>
        </button>
      </td>
    </tr>
  );
};
