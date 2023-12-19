FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3333

RUN npx prisma migrate dev

CMD ["npm", "run", "dev"]