FROM node:20

WORKDIR /back

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8800

CMD npm run dev

#docker run --name koerberdb -d -p 3306:3306 --rm -v mysqldb:var/lib/mysql -e MYSQL_ROOT_PASSWORD='mysqldatabase' mysql:latest