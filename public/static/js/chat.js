$(function() {

const socket = io();

socket.on( 'messages' , ( data ) => {
  console.log( data )
  renderMessage( data )
} )

function renderMessage( data )
{
  let html = data.map( ( e, i ) => {
    return (
      `<li>
        <strong>${ e.author }</strong>
        <em>${ e.text }</em>
      </li>`
    )
  } ).join( ' ' )

  $( '#message' ).html( html )
}

var
  form = $( '#form-chat' )

form.submit( sendServer )

function sendServer( e )
{
  e.preventDefault()

  let datos = form.serializeArray()
  
  socket.emit( 'msg', datos )

  form.find( ':text' ).val( '' )

  return false;
}

socket.on( 'msg', ( m ) => {
  $( '#message' ).append( $( '<li></li>').text( m ) )  
} )
  
})