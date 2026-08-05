import amqp from 'amqplib';

export async function publishBookingCreated(booking: any) {
  const connection = await amqp.connect(process.env.RABBITMQ_URL!);

  const channel = await connection.createChannel();

  const queue = 'booking_events';

  await channel.assertQueue(queue);

  channel.sendToQueue(
    queue,
    Buffer.from(
      JSON.stringify({
        event: 'BOOKING_CREATED',
        data: booking,
      })
    )
  );

  console.log('Booking event sent');

  await connection.close();
}
