//const { PeerServer } = require("peer");

//const { text } = require("body-parser");

//const { Socket } = require("dgram");
const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;


const peers = {}

var peer = new Peer(undefined,{
    path: '/peerjs',
    host: '/',
    port: '5000'
});


let myVideoStream
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream =>{
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
    
    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', (userId)=>{
        connecToNewUser(userId,stream);
    })
})

peer.on('open', id =>{
    socket.emit('join-room', ROOM_ID, id);
})

socket.on('user-disconnected',userId => {
    if (peers[userId]) peers[userId].close()
})

const connecToNewUser = (userId,stream) => {
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', ()=>{
        video.remove()
    })

    peers[userId] = call
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', ()=>{
        video.play();
    })
    videoGrid.append(video);
}

let text = $('#chat-input');
$('html').keydown((e) =>{
    if(e.which == 13 && text.val().length !== 0){
        var sender = localStorage.getItem('username');
        var message = text.val();
        socket.emit('message', {sender:sender,message:message})
        text.val('')
    }
})

socket.on('createMessage', message=>{
    $('ul').append(`<li style="color: #fff;">User<p>${message.message}</p></li>`)
})

const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if(enabled) {
        muteMic()
        myVideoStream.getAudioTracks()[0].enabled = false;
    }else{
        Unmutemic()
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}
const playStop = () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    if(enabled) {
        disableVideo(localStorage.getItem('username'))
        myVideoStream.getVideoTracks()[0].enabled = false;
    }else{
        enableVideo();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}

const enableVideo = () => {
    var html = "<i class='fas fa-video'></i><p>Stop video</p>";
    document.querySelector('.camera').innerHTML = html;
}
const disableVideo = (username) => {
    var html = "<i class='fas fa-video-slash'></i><p>Start video</p>";
    document.querySelector('.camera').innerHTML = html;
}
const muteMic = () => {
    var html = "<i class='fas fa-microphone-slash'></i></i><p>UnMute</p>";
    document.querySelector('.microphone').innerHTML = html;
}
const Unmutemic = () => {
    var html = "<i class='fas fa-microphone'></i></i><p>Mute</p>";
    document.querySelector('.microphone').innerHTML = html;
}