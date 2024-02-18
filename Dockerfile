# Source: https://docs.adonisjs.com/cookbooks/dockerizing-adonis#document

FROM node:lts-alpine3.19

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit="dev"

# Copy app source code
COPY . .

# Build app
RUN npm install
RUN npm run build --production

COPY ./.env ./build

ENV PORT=$PORT
ENV HOST=0.0.0.0
ENV APP_KEY=DIhtF2IY1-MCAm_wlh3VYx7KLVOhpeOb
ENV NODE_ENV=production
ENV LOG_LEVEL=debug
ENV CACHE_VIEWS=false
ENV SESSION_DRIVER=cookie

# Expose port
EXPOSE $PORT

# Start app
CMD node build/bin/console.js migration:run --force && node build/bin/server.js
