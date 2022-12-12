// source: https://medium.com/@awaisshaikh94/chat-component-built-with-react-and-material-ui-c2b0d9ccc491

import React, { useEffect } from 'react';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import ChatUser from './ChatUser';
import Message from './Message';
import { useLocation } from 'react-router-dom';
import '../App.css';

const Chat = () => {
    // get parameters
    const { state } = useLocation();
    const { name, email, primaryLanguage, userGuid } = state; // Read values passed on state
    console.log("Chat.js begin: ", name, email, primaryLanguage, userGuid);

    const [historyRooms, setHistoryRooms] = useState([]);
    const [storedFriends, setStoredFriends] = useState([])
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState();
    const [currentRoom, setCurrentRoom] = useState(null);
    const [mobileRoom, setMobileRoom] = useState(false)

    const mobile = useMediaQuery('(max-width:600px)');

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
                if (data["success"]) { // if it's true, successful, 
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
                console.log("Chat.js history chats data is ", data); return data;
            })
            .then((data) => {
                if (data["success"]) { // if it's true, successful, 
                    // historyMessages = data.map();
                    setMessages(data.chats);
                    if (mobile) {
                        setMobileRoom(true)
                    }
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

    const renderUsers = () => {
        if (mobile && mobileRoom) {
            return
        }
        return (<Grid item xs={3} className="chats-options">
            <Grid item xs={12} >
                <ChatUser user={name} language={primaryLanguage} status="Online"></ChatUser>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h6" className="chats-header">Chats</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ padding: '0px 15px 10px 15px' }}>
                <TextField
                    id="outlined-basic-email"
                    label="Search"
                    fullWidth
                    onChange={(event) => { searchUser(event.target.value) }}
                />
            </Grid>
            <Divider />
            <List>
                {peopleList}
            </List>
        </Grid>)
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
        if (!currentRoom || (mobile && !mobileRoom)) {
            return;
        }
        return (
            <Grid item xs={9} className="chat-room">
                <ChatUser className="selected-user" user={currentRoom.user} language={currentRoom.language} status="Online"></ChatUser>
                <Divider />
                <List className="messages-container">
                    {renderMessages()}
                </List>
                <Divider />
                <Grid container className="typed-message-container">
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
                {renderUsers()}
                {renderCurrentChatRoom()}
            </Grid>
        </div>
    );
}

export default Chat;