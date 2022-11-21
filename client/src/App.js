import './App.css';
import { Button, Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Switch from '@mui/material/Switch'
import PeopleIcon from '@mui/icons-material/People'; // friends
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // add friend
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'; // search new people
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'

import React from 'react';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <Button variant="contained" sx={{ color: "yellow" }}>Hello world</Button>
        <Button color='error' variant="contained">Hello world</Button>
        <br />
        <Typography variant="h1">Hello world Typography</Typography>
        <Typography variant="h4">Hello world Typography</Typography>
        <Typography variant="h6">Hello world Typography</Typography>
        <Typography variant="body1">Hello world Typography</Typography>
        <Typography variant="body2">Hello world Typography</Typography>
        <br />
        <AddIcon fontSize='small' />
        <AddIcon fontSize='medium' />
        <AddIcon fontSize='large' />
        <br />
        <SearchIcon fontSize='small' />
        <SearchIcon fontSize='medium' />
        <SearchIcon fontSize='large' onClick={() => console.log("test")} />
        <br />
        <Switch aria-label='' />
        <br />
        <PeopleIcon fontSize='small' />
        <PeopleIcon fontSize='medium' />
        <PeopleIcon fontSize='large' />
        <br />
        <ChatIcon fontSize='small' />
        <ChatIcon fontSize='medium' />
        <ChatIcon fontSize='large' />
        <br />
        <SettingsIcon fontSize='small' />
        <SettingsIcon fontSize='medium' />
        <SettingsIcon fontSize='large' />
        <br />
        <PersonAddIcon fontSize='small' />
        <PersonAddIcon fontSize='medium' />
        <PersonAddIcon fontSize='large' />
        <br />
        <PersonAddAltIcon fontSize='small' />
        <PersonAddAltIcon fontSize='medium' />
        <PersonAddAltIcon fontSize='large' />
        <br />
        <SendIcon fontSize='small' />
        <SendIcon fontSize='medium' />
        <SendIcon fontSize='large' />
        <br />
        <CircularProgress />
        <br />
        <LinearProgress />
      </React.Fragment>

    </div>
  );
}

export default App;
