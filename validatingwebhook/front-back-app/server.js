const express = require('express')
const client = require('prom-client')
const app = express()

const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics()

const httpRequestCounter = new client.Counter({
	name: 'http_requests_total',
	help: 'Общее количество HTTP-запросов',
	labelNames: ['method', 'route', 'status_code'],
})

app.use((req, res, next) => {
	res.on('finish', () => {
	 httpRequestCounter.labels(req.method, req.path, res.statusCode).inc()
	})
	next()
})

app.get('/api', (req, res) => {
  res.json({ msg: 'Hello from backend' })
})

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})

app.listen(3000, () => console.log('Server running on port 3000'))
