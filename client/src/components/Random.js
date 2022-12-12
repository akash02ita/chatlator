import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Random = () => {
    // get parameters
    const { state } = useLocation();
    const { name, email, primaryLanguage, userGuid, learnLanguage } = state; // Read values passed on state
    console.log("Random.js begin: ", name, email, primaryLanguage, userGuid, learnLanguage);

    const [randomUsers, setRandomUsers] = useState([]); // random online users
    const [pairUsers, setPairUsers] = useState([]); // users who want to pair up to me
    const [sentPairRequest, setSentPairRequest] = useState(true);

    const refreshLiveData = () => {

    }

    useEffect( () => {
        setInterval(() => {

        }, 2000);
    }, []);

    const sendPairUpRequest = (toEmail, toName) => {
        // use fetch api random/send/pairRequest
    }

    const receivePairUpRequestStatus = () => {
        // keep polling fetch api random/receive/pairStatus
    }

    // send if you want to accept or reject pair up
    const sendPairUpConfirmation = () => {
        // fetch api random/send/pairConfirmation
    }

    const renderDialogPairUp = () => {
        // check i sent a pair request
        if (sentPairRequest) {
            
        }
        
        // check if i received a pair request
        if (!pairUsers.length) return;
        return (
        <div></div>
        );

    }

    const renderRandomUsers = () => {
        const renderedRandomUsers = randomUsers.map(([ruemail, runame]) => {
            return (
                <div onClick={() => sendPairUpRequest(ruemail, runame)}>
                    runame
                </div>
            );
        });
    }

    return (
        <div>
            <div>hello</div>
            {renderRandomUsers()};
            {renderDialogPairUp()};
        </div>
    );

}

export default Random;