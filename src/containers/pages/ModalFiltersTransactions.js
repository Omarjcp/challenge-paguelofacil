import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import { dictionaryStatus } from './DataListView';

const ModalFiltersTransactions = ({
  modalOpen,
  toggleModal,
  form,
  setForm,
  onSubmitFilter,
}) => {
  const valueForm = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>Filters</ModalHeader>
      <ModalBody>
        <Label>Date</Label>
        <Input type="date" name="dateTms" onChange={valueForm} />
        <Label className="mt-4">Operation Code</Label>
        <Input
          type="text"
          placeholder="Ex: SANDBOX_VPOS-Z0PIYAUTXF"
          name="codOper"
          onChange={valueForm}
        />
        <Label className="mt-4">Status</Label>
        <Input name="status" type="select" onChange={valueForm}>
          <option value="">All</option>
          {Object.values(dictionaryStatus).map((status, i) => (
            <option key={status.color} value={i}>
              {status.status}
            </option>
          ))}
        </Input>
        <Label className="mt-4">Email</Label>
        <Input
          type="text"
          placeholder="example@ex.com"
          name="email"
          onChange={valueForm}
        />
        <Label className="mt-4">Amount $</Label>
        <Input
          type="number"
          placeholder="min"
          name="amountMin"
          onChange={valueForm}
        />
        <Input
          type="number"
          placeholder="max"
          name="amountMax"
          onChange={valueForm}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={(e) => {
            toggleModal();
            onSubmitFilter(e);
          }}
        >
          Submit
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
};

export default ModalFiltersTransactions;
