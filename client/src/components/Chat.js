// source: https://medium.com/@awaisshaikh94/chat-component-built-with-react-and-material-ui-c2b0d9ccc491

import React, { useEffect } from 'react';
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
import { useLocation } from 'react-router-dom';

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
    // get parameters
    const {state} = useLocation();
    const { name, email, primaryLanguage, userGuid } = state; // Read values passed on state
    console.log("Chat.js begin: ", name, email, primaryLanguage, userGuid);

    const [historyRooms, setHistoryRooms] = useState([]);
    const [storedFriends, setStoredFriends] = useState([])
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState();
    const [currentRoom, setCurrentRoom] = useState(null);

    // first time render only
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "userGuid": userGuid
            })
          };
      
          fetch("chats/getHistoryRooms", requestOptions)
            .then(response => response.json())
            .then(data => { console.log("Chat.js rooms data is ", data); return data; })
            .then((data) => {
              if (data["success"]){ // if it's true, successful, 
                const newRooms = data.rooms.map((room) => {
                    const previousUserGuid = Object.keys(room.userInfo).filter((e) => e !== userGuid)[0];
                    return {
                        "user": room.userInfo[previousUserGuid].name,
                        "userGuid": previousUserGuid,
                        "language": room.userInfo[previousUserGuid].primaryLanguage,
                        "status": "Offline",
                        "roomGuid": room.guid 
                    };
                });

                setStoredFriends(newRooms)
                setHistoryRooms(newRooms)
              } 
             // return "nothing"; // not entirely sure what this is for.
            });
    }, []);

    const handleSetCurrentRoom = (room) => {
        console.log("new room value", room);
        setCurrentRoom(room);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "roomGuid": room.roomGuid
            })
          };
      
          fetch("chats/getHistoryChats", requestOptions)
            .then(response => response.json())
            .then(data => {
                 console.log("Chat.js history chats data is ", data); return data; })
            .then((data) => {
              if (data["success"]){ // if it's true, successful, 
                // historyMessages = data.map();
                setMessages(data.chats);
                
              } 
             // return "nothing"; // not entirely sure what this is for.
            });
    }

    let peopleList = historyRooms.map((room) => {
        return (
            <div key={room.roomGuid} onClick={() => handleSetCurrentRoom(room)}>
                <ChatUser key={room.roomGuid} user={room.user} language={room.language} status={room.status}></ChatUser>
            </div>
        )
    })

    const searchUser = (text) => {
        if (text == "") {
            setHistoryRooms(storedFriends)
        }
        else {
            var matchingUsers = []
            storedFriends.forEach(function (room) {
                if (room.user.toLowerCase().includes(text)) {
                    matchingUsers.push(room)
                }
            });
            setHistoryRooms(matchingUsers)
        }
    }

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
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "contentOriginal": currentMessage["contentOriginal"],
                    "languageOriginal": primaryLanguage,
                    "languageTranslate": currentRoom.language,
                    "roomGuid": currentRoom.roomGuid,
                    "senderGuid": userGuid

                })
            };

            fetch("chats/sendMessage", requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("Chat.js response send data is ", data); return data;
                })
                .then((data) => {
                    if (data["success"]) { // if it's true, successful, 
                        // Do not manually set message. Rather let the polling function for getting latest message handle this automatically
                        // setMessages([...messages, currentMessage]);
                        document.getElementById("typeSomethingField").value = "";
                        
                    }
                    else {
                        alert("message failed to send!");
                    }
                });
        }
    }

    const renderMessages = () => {

        const messagesContent = messages.map((message) => {
            const side = message.senderGuid === userGuid ? "right" : "left";
            if (message.guid) {
                return (
                    <Message key={message.guid} side={side} contentOriginal={message.contentOriginal} contentTranslated={message.contentTranslated} updatedAt={message.updatedAt}></Message>
                )
            }
        });

        return messagesContent;
    }

    const renderCurrentChatRoom = () => {
        if (!currentRoom) {
            return;
        }
        console.log("currentRoom.primaryLanguage")
        return (

            <Grid item xs={9}>
                <ChatUser user={currentRoom.user} language={currentRoom.language} status="Online"></ChatUser>
                <Divider />
                <List className="messages-container">
                    {renderMessages()}
                </List>
                <Divider />
                <Grid container style={{ padding: '20px' }}>
                    <Grid item xs={11}>
                        <TextField id="typeSomethingField" label="Type Something" fullWidth onChange={(event) => { newMessage(event.target.value) }} />
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab color="primary" aria-label="add" onClick={sendMessage}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    return (
        <div>
            <Grid container component={Paper} className="chat">
                <Grid item xs={3} className="borderRight500">
                    <List>
                        <ChatUser user={name} language={primaryLanguage} status="Online"></ChatUser>
                    </List>
                    <Divider />
                    <Grid container>
                        <Grid item xs={12} >
                            <Typography variant="h6" className="chats-header">Chats</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth halfheight="true" onChange={(event) => { searchUser(event.target.value) }} />
                    </Grid>
                    <Divider />
                    <List>
                        {peopleList}
                    </List>
                </Grid>
                {renderCurrentChatRoom()}
            </Grid>
        </div>
    );
}

export default Chat;