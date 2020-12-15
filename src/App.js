import React, { useState } from "react";
import "./App.css";

// Componets of the web page
import Sidebar from "./Sidebar";
import Chat from "./Chat";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
// import Pusher from "pusher-js";
// import axios from "./axios";

function App() {
  // const [user, setUser] = useState(null);
  // const [messages, setMessages] = useState([]);

  // useEffect( async () => {
  //   await axios.get('/messages/sync')
  //   .then(response => {
  //     setMessages(response.data)
  //   })
  // }, [])

  // useEffect(() => {
  //   const pusher = new Pusher('151b9515dda402f0b6ed', {
  //     cluster: 'ap2'
  //   });

  //   const channel = pusher.subscribe('messages');
  //   channel.bind('inserted', (newMessage) => {

  //     setMessages([...messages, newMessage])
  //   });

  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   }

  // }, [messages])

  // console.log(messages)
  const [{user}, dispatch] = useStateValue();

  return (
    

    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
