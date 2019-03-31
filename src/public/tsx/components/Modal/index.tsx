import * as React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFGenerator from './components/PDFGenerator';

interface IProps {
  modalMessage?: string | JSX.Element
  modalTitle?: string
  modalOrder?: boolean
}

export const Modal: Function = (props: IProps) => {
  return (
    props.modalOrder ? (
      <div className='modal' id='modal' role='dialog'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Objednávka</h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              {
                /* <PDFViewer>
                  <PDFGenerator />
                </PDFViewer> */
              }
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className='modal' id='modal' role='dialog'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{props.modalTitle}</h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <p>{props.modalMessage}</p>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
