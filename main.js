var mqtt = require('mqtt')

var options = {
    host: '332c928ce0a245ccb9a79bcac85fdb89.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'francis',
    password: '1@Ab56ab56'
}

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('mqtt/face/kxgu4000lknm/Rec');