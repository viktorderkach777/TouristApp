import React,{Fragment } from 'react';
import PropTypes from 'prop-types';
//import './modal.css';
//import { Button } from "react-bootstrap";
//import { NavLink } from 'reactstrap';
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalWindow = ({
  title, isOpen, onCancel, onSubmit, children,
}) => {

  return (
    <Fragment>
       { isOpen &&
             <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
          <h5
            className="modal-title"
          >{title}</h5>
          <button type="button" className="close" aria-label="Close" onClick={onCancel}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
               {children}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Close</button>
          <button type="button" className="btn btn-primary" onClick={onSubmit}>Ok</button>
        </div>
      </div>
      </div> 
       }
    </Fragment>
  );
};

ModalWindow.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

ModalWindow.defaultProps = {
  title: 'Modal title',
  isOpen: false,
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
};

export default ModalWindow;
/*

  <div>
          <div className="modal fade" ref={modal=> this.modal = modal} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">{title}
                          </h5>
                          <button type="button" className="close" data- dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                      {children}
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data- dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary">Save changes</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>

 <div className="modalOverlay">
            <div className="modalWindow">
              <div className="modalHeader">
                <div className="modalTitle">{title}</div>
                <NavLink name="times" onClick={onCancel} />
              </div>
              <div className="modalBody">
                {children}
              </div>
              <div className="modalFooter">
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onSubmit}>Submit</Button>
              </div>
            </div>
          </div>

*/