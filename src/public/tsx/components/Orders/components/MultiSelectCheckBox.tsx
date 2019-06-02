import * as React from 'react';

interface IProps {
  itemNum: number
  orders: object[]
  products: IProduct[]
  updateItem(order: object, callBack?: () => void): Promise<void>
}
interface IState {
  selectOpened: boolean
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
    };

    this.handleSelectOpen = this.handleSelectOpen.bind(this);
    this.handleWatchClick = this.handleWatchClick.bind(this);
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
  }

  render() {
    const { itemNum, orders, products, updateItem } = this.props;
    const { selectOpened } = this.state;

    return (
      <div className="multi-select-checkbox-wrapper">
        <button
          onClick={this.handleSelectOpen}
          className=""
        >Vybrať {selectOpened ? '▲' : '▼'}</button>
        <ul className={`multi-select-checkbox ${selectOpened ? 'open' : ''}`}>
          {
            (products && products.length > 0) && products.map(({ _id, code, price, title }, k: number) => {
              (orders[itemNum] as any)
              
              return (
                <li key={_id} className="multi-select-checkbox-item">
                  <input
                    type="checkbox"
                    id={`prod-${_id}`}
                    onChange={() => {
                      const orderToUpdate = orders[itemNum];
                      const product = { _id, code, price, title };
  
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
