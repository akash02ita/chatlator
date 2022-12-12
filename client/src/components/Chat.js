// source: https://medium.com/@awaisshaikh94/chat-component-built-with-react-and-material-ui-c2b0d9ccc491

import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Button } from '@mui/material';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import ChatUser from './ChatUser';
import Message from './Message';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

const Chat = () => {
    const [friends, setFriends] = useState([
        {
            "user": "Afnan",
            "language": "English",
            "status": "Online"
        },
        {
            "user": "Shardar",
            "language": "French",
            "status": "Offline"
        },
        {
            "user": "Akshay",
            "language": "Spanish",
            "status": "Online"
        }
    ])
    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState()

    let friendsList = friends.map((friend) => {
        return (
            <ChatUser key={friend.user} user={friend.user} language={friend.language} status={friend.status}></ChatUser>
        )
    })

    const newMessage = (m) => {
        setCurrentMessage({
            "contentOriginal": m,
            "contentTranslated": m,
            "updatedAt": new Date().toLocaleString(),
            "side": "right"
        })
    }

    const sendMessage = () => {
        if (currentMessage && currentMessage.contentOriginal != "") {
            setMessages([...messages, currentMessage])
        }
    }

    let messagesContent = messages.map((message, index) => {
        return (
            <Message key={index} side={message.side} contentOriginal={message.contentOriginal} contentTranslated={message.contentTranslated} updatedAt={message.updatedAt}></Message>
        )
    })


    return (
        <div>
            <Grid container component={Paper} className="chat">
                <Grid item xs={3} className="borderRight500">
                    <List>
                        <ChatUser user="Nick McLaughlin" language="Japanese" status="Offline"></ChatUser>
                    </List>
                    <Divider />
                    <Grid container>
                        <Grid item xs={12} >
                            <Typography variant="h6" className="chats-header">Chats</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth halfheight="true" />
                    </Grid>
                    <Divider />
                    <List>
                        {friendsList}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <ChatUser user="Afnan" language="English" status="Online"></ChatUser>
                    <Divider />
                    <List className="messages-container">
                        {messagesContent}
                    </List>
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={(event) => { newMessage(event.target.value) }} />
                        </Grid>
                        <Grid item xs={1} align="right">
                            <Fab color="primary" aria-label="add" onClick={sendMessage}><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;