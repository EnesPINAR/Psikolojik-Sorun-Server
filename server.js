const express = require("express");
const ejs  = require('ejs');
const app = express();
const server = require("http").Server(app);
const { v4:uuid4 } = require("uuid");
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const helmet = require("helmet");
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cors = require('cors')
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug:true
})
require('dotenv').config();

// Router
const router = require("./Routes/router");

// Configure View Engine
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Peer js
app.use('/peerjs',peerServer);

//Configure Helmet
app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use(cors())

// Static Files
app.use("/public",express.static("./public"))

// Connection Database
const connect_url = "mongodb+srv://SoulFly579:mCNOfuHUz5JrDJKA@cluster0.wlnuy.mongodb.net/Psikolojik_Destek?retryWrites=true&w=majority";
mongoose.connect(connect_url,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
mongoose.connection.once('open', ()=>{
    console.log('Database bağlantısı başarılı...');
})

app.use(expressSession({
    secret:'lasdkalwdxzial',
    resave: false,
    saveUninitialized:true,
}))

//Router
app.use(router)


// Socket.io

io.on('connection', socket =>{
    socket.on('join-room', (roomId, userId)=>{
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
        socket.on('disconnect', ()=>{
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
        socket.on('message', message => {
            io.to(roomId).emit('createMessage',message)
        })
    })
})


server.listen(process.env.PORT || 5000);

