import React, { Component } from 'react';
import { Button, Modal as RModal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Modal extends Component {
    constructor(props) {
      super(props);

      this.renderFooter = this.renderFooter.bind(this);
    }  
    
    renderFooter() {
      if (!this.props.modalFooter)
        return;

      return(
          <div>
              <ModalFooter>
                {this.props.modalFooter}
              </ModalFooter>
          </div>
      );
    }

    render() {
        return (
            <div>
                <RModal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.props.toggle}>{this.props.modalHeader}</ModalHeader>
                  <ModalBody>
                    {this.props.modalBody}
                  </ModalBody>
                  {this.renderFooter()}
                </RModal>
            </div>
        );
    }
}

export default Modal;