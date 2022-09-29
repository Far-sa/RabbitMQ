const amqp = require('amqplib')

//* Create Channel

async function receiveFromProducer () {
  const connection = await amqp.connect('amqp://localhost:5672')
  const channel = await connection.createChannel()

  const queueName = 'Task'
  await channel.assertQueue(queueName, { durable: true })
  let index = 0
  await channel.consume(
    queueName,
    msg => {
      console.log(`${index}`, msg.content.toString())
      index++
    },
    { noAck: true }
  )
}

receiveFromProducer()
