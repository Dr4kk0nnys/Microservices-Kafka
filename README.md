# Tutorial from [Rocketseat]('https://www.youtube.com/watch?v=-H8pD7sMcfo')

- Utilize Kafka

## Applications

- Main api
- Separate main application of main api (create certificate e.g)

## Flow

- Main api send a message to certificate micro service (this) to generate certificate
- Certificate microservice returns a response (sync/async)

## What we know

- Rest(latency is an issue)
- We could use: Redis / RabbitMQ / **Kafka**