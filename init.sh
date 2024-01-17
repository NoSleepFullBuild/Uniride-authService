#!/bin/bash
export $(cat .env | xargs)
# Commandes pour démarrer vos services, par exemple :
docker-compose up -d
