import * as React from 'react';
import TableRow from './TableRow';
import { getMaxListeners } from 'cluster';

interface IProps {
  boss?: number
  carType?: string[]
  employeeList?: object[] | null
  list?: object[]
  page?: number
  paginationItemCount?: number
  pagesCount?: number
  program?: string[]
  orderState?: string[]
  orderList?: object[]
  usersList?: object[]
  products?: object[]
  
  handlePDFData(pdf: object, callBack?: () => void): void
  changeOrder(orders: object): void
  handleModal(message: string, success: boolean, order?: boolean): void
  updateItem(item: object, callBack?: () => void): void
  updateOrderArriveTime(orderedOrderList: Array<Object>): void
  getList(): void
}

const initialState = {
  managedOrderStartTime: [''],
};

export default ({
  boss, carType, list, program, changeOrder, updateItem, orderState,
  getList,
  usersList, employeeList, updateOrderArriveTime, handleModal, handlePDFData,
  products,
}: IProps) => {  
  // const [managedOrderStartTime, timeChange] = useState(initialState.managedOrderStartTime);

  return (
    <table className='table'>
      <caption>
        Zoznam objednávok:
        <span className='bg-new font-weight-bold'>NOVÁ</span>
        <span className='bg-danger font-weight-bold'>ZRUŠENÁ</span>
        <span className='bg-success font-weight-bold'>VYBAVENÁ</span>
      </caption>
      <thead>
        <tr>
          <th className='text-center'>#</th>
          {
            boss === 0 ? <th className='text-center'>Prevádzka</th> : null
          }
          <th className='text-center' scope='col'>Termín</th>
          <th className='text-center' scope='col'>Stav Objednávky</th>
          <th className='text-center' scope='col'>Program</th>
          <th className='text-center' scope='col'>Typ auta</th>
          <th className='text-center' scope='col'>ŠPZ</th>
          <th className='text-center' scope='col'>Meno</th>
          <th className='text-center' scope='col'>Telefón</th>
          {/* <th className='text-center' scope='col'>E-mail</th> */}
          <th className='text-center' scope='col'>Príchod</th>
          <th className='text-center' scope='col'>Vybavuje</th>
          <th>Info</th>
          <th>Objednávka</th>
          <th className="text-center" scope="col">Dopln. produkty/služby</th>
        </tr>
      </thead>
      <tbody>
        {
          list ?
          (
            list.length > 0 ? list.map((item, i) => (
              <TableRow
                i={i}
                item={item}
                changeOrder={changeOrder}
                updateItem={updateItem}
                boss={boss}
                carType={carType}
                list={list}
                program={program}
                orderState={orderState}
                usersList={usersList}
                employeeList={employeeList}
                key={i}
                updateOrderArriveTime={updateOrderArriveTime}
                handleModal={handleModal}
                handlePDFData={handlePDFData}
                products={products}
                getList={getList}
              />
            )) : (
            <tr>
              <td colSpan={12}>
                <h6 className='text-center'>Neboli nájdené žiadne objednávky</h6>
              </td>
            </tr>
            )
          ) : (
          <tr>
            <td colSpan={12}>
              <h6 className='text-center'>Neboli nájdené žiadne objednávky</h6>
            </td>
          </tr>
          )
        }
      </tbody>
    </table>
  );
};
