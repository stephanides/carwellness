import * as React from 'react';
import Nav from '../Nav';
import AddProduct from './components/AddProduct';
import { Modal } from '../Modal';

const Products = ({
  handleModal, handlePDFData, getProducts, modalMessage, modalTitle, products, signOut, user
}) => {
  if (products && products.length < 1) {
    getProducts();
  }

  const submitProductCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget;
    const url = '/product/create/';
    const newproductData = {
      code: (form.querySelector('#code') as HTMLInputElement).value,
      price: (form.querySelector('#price') as HTMLInputElement).value,
      title: (form.querySelector('#title') as HTMLInputElement).value,
    };
  
    try {
      const resp: Response = await fetch(url, {
        body: JSON.stringify(newproductData),
        headers: { 
          'x-access-token': user.token,
          'content-type': 'application/json'
        },
        method: 'POST',
      });

      if (resp.status === 200) {
        await resp.json();
        getProducts();
      } else {
        const { message } = await resp.json();
        throw message;
      }
    } catch (err) {
      if (err === 'Product allready exist') {
        handleModal('Produkt/Služba už existuje!', false);
      } else {
        handleModal(err, false);
      }
      
    }
  };
  const removeProduct = async (id: string) => {
    const url = `/product/remove/${id}`;

    try {
      const resp: Response = await fetch(url, {
        headers: {
          'x-access-token': user.token,
          'content-type': 'application/json',
        },
        method: 'DELETE',
      });

      if (resp.status === 200) {
        await resp.json();
        getProducts();
      } else {
        const { message } = await resp.json();
        throw message;
      }
    } catch (err) {
      handleModal(err, false);
    }
  };

  return (
    <div className="admin-content">
      <Modal
        modalMessage={modalMessage}
        modalTitle={modalTitle}
        handlePDFData={handlePDFData}
      />
      <Nav user={user} signOut={signOut} />
      <div className="container-fluid">
        <AddProduct submitProductCreate={submitProductCreate} />
        <div className="product-table-wrapper">
          {
            products && products.length > 0 ?
            (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Názov</th>
                    <th scope="col">Kód</th>
                    <th scope="col">Cena</th>
                    {/* <th>&nbsp;</th> */}
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map(({ code, _id, price, title }, i: number) => (
                      <tr key={_id}>
                        <th scope="row">{i + 1}</th>
                        <td>{title}</td>
                        <td>{code}</td>
                        <td>{`${price} €`}</td>
                        {/* <td><button className="btn btn-primary">Upravit</button></td> */}
                        <td className="pr-4">
                          <button
                            className="btn btn-danger"
                            onClick={() => removeProduct(_id)}
                          >Odstranit</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            ) : <p className="text-center">Neboli nájdené žiadne produkty ani služby, vytvorte nejaké.</p>
          }
        </div>
      </div>
    </div>
  )
};

export default Products;
