import express from 'express';
const app = express();

/* Note: Kafka dependencies */
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'api',
    brokers: ['localhost:9092'],
    retry: {
        initialRetryTime: 3000,
        retries: 10
    }
});

const producer = kafka.producer();


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
        messages: [{ value: JSON.stringify(message) }]
    });

    return res.status(200).send({ ok: true });
});

const run = async () => {

    await producer.connect();

    app.listen(3000, () => console.log('Running on port 3000'));
}

try {
    run();
} catch (e) {
    console.error(e);
}