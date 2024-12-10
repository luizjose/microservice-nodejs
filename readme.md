# Microservice Project with Node.js, PostgreSQL, Kafka, Zookeeper, Prisma, and Kong

Este projeto utiliza uma arquitetura de microserviços que integra diversos serviços como Node.js, PostgreSQL, Kafka, Zookeeper e Kong. O **Kong** é utilizado para orquestrar as APIs, consolidando os microserviços em uma única rede, e o **Prisma** é usado para facilitar a interação com o banco de dados PostgreSQL.

## Tecnologias

- **Node.js**: Framework backend para construção das APIs dos microserviços.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados.
- **Kafka**: Sistema de mensagens distribuído para comunicação assíncrona entre os microserviços.
- **Zookeeper**: Serve como um serviço de coordenação para o Kafka.
- **Kong**: API Gateway utilizado para gerenciar as APIs e realizar o roteamento de tráfego entre os microserviços.
- **Konga**: Interface gráfica para gerenciar o Kong.
- **Prisma**: ORM para facilitar a comunicação com o PostgreSQL.
- **TypeScript**: Utilizado para garantir maior segurança e robustez no desenvolvimento.

## Requisitos

Antes de começar, você precisa ter as seguintes ferramentas instaladas:

- **Node.js**: Para rodar os microserviços desenvolvidos em JavaScript/TypeScript.
- **Prisma**: Para gerenciar a interação com o banco de dados PostgreSQL.
- **Docker e Docker Compose**: Para orquestrar os containers que compõem o sistema.
- **Kong e Konga**: Para gerenciar as APIs e visualizar as configurações.

> Observação: Os serviços adicionais como PostgreSQL, Kafka e Zookeeper já estão configurados no arquivo `docker-compose.yml`.

## Conclusão

Este projeto oferece uma solução robusta para construir uma arquitetura de microserviços usando Node.js, PostgreSQL, Kafka, Zookeeper, Prisma e Kong. O Kong, como API Gateway, facilita a comunicação entre os serviços, enquanto o Prisma simplifica a interação com o banco de dados PostgreSQL.
