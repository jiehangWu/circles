import React, {useEffect, useState} from "react";
import Peer from 'peerjs';
import {connect} from "react-redux";

class VideoPort extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            progress: 0,
            videoSrc1:null,
            peer: new Peer({
                host: 'peertestq.herokuapp.com',
                port: 443,
                //key: 'peerjs',
                //path: '/peerjs',
                secure: true
            }),
            call: null,
            answer: null,
        }
        this.createConnection = this.createConnection.bind(this);
        this.callRemote = this.callRemote.bind(this);
        this.handleVideoRemoteStream = this.handleVideoRemoteStream.bind(this);
        this.endCall = this.endCall.bind(this);
        this.waitConnect = this.waitConnect.bind(this);
        this.answerRemote = this.answerRemote.bind(this);
        this.handleRemoteCallee = this.handleRemoteCallee.bind(this);
        this.endAnswer = this.endAnswer.bind(this);
        this.videoR = React.createRef();
        this.videoL = React.createRef();
        this.handleStatus = this.handleStatus.bind(this);
    }

    componentDidMount = () => {
        setTimeout(()=>{this.setState({
            peer:
                new Peer(this.props.userId,{
                    host: 'peertestq.herokuapp.com',
                    port: 443,
                    //key: 'peerjs',
                    //path: '/peerjs',
                    secure: true
                })

        })

        },100);
    }

    createConnection = () => {
        this.props.chatVideo();
        if (this.state.peer.id !== this.props.userId) {
            this.state.peer.disconnect();
            this.state.peer.destroy();
        }
        if (!this.state.peer||this.state.peer.destroyed) {
            this.setState({
                peer:
                    new Peer(this.props.userId,{
                        host: 'peertestq.herokuapp.com',
                        port: 443,
                        //key: 'peerjs',
                        //path: '/peerjs',
                        secure: true
                    })

            })
        } else if (this.state.peer.disconnected){
            this.state.peer.reconnect();
        }
        const userMediaConfig = {
            audio: { echoCancellation: true, noiseSuppression: true },
            video: { facingMode: "user" }
        };
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia(userMediaConfig, this.callRemote, function(err) {
            console.log('Failed to get local stream' ,err);
        });
    }

    callRemote = (stream) => {
        const call = this.state.peer.call(this.props.currentVideoChatter.userId, stream);
        this.setState({call:call});
        if (this.videoL.current) {
                this.videoL.current.srcObject = stream;
        }
        call.on('stream', this.handleVideoRemoteStream)
    }

    handleVideoRemoteStream = (rstream) => {
        console.log(this.state.peer.id);
    if (this.videoR.current) {
        this.videoR.current.srcObject = rstream;
        }
    }

    endCall = () => {
        if (this.state.call) {
            this.state.call.close();
        }
        this.props.endVideo();
        this.props.refuseVideoChat({
            purpose: 'CLIENT_REFUSE_VIDEO_CHAT',
            payload: {
                sender: {
                  username:this.props.username,
                  userId:this.props.userId
                },
                receiver: this.props.currentVideoChatter
            }
        });
    }


    ////
    waitConnect = ()=> {
        this.props.applyVideoChat({purpose: "CLIENT_APPLY_VIDEO_CHAT",
            payload: {
                sender: {
                    userId: this.props.userId,
                    username: this.props.username,
                },
                receiver: this.props.currentVideoChatter,
            }
        });
        console.log(this.state.peer.id);
        if (this.state.peer.id !== this.props.userId) {
            this.state.peer.disconnect();
            this.state.peer.destroy();
        }
        if (!this.state.peer || this.state.peer.destroyed) {
            this.setState({
                peer:
                    new Peer(this.props.userId,{
                        host: 'peertestq.herokuapp.com',
                        port: 443,
                        //key: 'peerjs',
                        //path: '/peerjs',
                        secure: true
                    })

            })
        } else if (this.state.peer.disconnected){
            this.state.peer.reconnect();
        }
        this.state.peer.on('call', this.answerRemote);
    }

    answerRemote = (call)=> {
        const userMediaConfig = {
            audio: { echoCancellation: true, noiseSuppression: true },
            video: { facingMode: "user" }
        };
        this.setState({answerCall: call});
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia(userMediaConfig, this.handleRemoteCallee,function(err) {
            console.log('Failed to get local stream' ,err);
        });
    }

    handleRemoteCallee = (stream)=> {
        this.state.answerCall.answer(stream);
        this.props.chatVideo();
        if (this.videoL.current) {
            this.videoL.current.srcObject = stream;
        }
        this.state.answerCall.on('stream',this.handleVideoRemoteStream);
    }

    endAnswer = () => {
        if (this.state.answerCall) {
            this.state.answerCall.close();
        }
        this.props.endVideo();
    }

    handleStatus = () => {
        if (this.props.chatStatus === 1) {
            return "WAITING";
        }
        if (this.props.chatStatus === 2) {
            return  "DO U WANT TO CHAT WITH " + this.props.currentVideoChatter.username + "?";
        }
        if (this.props.chatStatus === 3) {
            return "CHAT WITH " + this.props.currentVideoChatter.username;
        }
        if (this.props.chatStatus === 4) {
            return "CHAT WITH " + this.props.currentVideoChatter.username;
        }
        if (this.props.chatStatus === 5) {
            return this.props.currentVideoChatter.username + " REFUSED";
        }
    }

    render() {
        return <div style={{ position:'fixed',zIndex:'100', bottom: '15%',left:'10%',display:'flex',flexDirection:'column'}}>
            <div>
            <video ref={this.videoR} autoPlay playsinline style={{width:"420px",}}/>
            <video ref={this.videoL} autoPlay muted playsinline style={{width:"200px", position:"relative", right:'200px'}}/>
            </div>
                <div style={{alignSelf:'flex-end', position:'relative', right:'200px'}}>
                    <div>{this.handleStatus()}</div>
            <button onClick={this.props.caller?()=>this.endAnswer():()=>this.endCall()} style={{color:'red'}}>End Chat</button>
            <button onClick={this.props.caller?()=>this.waitConnect():()=>this.createConnection()} style={{color:'red'}}>Begin Chat</button>
                    </div>
        </div>

    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userinfo.userId,
        username: state.userinfo.username,
        currentChatter: state.currentChatPerson,
        chatStatus: state.chatVideoStatus,
        currentVideoChatter: state.currentVideoChatPerson,
        caller: state.chatVideoCaller,
    };
};

const mapAction = {
    endVideo: ()=> {
        return {
            type:"END_VIDEO"
        }
    },
    chatVideo: ()=> {
        return {
            type: 'CHAT_VIDEO'
        }
    },
    refuseVideoChat: (info) => {
        return {
            type:'CLIENT_REFUSE_VIDEO_CHAT',
            payload: info
        }
    },
    applyVideoChat: (info)=> {
        return{
            type: 'CLIENT_APPLY_VIDEO_CHAT',
            payload: info
        }
    },

}


export default connect(mapStateToProps, mapAction)(VideoPort);

