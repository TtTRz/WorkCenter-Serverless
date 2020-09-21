import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { hello, sendMessage } from './apis/lambda';
import { Button } from 'antd';

export default () => {
  const [message, setMessage] = useState('');
  const [method, setMethod] = useState('');

  useEffect(() => {
    hello().then(({ message, method }) => {
      setMessage(message);
      setMethod(method);
    });
  }, []);

  const handleClick = async () => {
    const message = window.prompt('your message') as string;
    const { answer, method } = await sendMessage(message);
    alert(`Response: ${answer}. HTTP Method: ${method}`);
  };

  const isLoading = !message;

  return (
    <div>
      <header>
        <img src={logo} alt="logo" />
        <p>{isLoading ? 'Request Hello Function ……' : `Api response: ${message}. HTTP Method: ${method}`}</p>
        <p>
          <Button onClick={handleClick}>
            Send Message To Backend
          </Button>
        </p>
      </header>
    </div>
  );
};
