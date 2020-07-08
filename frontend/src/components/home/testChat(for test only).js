import React, {useEffect, useState} from 'react';
import SockJS from "sockjs";
let socket;
if (!window.WebSocket) {
    console.log("MozWebSocket");
    window.WebSocket = window.MozWebSocket;
    socket = new WebSocket("ws://127.0.0.1:5000");
}
if (window.WebSocket) {
    console.log('WebSocket');
    socket = new WebSocket("ws://127.0.0.1:5000");
} else {
    console.log("SOCKJS")
    socket = new SockJS("ws://127.0.0.1:5000");
}

const ChatLink =  (props)=> {
    const [response, setResponse] = useState("");
    useEffect(() => {
        socket.onopen = ()=> {
            socket.send(JSON.stringify({client: "JAMES"}));
        };
        socket.onmessage = (event)=>{
            setResponse(event.data);
        };
    }, []);

    return <div>
            <span>Response:{response}</span>
        </div>;
};

export default ChatLink;