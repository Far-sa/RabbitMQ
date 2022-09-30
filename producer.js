const amqp = require('amqplib')

//* Create Channel

async function sendMsgToTask () {
  const connection = await amqp.connect('amqp://localhost:5672')
  const channel = await connection.createChannel()

  const queueName = 'Task'
  await channel.assertQueue(queueName, { durable: true })
  channel.sendToQueue(queueName, Buffer.from('Hey RabbitMQ'), {
    persistent: true
  })
  console.log('message was sent to Server1')

  for (let index = 0; index < 15; index++) {
    sendMsgToTask()
  }

  // setTimeout(() => {
  //   connection.close()
  // }, 1000)
}
//setInterval(() => sendMsgToTask(), 1000)
