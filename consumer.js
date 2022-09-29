const amqp = require('amqplib')

//* Create Channel

async function receiveFromProducer () {
  const queueName = 'service1'
  
  const connection = await amqp.connect('amqp://localhost:5672')
  const channel = await connection.createChannel()
  await channel.assertQueue(queueName, { durable: true })
  await channel.consume(queueName, msg => {
    console.log(msg.content.toString())
  })
}

receiveFromProducer()
