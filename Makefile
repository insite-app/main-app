DOCKER_USERNAME ?= astradzhao
APPLICATION_NAME ?= main-app

build:
			docker build --tag ${DOCKER_USERNAME}/${APPLICATION_NAME} . --no-cache

push:
			docker push ${DOCKER_USERNAME}/${APPLICATION_NAME}

run:
			docker run -p 3000:80 -d ${DOCKER_USERNAME}/${APPLICATION_NAME}

stop:
			docker stop $(shell docker ps -q --filter ancestor=${DOCKER_USERNAME}/${APPLICATION_NAME} )

dev:
			docker-compose up --build app

start:
			docker-compose up --build -d

rebuild:
			docker-compose down --volumes --remove-orphans
			docker-compose up --build -d