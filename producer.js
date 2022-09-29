const amqp = require('amqplib')

//* Create Channel

async function connectToService1 () {
  const queueName = 'service1'

  const connection = await amqp.connect('amqp://localhost:5672')
  const channel = await connection.createChannel()
  await channel.assertQueue(queueName, { durable: true })
  channel.sendToQueue(queueName, Buffer.from('Hey RabbitMQ'))
  console.log('message was sent to Server1')
}
connectToService1()
