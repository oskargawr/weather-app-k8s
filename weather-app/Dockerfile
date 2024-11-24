FROM node:18-alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
ENV VITE_KEYCLOAK_URL=http://localhost:8080
ENV VITE_KEYCLOAK_REALM=weather-app
ENV VITE_KEYCLOAK_CLIENT_ID=myclient
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html