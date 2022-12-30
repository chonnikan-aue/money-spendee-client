import React, { useState, useEffect } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Label, Button, Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { InputGroup, FloatingLabel } from 'react-bootstrap';


const UpdateInfo = () => {

  // Add new Deposit type

  const [showAddNewDeposit, setShowAddNewDeposit] = useState(false);
  const toggleDepositContent = () => {
    setShowAddNewDeposit(!showAddNewDeposit);
  };

  const [newDepositType, setNewDepositType] = useState({
    name: "",
    userId: 1,
    budgetPercent: '',
    alertPercent: ''
  });

  const handleChange2 = e => {
    let value = e.target.value
    if (e.target.name === 'alertPercent' || e.target.name === 'budgetPercent') {
      value = parseInt(value, 10)
    }
    setNewDepositType((prevState) => ({
      ...prevState,
      [e.target.name]: value
    })
    );
  }

  const handleSubmit2 = e => {
    e.preventDefault();
    console.log(newDepositType);
    axios.post('http://localhost:3001/deposit-type', newDepositType)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };


  // Add new withdraw type

  const [showAddNewWithdraw, setShowAddNewWithdraw] = useState(false);
  const toggleWithdrawContent = () => {
    setShowAddNewWithdraw(!showAddNewWithdraw);
  };

  const [newWithdrawType, setNewWithdrawType] = useState({
    name: "",
    userId: 1,
    budgetPercent: '',
    alertPercent: ''
  });

  const handleChange3 = e => {
    let value = e.target.value
    if (e.target.name === 'alertPercent' || e.target.name === 'budgetPercent') {
      value = parseInt(value, 10)
    }
    setNewWithdrawType((prevState) => ({
      ...prevState,
      [e.target.name]: value
    })
    );
  }

  const handleSubmit3 = e => {
    e.preventDefault();
    console.log(newWithdrawType);
    axios.post('http://localhost:3001/withdraw-type/user/1', newWithdrawType)
      .then(res => {
        console.log(newWithdrawType)
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };


  const [depositTypeData, setDepositTypeData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/deposit-type/user/1')
      .then(res => {
        setDepositTypeData(res.data.DepositTypes);
        console.log(res.data.DepositTypes)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);



  // Show withdraw type data
  const [withdrawTypeData, setWithdrawTypeData] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3001/withdraw-type/user/1')
      .then(res => {
        setWithdrawTypeData(res.data.WithdrawTypes);
        console.log(res.data.WithdrawTypes)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  // Update withdraw type data
  const [updateFormVisible, setUpdateFormVisible] = useState(false);

  const showUpdateForm = () => {
    setUpdateFormVisible(true);
  };

  const hideUpdateForm = () => {
    setUpdateFormVisible(false);
  };

  const [updateWithdrawType, setUpdateWithdrawType] = useState({
    name: '',
    alertPercent: '',
    budgetPercent: ''
  })

  const handleChangeWithdraw = e => {
    let value = e.target.value
    if (e.target.name === 'alertPercent' || e.target.name === 'budgetPercent') {
      value = parseInt(value, 10)
    }
    setUpdateWithdrawType((prevState) => ({
      ...prevState,
      [e.target.name]: value
    })
    );
  }

  const handleUpdateWithdrawSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3001/withdraw-type', updateWithdrawType)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
    hideUpdateForm();
  };

  // Delete withdraw type data
  const deleteWithdrawType = withdrawTypeId => {
    axios.delete(`http://localhost:3001/withdraw-type/${withdrawTypeId}`)
      .then(res => {
        // remove the deleted withdraw type from the withdrawTypeData state
        setWithdrawTypeData(prevWithdrawTypeData => prevWithdrawTypeData.filter(type => type.id !== withdrawTypeId))
      })
      .catch(err => {
        console.error(err);
      });
  }


  return (
    <Container>
      <h2 className="header">Update Budget Information</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <Button color="primary" type="button" onClick={toggleDepositContent}>Add your new deposit type</Button>
          {showAddNewDeposit ? (
            <FormGroup>
              <FloatingLabel for="amount">Add your new deposit type here:</FloatingLabel>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter new deposit type"
                  onChange={handleChange2}
                />
                <Form.Control
                  type="number"
                  name="alertPercent"
                  placeholder="How much you want us to alert (In percent)"
                  onChange={handleChange2}
                />
                <Form.Control
                  type="number"
                  name="budgetPercent"
                  placeholder="How much you want to spend on this budget"
                  onChange={handleChange2}
                />
              </InputGroup>
              <Button color="primary" type="submit" onClick={handleSubmit2}>Save</Button>
            </FormGroup>
          ) : null}
        </div>

        <div>
          <Button color="primary" type="button" onClick={toggleWithdrawContent}>Add your new withdraw type</Button>
          {showAddNewWithdraw ? (
            <FormGroup>
              <FloatingLabel for="amount">Add your new withdraw type here:</FloatingLabel>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter new withdraw type"
                  onChange={handleChange3}
                />
                <Form.Control
                  type="number"
                  name="alertPercent"
                  placeholder="How much you want us to alert (In percent)"
                  onChange={handleChange3}
                />
                <Form.Control
                  type="number"
                  name="budgetPercent"
                  placeholder="How much you want to spend on this budget"
                  onChange={handleChange3}
                />
              </InputGroup>
              <Button color="primary" type="submit" onSubmit={handleSubmit3}>Save</Button>
            </FormGroup>
          ) : null}
        </div>
      </div>

      <h4>Deposit types</h4>
      <ListGroup>
        {
          depositTypeData.map(type => (
            <ListGroupItem key={type.id}>{type.name} will alert at {type.alertPercent}% of {type.budgetPercent}% of your budget</ListGroupItem>
          ))
        }
      </ListGroup>



      <h4>Withdraw types</h4>
      <ListGroup>
        {
          withdrawTypeData.map(type => (
            <ListGroupItem key={type.id}>
              {type.name} will alert at {type.alertPercent}% of {type.budgetPercent}% of your budget
              {updateFormVisible ? (
                <>
                  <form onSubmit={handleUpdateWithdrawSubmit}>
                    <input type="text" name="name" placeholder="withdraw type" onChange={handleChangeWithdraw} />
                    <input type="number" name="alertPercent" placeholder="alert percent" onChange={handleChangeWithdraw} />
                    <input type="number" name="budgetPercent" placeholder="budget limit" onChange={handleChangeWithdraw} />
                    <Button type="submit">Update</Button>
                  </form>
                  <Button onClick={hideUpdateForm}>Cancel</Button>
                </>
              ) : (
                <Button onClick={showUpdateForm}>Edit</Button>
              )}
              <Button onClick={() => deleteWithdrawType(type.id)}>Delete</Button>
            </ListGroupItem>
          ))
        }
      </ListGroup>
 






    </Container>
  );

};

export default UpdateInfo;
