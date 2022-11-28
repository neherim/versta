# Versta

Versta collects [AsyncAPI](https://www.asyncapi.com/) description from microservices and shows a map of interaction between them.

For example we have 3 services (`scrooge-message-registry`, `scrooge-person`, `scrooge-statement`). Each service has an `/async-api` http endpoint, that returns a JSON in [AsyncAPI](https://www.asyncapi.com/) format, that discribes which queue that service is consuming or in which he is producing messages and the types of those messages. So if we collect all that information, than we could show the links between those services. 

![schema](./doc/screen1.png)

For each service, the types of messages consumed are displayed on the left, and the types of messages produced are displayed on the right.

This project was created only to improve Haskell and TypeScript skills.
