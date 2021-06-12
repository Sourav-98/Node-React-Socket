import logo from './logo.svg';
import './App.css';


import { useState, useEffect, useRef } from 'react';

import { Container, Grid, Typography, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { io as ioClient } from 'socket.io-client';


const customStyles = makeStyles((theme)=>({
  root:{
    flexGrow: 1
  },
  paper:{
    height: 450,
    width: 330,
    padding: 20
  }
}));

// let socket;

function App() {
  
  const socket = useRef(ioClient({
    path: '', 
    autoConnect: false,
    reconnection: false
  }));

  const styleClass = customStyles();

  const [socketStatus, setSocketStatus] = useState(false);
  const [socketId, setSocketId] = useState('---null---');

  useEffect(()=>{

    socket.current.on("connect", ()=>{
      console.log('connected...');
      console.log(socket.current.id);
      setSocketId(socket.current.id);    
    });
  
    socket.current.on("disconnect", ()=>{
      console.log("Disconnected from the server...");
      setSocketId('---null---');
    });
  }, []);
  
  useEffect(()=>{
    if(socketId!=='---null---'){
      setSocketStatus(true);
    }
    else{
      setSocketStatus(false);
    }
  }, [socketId]);

  function wsConnect(){
    socket.current.connect();
  }

  function wsDisconnect(){
    socket.current.close();
  }

  function wsServerDisconnect(){
    socket.current.emit('client-disconnect')
  }

  return (
    <div>
      <Grid container className={styleClass.root} spacing={2}>
        <Grid item xs={6}>
          <Paper className={styleClass.paper}>
            <Typography variant={'h4'} align={'center'}>Connect to WebSocket Server</Typography>
            <br/>
            <Typography variant={'body1'}>Click on the button to Connect</Typography>
            <br/>
            <Button variant={'outlined'} color={'primary'} onClick={wsConnect}>Connect to WS Server</Button>
            <br/>
            <br/>
            <Button variant={'outlined'} color={'secondary'} onClick={wsDisconnect}>DIRECT Disconnect from WS Server</Button>
            <Button variant={'outlined'} color={'secondary'} onClick={wsServerDisconnect}>MSG Disconnect from WS Server</Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={styleClass.paper}>
            <Typography variant={'h4'} align={'center'}>WebSocket Server Status</Typography>
            <br/>
            <Typography variant="body2">Socket Id: {socketId}</Typography>
            <Typography variant="body2">Socket Status: {socketStatus == true ? 'Online' : 'Offline'}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
