# FROM ubuntu:latest
# COPY . .

FROM node:20-alpine
#RUN apk add --no-cache bash
#RUN apt-get update
#RUN apt-get install docker-compose-plugin

ENV dir=/app 
WORKDIR ${dir}
COPY package.json .
RUN npm install
# ARG NODE_ENV
# RUN echo "1-$NODE_ENV"
# RUN if [[ "$NODE_ENV" = "development" ]] ;\
#         then npm install ; \
#         else npm install --only=production ;\
#         fi
COPY . .
ENV PORT 3000
EXPOSE $PORT
CMD [ "npm", "run", "dev" ]