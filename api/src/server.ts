import express from 'express';
const app = express();

/* Note: Kafka dependencies */
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'api',
    brokers: ['kafka:9092']
});
const producer = kafka.producer();

/* Note: Middleware of producer to all routes */
app.use((req, res, next) => {
    req['producer'] = producer;

    return next();
});

const run = async () => {

    // await producer.connect();

    app.listen(3000, () => console.log('Running on port 3000'));
}

try {
    run();
} catch (e) {
    console.error(e);
}

app.post('/generate-certificate', async (req, res) => {

    /*
        * TODO: Call microservice
    */

    console.log(req['producer']);

    return res.status(200).send({ ok: true });
});
