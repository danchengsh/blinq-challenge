import { useState } from 'react';
import Modal from 'react-modal';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import './homepage.styles.css';

const defaultFormFields = {
  fullName: '',
  email: '',
  confirmEmail: ''
};

const Homepage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { fullName, email, confirmEmail } = formFields;
    const [requestFetching, setRequestFetching] = useState(false);
    const [requestSuccessful, setRequestSuccessful] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
    };

    const openModal = () => setIsPopupOpen(true);
    const closeModal = () => setIsPopupOpen(false);
    const customModalStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '400px',
        height: '400px',
        transform: 'translate(-50%, -50%)',
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (email !== confirmEmail) {
        alert('emails do not match');
        return;
      }

      try {
        setRequestFetching(true);
        const response = await fetch('https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "name": fullName, "email": email })
        });

        if (response.status === 200) {
          setRequestSuccessful(true);
        } else if (response.status === 400) {
          const responseText = await response.text();
          const responseTextJSON = JSON.parse(responseText);
          setErrorMessage(responseTextJSON.errorMessage);
        }
        setRequestFetching(false);
      } catch(error) {
        console.log(error);
      }
  };

    return (
      <div className="homepage-container" id="homepage">
        <div className="homepage-content-container">
          {requestSuccessful ? (
            <Modal
              isOpen={isPopupOpen}
              onRequestClose={closeModal}
              style={customModalStyles}
              overlayClassName="modal-overlay"
              ariaHideApp={false}
              contentLabel="Request an invite">
              <div>All done!</div>
              <hr />
              <div>You will be one of the first to experience Broccoli & Co. when we launch.</div>
              <Button type="button" onClick={closeModal}>OK</Button>
            </Modal>
          ) : (
            <Modal
              isOpen={isPopupOpen}
              onRequestClose={closeModal}
              style={customModalStyles}
              overlayClassName="modal-overlay"
              ariaHideApp={false}
              contentLabel="Request an invite">
              <div>Request an invite</div>
              <hr />
              <form onSubmit={handleSubmit}>
                <FormInput type="text" pattern="[A-Za-z]{3,}" onChange={handleChange} placeholder="Full name" name="fullName" value={fullName} />
                <FormInput type="email" onChange={handleChange} placeholder="Email" name="email" value={email} />
                <FormInput type="email" onChange={handleChange} placeholder="Confirm email" name="confirmEmail" value={confirmEmail} />
                <Button type="submit">{requestFetching ? 'Sending, please wait...': 'Send'}</Button>
              </form>
              <div>{errorMessage}</div>
            </Modal>
          )}
          <div className="title">A better way to enjoy every day.</div>
          <div className="subtitle">Be the first to know when we launch.</div>
          <Button type="button" onClick={openModal}>Request an invite</Button>
        </div>
      </div>
    );
};

export default Homepage;
