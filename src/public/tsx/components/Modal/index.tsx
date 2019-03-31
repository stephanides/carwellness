import * as React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFGenerator from './components/PDFGenerator';

interface IProps {
  modalMessage?: string | JSX.Element
  modalTitle?: string
  modalOrder?: boolean
  pdfData?: object

  handlePDFData(pdf: object, callBack?: () => void): void
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
    const { modalMessage, modalTitle, pdfData } = this.props;
    const { noteValue } = this.state;
    
    return (
      this.props.modalOrder ? (
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
        ) : null
      )
    );
  }
};
