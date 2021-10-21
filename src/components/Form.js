import React, { useState, useEffect } from "react";

import { useGlobalContext } from "../context/context";

const Form = () => {
  const {
    handleSubmit,
    alertMessageForEmpty,
    isEditing,
    editingValue,
    editingAmount,
    editItemId,
  } = useGlobalContext();

  const [value, setValue] = useState("");
  const [amount, setAmount] = useState("");

  const inpValues = {
    value,
    amount,
    id: editItemId,
  };
  const sendValue = () => {
    if (!value || !amount) {
      alertMessageForEmpty();
      return;
    } else {
      handleSubmit(inpValues);
      setValue("");
      setAmount("");
    }
  };

  useEffect(() => {
    if (isEditing) {
      setValue(editingValue);
      setAmount(editingAmount);
    }
  }, [isEditing]);

  return (
    <>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="expense">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="e.g. rent"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="e.g. 100"
            value={amount}
            min="1"
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
        </div>
      </div>
      <button className="btn" onClick={sendValue}>
        {isEditing ? "Edit" : "Submit"}
      </button>
    </>
  );
};

export default Form;
