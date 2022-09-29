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
  setInterval(() => {
    connection.close()
    process.exit(0)
  }, 1000)
}
sendMsgToTask()
