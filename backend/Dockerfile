FROM node:18
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production
COPY . .
RUN npm run build
CMD ["node","dist/index.js"]
