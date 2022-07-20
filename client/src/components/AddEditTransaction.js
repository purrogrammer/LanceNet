import React, { useState } from "react";
import { Form, Input, message, Modal, Select } from "antd";
import Spinner from "./Spinner";
import axios from "axios";

function AddEditTransaction({
  setShowAddEditTransactionModal,
  showAddEditTransactionModal,
  selectedItemForEdit,
  setSelectedItemForEdit,
  getTransactions,
}) {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("lance-net-user"));
      setLoading(true);
      if (selectedItemForEdit) {
        await axios.post("/api/transactions/edit-transaction", {
           payload : {
            ...values,
            userid: user._id,
           },
          transactionId: selectedItemForEdit._id,
        });
        getTransactions();
        message.success("Transaction Updated successfully");
      } else {
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        getTransactions();
        message.success("Transaction added successfully");
      }
      setShowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);
      setLoading(false);
    } catch (error) {
      message.error("All fields are required");
      setLoading(false);
    }
  };
  return (
    <Modal
      title={selectedItemForEdit ? "Edit Entry" : "New Entry"}
      visible={showAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
      >
  
        <Form.Item label="$ Amount (USD)" name="amount">
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Income/Expense" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>
      
        <Form.Item label="Category" name="category">
          <Select>
            {" "}
            <Select.Option value="Salary">Salary</Select.Option>
            <Select.Option value="Freelance">Freelance Income</Select.Option>
            <Select.Option value="Other">Other Income</Select.Option>
            <Select.Option value="Household">Home/Yard</Select.Option>            
            <Select.Option value="Food">Food</Select.Option>                     
            <Select.Option value="Transportation">Transportation</Select.Option>
            <Select.Option value="Entertainment">Entertainment</Select.Option>
             <Select.Option value="Technology">Technology</Select.Option>
            <Select.Option value="Clothing">Clothing, etc.</Select.Option>
            <Select.Option value="Utilities">Utilities</Select.Option>
            <Select.Option value="Health">Health/Medical</Select.Option>
            <Select.Option value="Vacation">Travel/Vacation</Select.Option>
            <Select.Option value="Tax">Taxes</Select.Option> 
            <Select.Option value="Other-expense">Other Expense</Select.Option> 

          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditTransaction;
