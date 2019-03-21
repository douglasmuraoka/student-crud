FROM node:alpine
WORKDIR '/server'
COPY ./package.json ./
RUN npm i
# Only copies the rest of the directory content after installing the node modules,
# so that we can make use of the Docker cache
COPY . .
EXPOSE 4000
CMD ["npm", "start"]