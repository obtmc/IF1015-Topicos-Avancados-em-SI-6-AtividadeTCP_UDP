// -------------------- udp client ----------------
const udp = require('dgram');
const buffer = require('buffer');
const readline = require('readline')

// creating a client socket
var client = udp.createSocket('udp4');

//buffer msg
//var data = Buffer.from('oliviabia');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//get stdin
rl.addListener('line',line => {
    //sending msg
    client.send(line,8081,'localhost',function(error){
    if(error){
      client.close();
    }else{
      console.log('Message sent to server!!!');
    }
  });
})

client.on('message',function(msg,info){
  console.log('SERVER: ' + msg.toString());
  //console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});