FROM node:18-bullseye-slim
WORKDIR /index
COPY package.json /index
RUN npm install 
COPY . /index
EXPOSE 3000
CMD [ "npm", "run", "doc" ]