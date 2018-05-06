import * as React from 'react'

interface Props {
  modalMessage: string
  modalTitle: string
}

export class Modal extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  //Modal footer if success action should execute
  //<button type='button' className='btn btn-primary'>Save changes</button>

  render() {
    return(
      <div className='modal' id='modal' role='dialog'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{this.props.modalTitle}</h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <p>{this.props.modalMessage}</p>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
