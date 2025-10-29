import amqp from "amqplib";
import { QueuingSystem } from "./queue";

export class RabbitMQ extends QueuingSystem {
  private static channel: amqp.Channel | null = null;
  private static connection: amqp.ChannelModel | null = null;

  static async connect(url?: string) {
    if (this.channel) return this.channel;

    const connectionUrl = url || process.env.RABBITMQ_URL || "amqp://localhost";
    this.connection = await amqp.connect(connectionUrl);
    this.channel = await this.connection.createChannel();

    console.log("✅ Connected to RabbitMQ");
    return this.channel;
  }

  static async assertQueue(queue: string) {
    if (!this.channel) await this.connect();
    await this.channel!.assertQueue(queue, { durable: true });
    console.log(`📦 Queue asserted: ${queue}`);
  }

  static async publish(queue: string, payload: Object) {
    if (!this.channel) await this.connect();
    const buffer = Buffer.from(JSON.stringify(payload));
    await this.channel!.assertQueue(queue, { durable: true });
    this.channel!.sendToQueue(queue, buffer, { persistent: true });
    console.log(`📤 Message sent to ${queue}:`, payload);
  }

  static async subscribe(queue: string, callback: (msg: unknown) => void) {
    if (!this.channel) await this.connect();
    await this.channel!.assertQueue(queue, { durable: true });

    this.channel!.consume(
      queue,
      (msg) => {
        if (msg) {
          const content = JSON.parse(msg.content.toString());
          callback(content);
          this.channel!.ack(msg);
        }
      },
      { noAck: false }
    );

    console.log(`📥 Subscribed to queue: ${queue}`);
  }

  static async rpc(queue: string, payload: Object) {
    if (!this.channel) await this.connect();
    await this.channel!.assertQueue(queue, { durable: true });

    return await new Promise((resolve) => {
      const buffer = Buffer.from(JSON.stringify(payload));
      this.channel!.sendToQueue(queue, buffer, { persistent: true });

      this.channel!.consume(
        queue,
        (msg) => {
          if (msg) {
            const content = JSON.parse(msg.content.toString());
            resolve(content);
            this.channel!.ack(msg);
          }
        },
        { noAck: false }
      );
    });
  }
}
