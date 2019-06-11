import * as React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFGenerator from './components/PDFGenerator';
import { IUserPayLoad } from '../../interfaces/UserPayLoad.interface'

interface IProps {
  user?: IUserPayLoad
  addOrder?: boolean
  modalMessage?: string | JSX.Element
  modalTitle?: string
  modalOrder?: boolean
  pdfData?: object

  handlePDFData?(pdf: object, callBack?: () => void): void
  handleAddOrder?(addOrder: boolean): void
  handleSubmitOrder?(e: React.FormEvent<HTMLElement>): Promise<void>
}
interface IState {
  noteValue: string
}

const initialState: IState = {
  noteValue: '',
};

export class Modal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = initialState;

    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  private handleNoteChange(note: string) {
    this.setState({ noteValue: note });
  }

  private submitForm = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const note = form.note.value || 'undefined';
    const newPDFData: any = this.props.pdfData;

    newPDFData.note = note;

    this.props.handlePDFData(newPDFData);
  };

  render() {
    const { addOrder, modalMessage, modalOrder, modalTitle, pdfData, user, handleSubmitOrder } = this.props;
    const { noteValue } = this.state;

    /* const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form: HTMLFormElement = e.currentTarget;
      const name = (form.name as any).value;
      const carType = parseInt((form.typVozidla as any).value);
      const car = (form.vozidlo as any).value;
      const spz = (form.spz as any).value;
      const message = (form.message as any).value;
      const telefon = (form.telefon as any).value;
      const time = new Date().toISOString();
      const city = form.city ? parseInt((form.city as any).value) : undefined;
      const programs = form.querySelector('#program').querySelectorAll('input[type=checkbox]');
      let programArr = [];

      let k = 0;

      while (k < programs.length) {
        if ((programs[k] as any).checked) {
          programArr.push("true");
        } else {
          programArr.push("false");
        }
        k++;
      }
      const newOrderData = {
        car: car,
        carType: carType,
        carTypeDetail: spz, 
        city: city || user.city, 
        fullName: name,
        message: message,
        orderState: 0,
        phone: telefon,
        program: programArr,
        date: time,
      };

      const url = '/order/order-create';

      try {
        const resp: Response = await fetch(url, {
          body: JSON.stringify(newOrderData),
          headers: { 
            'x-access-token': user.token,
            'content-type': 'application/json'
        },
          method: 'POST',
        });

        const respJSON = await resp.json();
        console.log(respJSON);
      } catch (err) {
        console.log(err);
      }

      console.log('SUBMIT NEW ORDER');
      console.log(newOrderData);
    }; */
    
    return (
      modalOrder ? (
        <div className='modal' id='modal' role='dialog'>
          <div className="modal-dialog" role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Objednávka</h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                {
                  (pdfData as any).note ? (
                    <PDFViewer width='100%' height='350'>
                      <PDFGenerator pdfData={pdfData} />
                    </PDFViewer>
                  ) : (
                    <form onSubmit={this.submitForm}>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="note"
                          name="note"
                          rows={3}
                          placeholder="Sem napíšte poznámky k objednávke."
                          onChange={(e) => this.handleNoteChange(e.currentTarget.value)}
                        />
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <button type="submit" className={`btn ${noteValue.length < 1 ? 'btn-secondary' : 'btn-primary'}`}>
                            {
                              noteValue.length < 1 ?
                              'Pokračovať bez poznámky' : 'Pridať poznámku'
                            }
                          </button>
                        </div>
                      </div>
                    </form>
                  )
                }
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        modalMessage ? (
          <div className='modal' id='modal' role='dialog'>
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>{modalTitle}</h5>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  <p>{modalMessage}</p>
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          addOrder ? (
            <div className='modal' id='modal' role='dialog'>
              <div className="modal-dialog" role='document'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title'>Pridať objednávku</h5>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-label='Close'
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <form onSubmit={handleSubmitOrder}>
                      <div className="form-group">
                        <label htmlFor="name">Meno a priezvisko</label>
                        <input type="text" name="name" id="name" className="form-control" />
                      </div>
                      {
                         !user.city && <div className="form-group">
                         <label htmlFor="city">Zvoľte mesto</label>
                         <select className="form-control" id="city" name="city">
                         <option value={1}>Nitra</option>
                         <option value={2}>Zilina</option>
                         </select>
                         </div>
                      }
                      <div className="form-group">
                        <label htmlFor="typVozidla">Typ Vozidla</label>
                        <select id="typVozidla" className="form-control">
                          <option value={1}>Auto KLASIK</option>
                          <option value={2}>Auto SUV</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="vozidlo">Vozidlo</label>
                        <input type="text" id="vozidlo" className="form-control" placeholder="Napr. Škoda Oktávia"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="spz">Zadajte ŠPZ</label>
                        <input type="text" name="spz" id="spz" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="telefon">Zadajte Telefónne číslo</label>
                        <input type="text" name="telefon" id="telefon" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="message">Zadajte poznámku (nepovinné)</label>
                        <textarea className="form-control" id="message" rows={3} ></textarea>
                      </div>
                      <div id="program" className="row pl-4 pr-4">
                        <p className="w-100">Vyberte program</p>
                        <div className="form-check col-6">
                          <input className="form-check-input" type="checkbox" value="" id="comfort" />
                          <label className="form-check-label" htmlFor="comfort">
                            COMFORT
                          </label>
                        </div>
                        <div className="form-check col-6">
                          <input className="form-check-input" type="checkbox" value="" id="exclusive" />
                          <label className="form-check-label" htmlFor="exclusive">
                            EXCLUSIVE
                          </label>
                        </div>
                        <div className="form-check col-6">
                          <input className="form-check-input" type="checkbox" value="" id="exterier" />
                          <label className="form-check-label" htmlFor="exterier">
                            EXTERIÉR
                          </label>
                        </div>
                        <div className="form-check col-6">
                          <input className="form-check-input" type="checkbox" value="" id="interier" />
                          <label className="form-check-label" htmlFor="interier">
                            INTERIÉR
                          </label>
                        </div>
                        <div className="form-check col-6">
                          <input className="form-check-input" type="checkbox" value="" id="premiumExterier" />
                          <label className="form-check-label" htmlFor="premiumExterier">
                            PREMIUM EXTERIÉR
                          </label>
                        </div>
                        <div className="form-check col-6">
                          <input className="form-check-input" type="checkbox" value="" id="premiumInterier" />
                          <label className="form-check-label" htmlFor="premiumInterier">
                            PREMIUM INTERIÉR
                          </label>
                        </div>
                        <div className="form-check col-6">
                          <input className="form-check-input" type="checkbox" value="" id="avangarde" />
                          <label className="form-check-label" htmlFor="avangarde">
                            AVANGARDE
                          </label>
                        </div>
                        <div className="form-check col-6">
                          <input className="form-check-input" type="checkbox" value="" id="topGlanz" />
                          <label className="form-check-label" htmlFor="topGlanz">
                            TOP GLANZ
                          </label>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary mt-2">Odoslať</button>
                    </form>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )
      )
    );
  }
};
