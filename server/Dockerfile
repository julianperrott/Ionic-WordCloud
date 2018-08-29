FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

# docker build -t node-webwordcloud .
# docker run -p 3000:3000 -d node-webwordcloud

# docker login --username=julianperrott
# docker tag node-webwordcloud julianperrott/node-webwordcloud:firsttry
# docker push julianperrott/node-webwordcloud