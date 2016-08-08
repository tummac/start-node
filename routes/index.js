'use strict'

const
  express  = require( 'express' ),
  path     = require( 'path' ),
  router   = express.Router(),
  BASE_DIR = path.join( __dirname, '..', 'public' )

router.use( ( req, res, next ) => {
  console.log( 'Time: ', Date.now() )

  next()
} )

router.get( '/', ( req, res ) => {
  // res.sendFile( path.join( BASE_DIR, 'templates', 'index.html' ) )
  res.render( 'index', { title: 'Inicio' } )
} )

router.get( '/chat', ( req, res ) => {
  res.render( 'chat', { title: 'Chat real time'})
} )

router.get( '/about', ( req, res ) => {
  // res.sendFile( path.join( BASE_DIR, 'templates', 'about.html' ) )
  res.render( 'about', { title: 'About' } )
} )


module.exports = router