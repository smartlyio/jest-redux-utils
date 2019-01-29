FROM node:current-slim

WORKDIR /app

COPY .npmrc package.json yarn.lock ./

RUN set -ex; \
  yarn install --frozen-lockfile

COPY . ./

ENTRYPOINT [ "yarn" ]
CMD ["test"]
