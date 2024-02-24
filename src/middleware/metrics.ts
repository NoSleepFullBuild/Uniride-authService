import express from 'express';
import { collectDefaultMetrics, Registry } from 'prom-client';

const metricsApp = express();
const register = new Registry();

collectDefaultMetrics({ register });

metricsApp.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
});

metricsApp.listen(9100, () => {
    console.log('Metrics server listening on port 9100');
});
