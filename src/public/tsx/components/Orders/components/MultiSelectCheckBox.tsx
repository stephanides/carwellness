import * as React from 'react';

interface IProps {
  itemNum: number
  orders: object[]
  products: IProduct[]
  updateItem(order: object, callBack?: () => void): Promise<void>
  getList(): void
}
interface IState {
  selectOpened: boolean
  selectedProducts: object[]
}
interface IProduct {
  _id: string
  code: number
  price: number
  title: string
}
interface ICheckedProduct {
  _id: string
  checked: boolean
}

class MultiSelectCheckBox extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectOpened: false,
      selectedProducts: [],
    };

    this.handleSelectOpen = this.handleSelectOpen.bind(this);
    this.handleWatchClick = this.handleWatchClick.bind(this);
    // this.handlePopulateSelectdProducts = this.handlePopulateSelectdProducts.bind(this);
  }

  /* handlePopulateSelectdProducts() {
    const { itemNum, orders, products } = this.props;
    const order = orders[itemNum];
    const orderProducts = (order as any).products;
    let arr: ICheckedProduct[] = [];

    console.log(order);
    
    if (orderProducts.length > 0) {
      console.log('Order has products from DB');
      let i = 0;

      while (i < products.length) {
        let j = 0;
        const productObject = {
          _id: products[i]._id,
          checked: false,
        };

        while(j < orderProducts.length) {
          const checked = orderProducts.filter(item => item._id === products[i]._id).pop() && true;

          if (checked) {
            productObject.checked = true;
            break;
          }

          j += 1;
        }
        console.log(productObject);
        arr.push(productObject);

        i += 1;
      }
    } else {
      console.log('Order has no products in DB');
      for (let i = 0; i < products.length; i++) {
        arr.push({
          _id: products[i]._id,
          checked: false,
        });
      }
    }
    
    // console.log(arr);

    this.setState({ selectedProducts: arr }, () => {
      console.log(this.state.selectedProducts);
    });
  } */

  /* handleUpdateSelectedProducts(array: object[], callback?: () => void) {
    this.setState({ selectedProducts: array }, () => {
      if (typeof callback === 'function') {
        callback();
      }
    });
  } */

  handleSelectOpen() {
    const { selectOpened } = this.state;
    this.setState({selectOpened: !selectOpened });
    // console.log(this.state.selectedProducts);
  }

  handleWatchClick(e: Event) {
    const parent = (e.target as any).parentElement.className;
    const { selectOpened } = this.state;

    if (parent.indexOf('multi-select-checkbox') < 0 && selectOpened) {
      this.setState({ selectOpened: false });
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleWatchClick);
    // this.handlePopulateSelectdProducts();
  }

  render() {
    const { itemNum, getList, orders, products, updateItem } = this.props;
    const { selectOpened } = this.state;

    return (
      <div className="multi-select-checkbox-wrapper">
        <button
          onClick={this.handleSelectOpen}
        >Vybrať {selectOpened ? '▲' : '▼'}</button>
        <ul className={`multi-select-checkbox ${selectOpened ? 'open' : ''}`}>
          {
            (products && products.length > 0) && products.map(({ _id, code, price, title }, k: number) => {
              const orderItem: any = orders[itemNum];
              const checked = orderItem.products.filter(item => item._id === _id).pop() ? true : false;
              return (
                <li key={_id} className="multi-select-checkbox-item">
                  <input
                    type="checkbox"
                    id={`prod-${_id}`}
                    onChange={(e) => {
                      const orderToUpdate = orders[itemNum];
                      const product = { _id, code, price, title };
                      
                      if ((orderToUpdate as any).products) {
                        const productExist = (orderToUpdate as any).products.filter(item => item._id === _id).pop();

                        if(productExist) {
                          for (let i = 0; i < (orderToUpdate as any).products.length; i++) {
                            if((orderToUpdate as any).products[i]._id === productExist._id) {
                              (orderToUpdate as any).products.splice(i, 1);
                            }
                          }
                        } else {
                          (orderToUpdate as any).products.push(product);
                        }
                      } else {
                        (orderToUpdate as any).products = [product];
                      }

                      updateItem(orderToUpdate, getList);
                    }}
                    checked={checked}
                  />
                  <label htmlFor={`prod-${_id}`}>{title}</label>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleWatchClick);
  }
};

export default MultiSelectCheckBox;
