// const opentelemetry = require("@opentelemetry/api");
const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
const { WebTracerProvider } = require("@opentelemetry/sdk-trace-web");
const {
  ConsoleSpanExporter,
  BatchSpanProcessor
} = require("@opentelemetry/sdk-trace-base");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");

const resource = Resource.default().merge(
  new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "vote-svc",
    [SemanticResourceAttributes.SERVICE_VERSION]: "0.1.0",
  }),
);

function initTraceProvider() {
  const provider = new WebTracerProvider({
    resource: resource,
  });
  const consoleExporter = new ConsoleSpanExporter();
  const otlpTraceExporter = new OTLPTraceExporter({
    url: "http://collector:4318/v1/traces",
    headers: {}
  });
  const processor = new BatchSpanProcessor(otlpTraceExporter);
  provider.addSpanProcessor(processor);
  
  provider.register();
}

module.exports = {
  initTraceProvider
};