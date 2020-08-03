import Peer from 'peerjs';
import {connect} from "react-redux";
import React, {useEffect, useState, useRef} from "react";

const VideoPort = (props) => {
    const videoL = useRef(null);
    const videoR = useRef(null);
    const[peer, setPeer] = useState(null);
    const [call, setCall] = useState(null);
    const[answer, setAnswer] = useState(null);
    const userMediaConfig = {
        audio: {echoCancellation: true, noiseSuppression: true},
        video: {facingMode: "user"}
    };
    const [status, setStatus] = useState(false);

    const cleanUp = () => {
        if (peer) {
            peer.disconnect();
            peer.destroy();
        }
        setPeer(null);
    };

    useEffect( ()=> {
        setPeer(
            new Peer(props.userId, {
                    host: 'peertestq.herokuapp.com',
                    port: 443,
                    secure: true
                }
            )
        );
        setStatus(true);

    },[]);

    useEffect( () => {
        if (status) {
            if (!peer || peer.destroyed) {
                setPeer(
                    new Peer(props.userId, {
                            host: 'peertestq.herokuapp.com',
                            port: 443,
                            secure: true
                        }
                    )
                );
            } else if (peer.disconnected) {
                peer.reconnect();
            }
            peer.on('open', () => {
                setPeer(peer);
            });



            peer.on('call', (call) => {
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
              getUserMedia(userMediaConfig,(stream) => {
                        // Answer the call with an A/V stream.
                        call.answer(stream);
                        setAnswer(call);
                        if (videoL.current) {
                            videoL.current.srcObject = stream;
                        }
                        // Play the remote stream
                        call.on('stream', (remoteStream) => {
                            props.chatVideo();
                            if (videoR.current) {
                                videoR.current.srcObject = remoteStream;
                            }
                        });
                        call.on('close', () => {
                            console.log("The call has ended");
                        });
                        call.on('error', (error) => {
                            console.log(error);

                        });
                    });
            });

            peer.on('disconnected', () => {
                console.log("Peer desconnected");
                cleanUp()
            });

            peer.on('close', () => {
                console.log("Peer closed remotetly");
                cleanUp()
            });

            peer.on('error', (error) => {
                console.log("peer error", error);
                cleanUp()
            });

        }}, [props.peerWait]);

    useEffect( ()=> {
        if (status) {
            if (!peer || peer.destroyed) {
                setPeer(
                    new Peer(props.userId, {
                            host: 'peertestq.herokuapp.com',
                            port: 443,
                            secure: true
                        }
                    )
                );
            } else if (peer.disconnected) {
                peer.reconnect();
            }
            peer.on('open', () => {
                setPeer(peer);
            });
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia(userMediaConfig,(stream) =>{
                let call;
                while (!call) {
                    call = peer.call(props.currentVideoChatter.userId, stream);
                }
                    if (videoL.current) {
                        videoL.current.srcObject = stream;
                    }
                    call.on('stream', (remoteStream)=> {
                        props.chatVideo();
                        setCall(call);
                        if (videoR.current) {
                            videoR.current.srcObject = remoteStream;
                        }
                    })

                })
        }
        },[props.chatAccept]);


    const endCall = () => {
        if (call) {
            call.close();
        }
        cleanUp();
        props.endVideo();
        props.refuseVideoChat({
            purpose: 'CLIENT_REFUSE_VIDEO_CHAT',
            payload: {
                sender: {
                    username: props.username,
                    userId: props.userId
                },
                receiver: props.currentVideoChatter
            }
        });
    };

    const endAnswer = () => {
        if (answer) {
            answer.close();
        }
        cleanUp();
        props.endVideo();
    };

    const handleStatus = () => {
        if (props.chatStatus === 1) {
            return "WAITING";
        }
        if (props.chatStatus === 2) {
            return "DO U WANT TO CHAT WITH " + props.currentVideoChatter.username + "?";
        }
        if (props.chatStatus === 3) {
            return "CHAT WITH " + props.currentVideoChatter.username;
        }
        if (props.chatStatus === 4) {
            return "CHAT WITH " + props.currentVideoChatter.username;
        }
        if (props.chatStatus === 5) {
            return props.currentVideoChatter.username + " REFUSED";
        }
    };

    return <div style={{position: 'fixed', zIndex: '9999999', top: '0%'}}>
            <div style={{display: 'flex', flexDirection: 'column', top: '0%'}}>
                <video ref={videoR} autoPlay playsInline
                       style={props.screenHeight / props.screenWidth < 1.25 && props.screenWidth >= 800? {width: '30vw'} : {width: '70vw'}}/>
                <video ref={videoL} autoPlay muted playsInline
                       style={props.screenHeight / props.screenWidth < 1.25 && props.screenWidth >= 800? {width: '10vw'} : {width: '20vw'}}/>
            </div>
            <div style={{position: 'fixed', top: '50%', left: '35%'}}>
                <div>{handleStatus()}</div>
                <div>
                    <button onClick={props.caller ? () => endAnswer() : () => endCall()}
                            style={{color: 'red'}}>End Chat
                    </button>
                    <button onClick={props.caller ? ()=> {props.applyVideoChat({
                        purpose: "CLIENT_APPLY_VIDEO_CHAT",
                        payload: {
                            sender: {
                                userId: props.userId,
                                username: props.username,
                            },
                            receiver: props.currentVideoChatter,
                        }
                    });
                    props.waitCall();
                    } : () => props.acceptInvite()}
                            style={{color: 'red'}}>Begin Chat
                    </button>
                </div>
            </div>
        </div>
}


const mapStateToProps = (state) => {
    return {
        userId: state.userinfo.userId,
        username: state.userinfo.username,
        currentChatter: state.currentChatPerson,
        chatStatus: state.chatVideoStatus,
        currentVideoChatter: state.currentVideoChatPerson,
        caller: state.chatVideoCaller,
        screenWidth: state.screenWidth,
        screenHeight: state.screenHeight,
        chatAccept:state.chatAccept,
        peerWait: state.peerWait
    };
};

const mapAction = {
    endVideo: () => {
        return {
            type: "END_VIDEO"
        }
    },
    chatVideo: () => {
        return {
            type: 'CHAT_VIDEO'
        }
    },
    refuseVideoChat: (info) => {
        return {
            type: 'CLIENT_REFUSE_VIDEO_CHAT',
            payload: info
        }
    },
    applyVideoChat: (info) => {
        return {
            type: 'CLIENT_APPLY_VIDEO_CHAT',
            payload: info
        }
    },
    acceptInvite: ()=> {
        return {
            type: 'CHAT_ACCEPT',
        }
    },
    waitCall: ()=> {
        return {
            type: 'PEER_WAIT',
        }
    }

};


export default connect(mapStateToProps, mapAction)(VideoPort);

