import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// for dialogs popup
import Button from '@material-ui/core/Button';
import Card from '@mui/material/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Random = () => {
    const navigate = useNavigate();

    // get parameters
    const { state } = useLocation();
    const { name, email, primaryLanguage, userGuid, learnLanguage } = state; // Read values passed on state
    console.log("Random.js begin: ", name, email, primaryLanguage, userGuid, learnLanguage);

    const [randomUsers, setRandomUsers] = useState([]); // random online users

    // if user receiving request to pair up
    const [pairUsers, setPairUsers] = useState({}); // users who want to pair up to me

    // if user sending request to pair up
    const [[sentPairRequest, sentPairRequestEmail, sentPairRequestName], setSentPairRequestTrack] = useState([false, null , null])

    const refreshLiveData = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": name,
                // "email": email,
                "email": userGuid,
                "primaryLanguage": primaryLanguage,
                "learnLanguage": learnLanguage
            })
        };

        fetch("/random/search", requestOptions)
            .then(response => response.json())
            .then(data => { console.log("Random.js random live data is ", data); return data; })
            .then((data) => {
                if (data["success"]) { // if it's true, successful, 
                    setRandomUsers(data["matches"]);
                    setPairUsers(data["pairuprequests"]);
                }
            });
    }

    useEffect( () => {
        const intervalid = setInterval(() => {
            refreshLiveData();
        }, 500);

        return () => clearInterval(intervalid);
    }, []);

    const sendPairUpRequest = (toEmail, toName) => {
        // use fetch api random/send/pairRequest
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": name,
                // "email": email,
                "email": userGuid,
                "primaryLanguage": primaryLanguage,
                "learnLanguage": learnLanguage,
                "otherUserEmail": toEmail
            })
        };

        fetch("/random/send/pairRequest", requestOptions)
            .then(response => response.json())
            .then(data => { console.log("Random.js pairup send data is ", data); return data; })
            .then((data) => {
                if (data["success"]) { // if it's true, successful, 
                    setSentPairRequestTrack([ true, toEmail, toName]);
                }
            });
    }

    useEffect(() => {
        if (!sentPairRequestEmail) return;
        const intervalid = setInterval(() => receivePairUpRequestStatus(), 2000);
        return () => clearInterval(intervalid);
    }, [sentPairRequestEmail]);

    const receivePairUpRequestStatus = () => {
        if (!sentPairRequestEmail || !sentPairRequestName) return;
        // keep polling fetch api random/receive/pairStatus
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": name,
                // "email": email,
                "email": userGuid,
                "primaryLanguage": primaryLanguage,
                "learnLanguage": learnLanguage,
                "otherUserEmail": sentPairRequestEmail
            })
        };

        console.log("going to send request!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        fetch("/random/receive/pairStatus", requestOptions)
            .then(response => response.json())
            .then(data => { console.log("Random.js pairup status data is ", data); return data; })
            .then((data) => {
                if (data["success"]) { // if it's true, successful,
                    // handleProceedChatting: createRoom and then navigate to Chat.js if confirmation was true 
                    const status = data.status;
                    if (status === 'accepted') {
                        console.log("---------You got accepted!");
                        handleProceedChatting(sentPairRequestEmail, sentPairRequestName);
                    }
                    else if (status === 'declined') {
                        setSentPairRequestTrack([false, null, null]);
                    }
                }
            });   
    }

    const handleProceedChatting = (otherUserEmail, otherUserName) => {
        console.log("handleProceedChatting called");
        const userInfo = {};
        // userInfo[email] = {"name": name, "primaryLanguage": primaryLanguage};
        userInfo[userGuid] = {"name": name, "primaryLanguage": primaryLanguage};
        userInfo[otherUserEmail] = {"name": otherUserName, "primaryLanguage": learnLanguage};

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "userInfo": userInfo
            })
        };

        fetch("/chats/createRoom", requestOptions)
            .then(response => response.json())
            .then(data => { console.log("Random.js create room data is ", data); return data; })
            .then((data) => {
                if (data["success"]) { // if it's true, successful,
                    console.log("successful creation of chat room");
                    navigate("../chatting", {
                        state:
                        {
                            name: name,
                            email: email,
                            primaryLanguage: primaryLanguage,
                            userGuid: userGuid,
                            learnLanguage: learnLanguage,
                            beginRoomGuid: data.room.guid
                        }
                    });
                } else {
                    alert("failed creating chat room!");
                }
            });   
    }

    // send if you want to accept or reject pair up
    const sendPairUpConfirmation = (confirmation, otherUserEmail) => {
        // fetch api random/send/pairConfirmation
        console.log("There has been a click!", confirmation, otherUserEmail);
        const otherUserName = pairUsers[otherUserEmail];
        // use fetch api random/send/pairRequest
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": name,
                // "email": email,
                "email": userGuid,
                "primaryLanguage": primaryLanguage,
                "learnLanguage": learnLanguage,
                "otherUserEmail": otherUserEmail,
                "confirmation": confirmation
            })
        };

        fetch("/random/send/pairConfirmation", requestOptions)
            .then(response => response.json())
            .then(data => { console.log("Random.js pairup confirm data is ", data); return data; })
            .then((data) => {
                if (data["success"]) { // if it's true, successful,
                    // handleProceedChatting: createRoom and then navigate to Chat.js if confirmation was true 
                    if (confirmation) handleProceedChatting(otherUserEmail, otherUserName);
                } else {
                    alert("failed sending back your confirmation choice!");
                }
            });   
    }

    const renderDialogPairUp = () => {
        // check i sent a pair request
        if (sentPairRequest && sentPairRequestEmail) {
            return (
                <Dialog
                    open={true}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={(() => { })}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">Please wait</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" className="random-popup">
                            Waiting for user to accept your request...
                            If your request is declined you will not be able to pair up again to the same user.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            );
        }
        
        // check if i received a pair request
        const pairUsersEmail = Object.keys(pairUsers);
        if (!pairUsersEmail.length) return;
        const pairUserEmail = pairUsersEmail[0];
        return (
            <Dialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            onClose={(() => {})}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title">{`${pairUsers[pairUserEmail]}: wants to pair up with you`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" className="random-popup">
                    What is your choice?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => sendPairUpConfirmation(false, pairUserEmail)} color="secondary">
                    Reject
                </Button>
                <Button onClick={() => sendPairUpConfirmation(true, pairUserEmail)} color="primary">
                    Accept
                </Button>
            </DialogActions>
        </Dialog>
        );

    }

    const renderRandomUsers = () => {
        const renderedRandomUsers = randomUsers.map(([ruemail, runame]) => {
            console.log("rendering", ruemail, runame);
            return (
                <div key={ruemail} onClick={() => sendPairUpRequest(ruemail, runame)}>
                    <Button className='random-user-button'>{runame}</Button>
                </div>
            );
        });
        return (
            <Card className='random-user'>
                {renderedRandomUsers}
            </Card>
        )
    }

    return (
        <div className='random-users'>
            <h2>Select user to chat with in {learnLanguage}:</h2>
            {renderRandomUsers()}
            {renderDialogPairUp()}
        </div>
    );
}

export default Random;