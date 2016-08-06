'use strict'

const
  express = require( 'express' ),
  path    = require( 'path' ),
  routes  = require( './routes' ),
  app     = express(),
  server  = require( 'http' ).Server( app ),
  io      = require( 'socket.io' )( server )
  // MongoClient = require( 'mongodb' ).MongoClient,
// app ---------- ++
app.set( 'port', ( process.env.PORT || 3000 ) )

// app.use( express.static( __dirname + '/public' ) )
app.use( '/static', express.static(  __dirname + '/public/static' ) )
app.use( '/media', express.static( __dirname + '/public/media' ) )

// Routes

app.use( '/', routes )

// socket.io ---------------- >>
var messages = [
  {
    id: 1,
    text: 'hola soy un mensaje',
    author: 'tú:M_a'
  }
]

io.on( 'connection', ( socket ) => {
  console.log( 'user connected!' )

  socket.emit( 'messages', messages )

  socket.on( 'disconnect', () => {
    console.log( 'user disconnect!' )
  } )

  socket.on( 'msg', ( data ) => {
    io.emit( 'msg', data[ 0 ].value )
  } )
} )

// MongoDB
// MongoClient.connect( 'mongodb://localhost:27017/mydb', ( err, db ) => {
//   if ( err ) throw err

//   db.collection( 'users' ).find().toArray( ( err, result ) => {
//     if ( err ) throw err

//     console.log( result )
//   } )
// } )

server.listen( app.get( 'port' ), () => {
  console.log( 'The servidor running in port: ', app.get( 'port' ) )
} )