// source: https://medium.com/@awaisshaikh94/chat-component-built-with-react-and-material-ui-c2b0d9ccc491

import React, { useEffect } from 'react';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import ChatUser from './ChatUser';
import Message from './Message';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

// imports for dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { MenuItem, Menu } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';

// for dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

    // for popup dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const refreshLatestChat = () => {
        console.log("hello")
        // skip when nothing yet
        if (!currentRoom || !currentRoom.roomGuid) {
            console.log("failed currentRoom is ", currentRoom);
            return;
        }

        /* // inefficient: works but now the efficient works better.
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "roomGuid": currentRoom.roomGuid
            })
        };

        fetch("chats/getHistoryChats", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("Chat.js history chats data is ", data); return data;
            })
            .then((data) => {
                if (data["success"]) { // if it's true, successful, 
                    setMessages(data.chats);
                }
            });
        */

        //currently working: closure issues. 'messages' is closed to empty list unfortunately
        // however this has been fixed by adding dependency in useEffect to achieve same thing without issues
        // according to several test and spam clicks no duplicate issues coming up
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "roomGuid": currentRoom.roomGuid
            })
        };

        fetch("chats/pollLatestChat", requestOptions)
            .then(response => response.json())
            .then(data => { console.log("Chat.js update latest chat data is ", data); return data; })
            .then((data) => {
                if (data["success"]) { // if it's true, successful, 
                    const latestChat = data["chats"];
                    // console.log("currentLatestChatId is ",currentLatestChatId);
                    const currentLatestChatGuid = messages.length ? messages[messages.length - 1].guid : null;
                    if (latestChat && latestChat.guid !== currentLatestChatGuid) {
                        console.log("Difference in guid detected for latest chat...");
                        setMessages([...messages, latestChat]);
                    }
                }
            });

    }

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

    // render each time currentRoom or messages list changes
    // currentRoom changes only when selected room is changed in handleSetCurrentRoom
    // messages changes only when chat history message is done being set in handleSetCurrentRoom
    useEffect(() => {
        if (currentRoom) {
            // keep polling ever ms milliseconds
            const ms = 500;
            const idinterval = setInterval(refreshLatestChat, ms);

            // clearinterval will run once component unmounts
            return () => clearInterval(idinterval);
        }
    }, [currentRoom, messages]);

    const handleSetCurrentRoom = (room) => {
        // console.log("new room value", room);
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

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            sendMessage()
        }
    }

    const handleBackClick = () => {
        setMobileRoom(false)
    }

    const renderUsers = () => {
        if (mobile && mobileRoom) {
            return
        }
        return (
            <Grid item xs={3} className="chats-options">
                <Grid item xs={12} >
                    <ChatUser user={name} language={primaryLanguage} status="Online"></ChatUser>
                </Grid>
                <Divider />
                <Grid container>
                    <Grid item xs={12} >
                        <Typography variant="h6" className="chats-header">Chats</Typography>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                            <AddCircleOutlineRoundedIcon variant="outlined" color="primary" />
                        </Button>
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
                <ChatUser className="selected-user" mobile={mobile} handleBackClick={handleBackClick} user={currentRoom.user} language={currentRoom.language} status="Online"></ChatUser>
                <Divider />
                <List className="messages-container">
                    {renderMessages()}
                </List>
                <Divider />
                <Grid container className="typed-message-container">
                    <Grid item xs={11}>
                        <TextField id="typeSomethingField" label="Type Something" fullWidth onKeyDown={handleEnter} onChange={(event) => { newMessage(event.target.value) }} />
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab color="primary" aria-label="add" onClick={sendMessage}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [learnLanguage, setLearnLanguage] = useState(null);
    const handleRandomSearchMove = () => {
        if (!learnLanguage) {alert("select a language you want to learn!"); return};
        navigate("../randomsearch", {
            state:
            {
                name: name,
                email: email,
                primaryLanguage: primaryLanguage,
                userGuid: userGuid,
                learnLanguage: learnLanguage
            }
        });
    }
    const handleClickAnchorEl = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleCloseAnchorEl = () => {
        setAnchorEl(null);
      };

    return (
        <div>
            <Grid container component={Paper} className="chat">
    { renderUsers() }
    { renderCurrentChatRoom() }
            </Grid >

    <div>
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle id="alert-dialog-slide-title">{"Let's search for you a random person..."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" className="random-popup">
                        {/* use componenet as span to avoid DOM errors of div in p */}
                        <Typography component={'span'} variant='body1'>What language you want to learn?</Typography>
                            <Button
                                variant="contained"
                                fullWidth
                                disableElevation
                                onClick={handleClickAnchorEl}
                                endIcon={<KeyboardArrowDown />}
                                sx={{ color: 'white' }}
                            >
                                {learnLanguage ? learnLanguage : "Select a language..."}
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseAnchorEl}
                            >
                                <MenuItem onClick={() => {setLearnLanguage("English"); setAnchorEl(null);}}>English</MenuItem>
                                <MenuItem onClick={() => {setLearnLanguage("French"); setAnchorEl(null);}}>French</MenuItem>
                                <MenuItem onClick={() => {setLearnLanguage("Spanish"); setAnchorEl(null);}}>Spanish</MenuItem>
                                <MenuItem onClick={() => {setLearnLanguage("German"); setAnchorEl(null);}}>German</MenuItem>
                                <MenuItem onClick={() => {setLearnLanguage("Chinese"); setAnchorEl(null);}}>Chinese</MenuItem>
                                <MenuItem onClick={() => {setLearnLanguage("Arabic"); setAnchorEl(null);}}>Arabic</MenuItem>
                                <MenuItem onClick={() => {setLearnLanguage("Hindi"); setAnchorEl(null);}}>Hindi</MenuItem>
                            </Menu>
                    </DialogContentText>
                </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="secondary">
                Go back
            </Button>
            <Button onClick={handleRandomSearchMove} color="primary">
                Search for Random People
            </Button>
        </DialogActions>
    </Dialog></div>
        </div >
    );
}

export default Chat;