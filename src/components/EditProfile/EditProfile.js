import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Form, Button, FloatingLabel } from "react-bootstrap";

const EditProfile = (props) => {
  const username = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.current.value) {
      let token = localStorage.getItem("jwt");
      axios
        .put(
          `http://localhost:3001/user/${props.userData.id}`,
          props.profileData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          localStorage.setItem(
            "profileData",
            JSON.stringify({ username: props.profileData.username })
          );
          props.setProfileData(JSON.parse(localStorage.getItem("profileData")));
          props.getUserData();
        })
        .then(() => {
          alert("Profile has been updated.");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Username cannot be empty.");
    }
  };

  useEffect(() => {
    props.setProfileData({ username: props.userData.username });
  }, [props.userData]);

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel label="Username" className="mb-3">
        <Form.Control
          id="username"
          type="text"
          placeholder="Username"
          onChange={props.handleProfileChange}
          defaultValue={props.userData.username}
          ref={username}
        />
      </FloatingLabel>
      <FloatingLabel label="Password" className="mb-3">
        <Form.Control
          id="password"
          type="password"
          placeholder="Password"
          onChange={props.handleProfileChange}
        />
      </FloatingLabel>
      <Button id="login" variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

export default EditProfile;
