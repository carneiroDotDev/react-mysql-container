FROM node:20

WORKDIR /back

COPY package.json .

RUN npm install

COPY . .

COPY .env.sample .env

#TO DO - The port number must be obtainer from .env file
EXPOSE 7700

CMD npm run dev

#docker build -t node-trial .
#docker run --rm -d -p 7700:7700 --name running-server-trial node-trial

#docker run --name running-db-trial -d -p 3306:3306 --rm -v mysqldb:var/lib/mysql -e MYSQL_ROOT_PASSWORD='mysqldatabase' mysql:latest