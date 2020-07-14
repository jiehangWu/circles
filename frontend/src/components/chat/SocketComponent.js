import React, {useEffect, useState} from 'react';
// import {HomeActions} from "../../actions/home.actions";
import {connect} from "react-redux";
// import {createConnect} from "react-redux/lib/connect/connect";
import SockJS from "sockjs";
import {history} from "../../helpers/history";

// this component is used to reconnect socket and document the rules
// (including heart check, reconnect, receiving messages handler,etc.)

let url = "ws://127.0.0.1:5000";

function heartCheck(socket, username) {
    this.timeout = 2000; //5s
    this.timeoutObj = null;
    this.serverTimeoutObj = null;
    this.reset = ()=> {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        this.start();
    };
    this.start = ()=> {
        let self = this;
        this.timeoutObj = setTimeout(()=> {
            console.log("username "+ username);
                socket.send(JSON.stringify({
                purpose: "HEART_BEAT",
                payload: username
            }));
            self.serverTimeoutObj = setTimeout(()=> {
                socket.close();
            }, self.timeout)
        }, this.timeout)
    };
}

const SocketComponent =  (props)=> {
    console.log("socket -------"+props);
    const [response, setResponse] = useState("");

    let hc;
    let restart;

    const startSocket = ()=> {
        if (!window.WebSocket) {
            console.log("MozWebSocket");
            window.WebSocket = window.MozWebSocket;
            props.connectSocket(new WebSocket(url));
        }
        if (window.WebSocket) {
            console.log('WebSocket');
            props.connectSocket( new WebSocket(url));
        } else {
            console.log("SOCKJS");
            props.connectSocket(new SockJS(url));
        }
    };

    useEffect(() => {
        props.socket.onopen = ()=> {

        };
        // receiving message handler
        props.socket.onmessage = (event)=>{
            let message = JSON.parse(event.data);
            console.log(message);
            if (message.purpose === "SOCKET_INIT_CONTACTS") {
                // if new heartCheck, the old one will not be handled(bug)
                if (hc === undefined || restart === true) {
                    hc = new heartCheck(props.socket, props.username);
                    restart = false;
                }
                hc.start();
                props.socketInitContactsList(message.payload);
                props.socketInitContacts(message.payload);
            }
            if (message.purpose === "SOCKET_ADD_CONTACT") {
                props.socketAddContact(message.payload);
                props.socketAddContactList(message.payload);
            }
            if(message.purpose === "SOCKET_SEND_MESSAGE") {
                props.addOneMessageClient(message.payload);
            }
            hc.reset();
        };
        props.socket.onerror = ()=> {
            console.log("socket error");
            startSocket();
            restart = true;
        };
        props.socket.onclose = (e)=> {
            console.log(e);
           startSocket();
            restart = true;
        };

        }, [props.username, props.socket, history]);
    return <div></div>;
};

const mapStateToProps = (state) => {
    return {
        username: state.userinfo.username,
        socket: state.socketReducer,
    };
};

const mapAction = {
    connectSocket: (socket)=> {
        return ({
            type: 'SOCKET_CONNECT',
            payload: socket
        });
    },
    socketAddContact: (user)=> {
        return ({
            type: "ADD_ONE_CONTACT",
            payload: user
        });
    },
    socketAddContactList: (user)=> {
        return ({
            type: "ADD_ONE_CONTACT_LIST",
            payload: user
        });
    },
    socketInitContactsList: (users)=> {
        return ({
            type:"SOCKET_INIT_CONTACTS_LIST",
            payload: users
        });
    },
    socketInitContacts: (users)=> {
        return ({
            type:"SOCKET_INIT_CONTACTS",
            payload: users
        });
    },
    addOneMessage:(message)=> {
        return {
            type: "ADD_ONE_MESSAGE",
            payload: message
        }
    },
    addOneMessageClient: (message) => {
        return {
            type: "ADD_ONE_MESSAGE_CLIENT",
            payload: message
        }
    }
};

export default connect(mapStateToProps, mapAction)(SocketComponent);

