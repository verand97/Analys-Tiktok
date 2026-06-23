FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate || true
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/viralpulse"
RUN npm run build

CMD ["npm", "start"]
