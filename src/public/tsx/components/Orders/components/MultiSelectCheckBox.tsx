import * as React from 'react';

interface IProps {
  itemNum: number
  orders: object[]
  products: IProduct[]
  updateItem(order: object, callBack?: () => void): Promise<void>
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

class MultiSelectCheckBox extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectOpened: false,
      selectedProducts: [],
    };

    this.handleSelectOpen = this.handleSelectOpen.bind(this);
    this.handleWatchClick = this.handleWatchClick.bind(this);
  }

  handlePopulateSelectdProducts() {
    const { itemNum, orders, products } = this.props;
    const order = orders[itemNum];
    let arr: object[] = [];

    if ((order as any).products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        let state = {
          _id: products[i]._id,
          checked: false,
        };

        if ((order as any).products[i] && (order as any).products[i]._id === products[i]._id) {
          state = {
            _id: products[i]._id,
            checked: true,
          };
        }

        arr.push(state);
      }
    } else {
      for (let i = 0; i < products.length; i++) {
        arr.push({
          _id: products[i]._id,
          checked: false,
        });
      }
    }
    

    this.setState({ selectedProducts: arr });
  }

  handleSelectOpen() {
    const { selectOpened } = this.state;
    this.setState({selectOpened: !selectOpened });
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
    this.handlePopulateSelectdProducts();
  }

  render() {
    const { itemNum, orders, products, updateItem } = this.props;
    const { selectOpened } = this.state;

    return (
      <div className="multi-select-checkbox-wrapper">
        <button
          onClick={this.handleSelectOpen}
        >Vybrať {selectOpened ? '▲' : '▼'}</button>
        <ul className={`multi-select-checkbox ${selectOpened ? 'open' : ''}`}>
          {
            (products && products.length > 0) && products.map(({ _id, code, price, title }, k: number) => {
              // (orders[itemNum] as any)
              return (
                <li key={_id} className="multi-select-checkbox-item">
                  <input
                    type="checkbox"
                    id={`prod-${_id}`}
                    onChange={() => {
                      const { selectedProducts } = this.state;
                      const orderToUpdate = orders[itemNum];
                      const product = { _id, code, price, title };

                      const checkedProdut = selectedProducts.filter(item => (item as any)._id === _id).pop();
                      const { checked } = checkedProdut;
                      console.log(checked);
  
                      if ((orderToUpdate as any).products) {
                        (orderToUpdate as any).products.push(product);
                      } else {
                        (orderToUpdate as any).products = [product];
                      }

                      updateItem(orderToUpdate);
                    }}
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
