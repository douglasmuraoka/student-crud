FROM node:alpine
WORKDIR '/client'
COPY ./package.json ./
RUN npm i
# Only copies the rest of the directory content after installing the node modules,
# so that we can make use of the Docker cache
COPY . .
EXPOSE 3000
CMD ["npm", "start"]