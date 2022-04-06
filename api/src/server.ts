import express from 'express';
const app = express();

/* Note: Kafka dependencies */
import { CompressionTypes, Kafka, logLevel } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'api',
    brokers: ['localhost:9092'],
    retry: {
        initialRetryTime: 300,
        retries: 10
    },
    // logLevel: logLevel.NOTHING
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'certificate-group-receiver' });

/* Note: Middleware of producer to all routes */
app.use((req, res, next) => {
    req['producer'] = producer;

    return next();
});

app.post('/generate-certificate', async (req, res) => {

    const message = {
        user: { id: 1, name: 'Dr4kk0nnys' },
        course: 'Kafka & Node.JS',
        grade: 10
    }

    /* TODO: Call microservice */
    await req['producer'].send({
        topic: 'issue-certificate',
        compression: CompressionTypes.GZIP,
        messages: [{ value: JSON.stringify(message) }]
    });

    return res.status(200).send({ ok: true });
});

const run = async () => {

    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'certification-response' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('Message', message);
        }
    });

    app.listen(3000, () => console.log('Running on port 3000'));
}

try {
    run();
} catch (e) {
    console.error(e);
}