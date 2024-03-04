# Étape 1: Définir l'image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 2: Copier les fichiers de dépendances
COPY package*.json ./

# Étape 2.1: Installer les dépendances publiques
RUN npm install

# Étape 2.2: Installer la dépendance depuis le dépôt Git privé
# Assurez-vous que la variable d'environnement TOKEN_REPO est définie
ARG TOKEN_REPO
RUN npm install git+https://${TOKEN_REPO}:x-oauth-basic@github.com/nosleepfullbuild/uniride-library.git

# Copier le reste du code source de l'application dans le conteneur
COPY . .
COPY .env.local .env

# Étape 3: Compiler le code TypeScript en JavaScript
RUN npm run build

# Étape 4: Exposer le port de l'application
EXPOSE 3004

RUN npm run start --ignore-errors
