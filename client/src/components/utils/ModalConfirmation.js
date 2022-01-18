import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


function ModalConfirmation(props) {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button className="drawn-button" onClick={openModal}>{props.introButtonMessage}</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Delete modal"
                ariaHideApp={false}
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{props.queryMessage} {props.item.name}?</h2>

                <button className="drawn-button" onClick={closeModal}>close</button>


                
                <button className="drawn-button" onClick={() => props.delete(props.item._id)}>{props.confirmButtonMessage}</button>

            </Modal>
        </div>
    );
}

export default ModalConfirmation