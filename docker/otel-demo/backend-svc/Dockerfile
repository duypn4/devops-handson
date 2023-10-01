FROM node

WORKDIR /backend/app

COPY package*.json .

RUN npm install

COPY *.js .

ENV OTEL_TRACES_EXPORTER="otlp"
ENV OTEL_EXPORTER_OTLP_ENDPOINT="http://collector:4318"
ENV OTEL_NODE_RESOURCE_DETECTORS="env,host,os"
ENV OTEL_SERVICE_NAME="backend-svc"
ENV NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register"

EXPOSE 80

CMD ["node", "index.js"]