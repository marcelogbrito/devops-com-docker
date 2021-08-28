# Aplicação API Express dockeirizada

Aplicação que aplica conceitos Devops utilizando-se de containers Docker

Imagens utilizadas

* base **Node:alpine**
* banco de dados **MongoDB**
* banco de dados cache para prover sessão autenticada **Redis**
* proxy reverso e load balancer **Nginx**

Comandos docker para lembrar:
```docker build -t node-app-image .``` constrói a imagem docker de acordo com o arquivo Dockerfile
```docker-compose -f docker-compose.yml -f docker.compose.dev.yml up -d``` utilizando docker-compose . comando up para subir
```docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v``` utilzando docker compose para destruir os containers e -v pra derrubar os volumes (cuidado com volumes que precisam ser persistentes)
```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build``` docker compose com --build no final ativa a reconstrução da imagem de acordo com Dockerfile
```docker logs``` verifica os logs do container que está rodando . deve ser passado como parametro o identificador do container
```docker exec -it node-docker_mongo_1 bash``` executa aplicações internas dentro do container. nesse caso a aplicação bash
```docker exec -it node-docker_mongo_1 mongo -u "sanjeev" -p "mypassword"``` inicia uma sessão de comandos dentro do mongodb container
``` docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale meu-node-app=2``` docker compose up com escalabilidade . nesse caso cria 2 containers da aplicação para serem utilizados no load balancer do nginx
