import express from 'express';
const app = express();

app.post('/generate-certificate', async (req, res) => {

    /*
        * TODO: Call microservice
    */


    return res.status(200).send({ ok: true });
})

app.listen(3000, () => console.log('Running on port 3000'));