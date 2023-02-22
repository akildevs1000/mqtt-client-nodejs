require("dotenv").config();

const mqtt = require("mqtt");
const { HOST, PORT, USER, PASSWORD } = process.env;
const { MQTTRECTOPIC, MQTTSNAPTOPIC, MQTTACKTOPIC } = process.env;
const CONNECTION_STRING = `mqtt://${HOST}:${PORT}`;
const CLIENT_ID = `mqtt_${Math.random().toString(16).slice(3)}`;

const OPTIONS = {
  CLIENT_ID,
  clean: true,
  connectTimeout: 4000,
  username: USER,
  password: PASSWORD,
  reconnectPeriod: 1000,
};

const client = mqtt.connect(CONNECTION_STRING, OPTIONS);

let mqttTopics = [MQTTRECTOPIC, MQTTSNAPTOPIC, MQTTACKTOPIC];

const getErrors = (error) => {
  if (error) {
    console.error(error);
  }
};

const getTopics = (mqttTopics) => {
  console.log(`Topics = ${mqttTopics.join()}`);
};

const processEvent = (topic, payload) => {
  let json = JSON.parse(payload.toString());
  let { personId, similarity1, persionName, time } = json.info;

  console.log(`Data coming from '${topic} Topic'`);

  console.log(
    `personId = ${personId},`,
    `similarity = ${similarity1},`,
    `persionName = ${persionName},`,
    `time = ${time}`
  );

  console.log(payload.toString());
};
client.on("errors", (error) => {
  console.log(error);
});
client.on("connect", () => {
  console.log("MQTT Connected");

  client.subscribe(mqttTopics, getTopics(mqttTopics), getErrors());
  // client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, getErrors())
});

client.on("message", processEvent, getErrors());
