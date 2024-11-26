FROM node:20 as font-build

WORKDIR /front

COPY . .

COPY .env.sample .env

EXPOSE 5173

RUN npm install

CMD ["npm", "run", "dev"]

#docker build -t vite-trial .
#docker run --rm -d -p 5173:5173 --name running-vite-trial vite-trial