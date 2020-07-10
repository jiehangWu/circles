FROM mhart/alpine-node:latest

WORKDIR /backend
# copy package.json into the container at /client
COPY package*.json /backend/

RUN npm install

COPY . /backend/

EXPOSE 5000
# Run the app when the container launches
CMD ["npm", "run", "start-server"]