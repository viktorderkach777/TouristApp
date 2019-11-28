import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';

export default class MyModal extends Component {
    state = {
        style: null,
        myModalHeader: null,
        modalType: null,
        classNameType: 'modal-sm'
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.modalType === 'danger') {
            this.setState({
                myModalHeader: 'Помилка!',
                style: { backgroundColor: "rgb(248, 108, 107)" }
            });
        }
        else if (nextProps.modalType === 'success') {
            this.setState({
                myModalHeader: 'Операція успішна!',
                style: { backgroundColor: "rgb(77, 189, 116)" }
            });
        }
        else if (nextProps.modalType === 'warning') {
            this.setState({
                myModalHeader: 'Увага!',
                style: { backgroundColor: "rgb(255, 193, 7)" }
            });
        }
        else if (nextProps.modalType === 'info') {
            this.setState({
                myModalHeader: 'Додаткова інформація:',
                style: { backgroundColor: "rgb(99, 194, 222)" }
            });
        }
        this.setState({
            isModalOpen: nextProps.isModalOpen,
            toggle: nextProps.toggle,
            modalText: nextProps.modalText
        });
    }
    render() {
        const { isModalOpen, toggle, classNameType, modalText } = this.state;

        return (
            <Modal isOpen={isModalOpen} toggle={toggle}
                className={classNameType + ' ' + this.props.className}>
                <ModalHeader toggle={toggle} style={this.state.style}>
                    {this.state.myModalHeader}
                </ModalHeader>
                <ModalBody>
                    {modalText}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Закрити</Button>
                </ModalFooter>
            </Modal>
        )
    }
}