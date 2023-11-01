import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  Button,
  Message,
  Segment,
  Divider,
  Header,
} from 'semantic-ui-react';
import axios from 'axios';

import {
  HeaderMessage,
  FooterMessage,
} from '../components/Common/WelcomeMessage';
import ImageDropDiv from '../components/Common/ImageDropDiv';
import baseURL from '../utils/baseURL';
import { registerUser } from '../utils/authUser';
import uploadPic from '../utils/upload-pic-to-cloudinary';

function SingUp() {
  const [user, setUser] = useState({
    name: '',
    password: '',
    phoneNumber: '',
  });

  const { name, password, phoneNumber } = user;

  const handleChange = (e, result) => {
    const { name, value, files } = result || e.target;

    if (name === 'media') {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }

    setUser({ ...user, [name]: value });
  };

  const inputRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [formLoading, setFormLoading] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [email, setEmail] = useState('');
  const [userEmailLoading, setUserEmailLoading] = useState(false);
  const [userEmailAvailable, setUserEmailAvailable] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    email === '' ? setUserEmailAvailable(false) : checkEmail();
  }, [email]);

  const checkEmail = async () => {
    console.log(email);
    setUserEmailLoading(true);
    let res;
    try {
      res = await axios.get(`${baseURL}/api/v1/signup/${email}`);
      //console.log(res);

      if (errorMessage != null) setErrorMsg(null);

      

      if (res.data == 'Available') {
        setUserEmailAvailable(true);
        setUser((prev) => ({ ...prev, email: email }));
      }
    } catch (error) {
      setErrorMessage('Email Not Accepted');
      setUserEmailAvailable(false);
    }
    setUserEmailLoading(false);
  };

  useEffect(() => {
    const isUser = Object.values({
      name,
      email,
      password,
      phoneNumber,
      media,
    }).every((item) => Boolean(item));

    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    let profilePicUrl;

    if (media !== null) {
      profilePicUrl = await uploadPic(media);
    }

    if (media !== null && !profilePicUrl) {
      setFormLoading(false);
      return setErrorMessage('Error Uploading Image');
    }

    console.log(user);
    await registerUser(user,profilePicUrl, setErrorMessage, setFormLoading);
  };

  return (
    <>
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={errorMessage != null}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="Opps!"
          content={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
        <Segment color="purple">
          <ImageDropDiv
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia}
            inputRef={inputRef}
            highlighted={highlighted}
            setHighlighted={setHighlighted}
            handleChange={handleChange}
          />

          <Form.Input
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            fluid
            icon="user"
            iconPosition="left"
            required
          />

          <Form.Input
            loading={userEmailLoading}
            error={!userEmailAvailable}
            label="Email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              let mm = e.target.value.split('@');
              if (mm[1]) setUserEmailAvailable(true);
              else setUserEmailAvailable(false);
            }}
            fluid
            icon="envelope"
            iconPosition="left"
            type="email"
            required
          />

          <Form.Input
            label="Password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            fluid
            icon={{
              name: 'eye',
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            iconPosition="left"
            type={showPassword ? 'text' : 'password'}
            required
          />

          <Form.Input
            label="Phone Number"
            placeholder="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            fluid
            icon="phone"
            iconPosition="left"
            required
          />

          <Divider hidden />
          <Button
            icon="angle double right"
            content="  Next"
            type="submit"
            color="orange"
            disabled={submitDisabled || !userEmailAvailable}
          />
        </Segment>
      </Form>

      <Divider />

      <FooterMessage />
    </>
  );
}

export default SingUp;
