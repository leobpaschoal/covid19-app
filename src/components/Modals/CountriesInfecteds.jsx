import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CountriesInfecteds = ({ show, handleClose, infectedCountries }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>All the infected countries</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {infectedCountries.length > 0 ? infectedCountries.map((element, key) => <div key={key}>{element}</div>) : 'n con'}
    </Modal.Body>
    <Modal.Footer>
      <Button variant='secondary' onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CountriesInfecteds;
