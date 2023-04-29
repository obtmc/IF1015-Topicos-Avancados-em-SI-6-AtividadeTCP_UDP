// -------------------- udp server ----------------
const udp = require('dgram');
// creating a udp server
const server = udp.createSocket('udp4');
const buffer = require('buffer');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//buffer msg
//var data = Buffer.from('oliviabia');

//emits when socket is ready and listening for datagram msgs
server.on('message',function(msg,info){
    console.log('CLIENT '+info.port +': '+ msg.toString())

  //get stdin
    rl.addListener('line',line => {
        console.log(line);
        //var data = Buffer.from(line);
        //sending msg
        server.send(line,info.port,'localhost',function(error){
            if(error){
            server.close();
            }else{
            console.log('Message sent to client!');
            }
        });
    });
});

server.bind(8081);