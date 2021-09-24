import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import './App.css';

function App() {

  const [messages, setMessages] = useState([{ msg: "Hello", id: "125" }]);
  const [messageInput, setMessageInput] = useState('');
  const socketRef = useRef();

  useEffect(() => {

    console.log('connect to socket server');

    socketRef.current = io.connect('http://localhost:80/');

    socketRef.current.on('connect', () => {
      console.log('connected');
    });
    socketRef.current.on('message', messageObj => {
      setMessages(previous => {
        const messagesCopy = [...previous, messageObj];
        return messagesCopy;
      });
    });

  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    socketRef.current.emit('message', messageInput);
    setMessageInput('');
  };

  return (
    <div className="App">
      <div>{messages.map((messages) => <div key={messages.id}>{messages.msg}</div>)}</div>
      <form onSubmit={onSubmit}>
        <input type="text" value={messageInput} onChange={(event) => {
          setMessageInput(event.target.value);
        }} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
