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

function sendClient(message,portClient)
{
  server.send(Buffer.from(message.toString()),portClient,'localhost',function(error){
    if(error){
      server.close();
    }else{
      //console.log('Message sent to client!');
    }
  });
}

//emits when socket is ready and listening for datagram msgs
server.on('message',function(msg,info){

    console.log('CLIENT '+info.port +': '+ msg.toString());
    //const array = msg.toString();
    const array = msg.toString().split(" ");
    const parm1 = parseInt(array[0]);
    const parm2 = parseInt(array[2]);
    //console.log('CLIENT '+info.port +': '+ array);
    switch (array[1]) {
        case '-':
          var result = parm1 - parm2;
          break;
        case '+':
          var result = parm1 + parm2;
          break;
        case '*':
          var result = parm1 * parm2;
          break;
        case '/':
          var result = parm1 / parm2;
          break;
        default:
          console.log(`Sorry, ${array[1]} no is an operacion valid.`);
          sendClient(`Sorry, ${array[1]} no is an operacion valid.`, info.port);
      }
      console.log('Resutado: '+result);
      sendClient('Resutado: '+result, info.port);
});

//get stdin
rl.addListener('line',line => {
  console.log(line);
  //sending msg
  sendClient(line,info.port);
});
rl.close();

server.bind(8081);