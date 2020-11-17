FROM node

RUN apt-get update -qq && apt-get install -y build-essential

WORKDIR /app

COPY package.json /app

RUN npm install 

COPY . /app

EXPOSE 3000
# start app
CMD ["npm", "start"]