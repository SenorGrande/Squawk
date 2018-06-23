FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# So ifconfig can be used...
RUN apt-get -qq update
RUN apt-get install -y net-tools

# Bundle app source
COPY . .

EXPOSE 8090
CMD [ "npm", "start" ]
