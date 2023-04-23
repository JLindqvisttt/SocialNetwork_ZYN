FROM node:18.12 as build


WORKDIR /react-app


COPY package*.json .


RUN npm install


COPY . .


RUN npm run build


FROM nginx:1.19


COPY ./nginx/* /etc/nginx/


COPY --from=build /react-app/build /usr/share/nginx/html