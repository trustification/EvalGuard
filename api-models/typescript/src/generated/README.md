## @trustification/evalguard-api-model@1.0.0-SNAPSHOT

This generator creates TypeScript/JavaScript client that utilizes [axios](https://github.com/axios/axios). The generated Node module can be used in the following environments:

Environment
* Node.js
* Webpack
* Browserify

Language level
* ES5 - you must have a Promises/A+ library installed
* ES6

Module system
* CommonJS
* ES6 module system

It can be used in both TypeScript and JavaScript. In TypeScript, the definition will be automatically resolved via `package.json`. ([Reference](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html))

### Building

To build and compile the typescript sources to javascript use:
```
npm install
npm run build
```

### Publishing

First build the package then run `npm publish`

### Consuming

navigate to the folder of your consuming project and run one of the following commands.

_published:_

```
npm install @trustification/evalguard-api-model@1.0.0-SNAPSHOT --save
```

_unPublished (not recommended):_

```
npm install PATH_TO_GENERATED_PACKAGE --save
```

### Documentation for API Endpoints

All URIs are relative to *https://api.evalguard.org/v1*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*GuardrailsApi* | [**getGuardrail**](docs/GuardrailsApi.md#getguardrail) | **GET** /guardrails/{guardrail_id} | Get guardrail by ID
*GuardrailsApi* | [**listGuardrails**](docs/GuardrailsApi.md#listguardrails) | **GET** /guardrails | List guardrails
*MetricsApi* | [**getMetric**](docs/MetricsApi.md#getmetric) | **GET** /metrics/{metric_id} | Get metric by ID
*MetricsApi* | [**listMetrics**](docs/MetricsApi.md#listmetrics) | **GET** /metrics | List available metrics
*ModelCardsApi* | [**listModelCards**](docs/ModelCardsApi.md#listmodelcards) | **GET** /model-cards | List model cards
*ModelsApi* | [**getModel**](docs/ModelsApi.md#getmodel) | **GET** /models/{model_id} | Get model by ID
*ModelsApi* | [**listModels**](docs/ModelsApi.md#listmodels) | **GET** /models | List available models
*ReportsApi* | [**getReport**](docs/ReportsApi.md#getreport) | **GET** /reports/{report_id} | Get evaluation report by ID
*TasksApi* | [**getTask**](docs/TasksApi.md#gettask) | **GET** /tasks/{task_id} | Get task by ID
*TasksApi* | [**listTasks**](docs/TasksApi.md#listtasks) | **GET** /tasks | List available tasks
*ThresholdsApi* | [**getThresholds**](docs/ThresholdsApi.md#getthresholds) | **GET** /thresholds | Get thresholds for multiple tasks and metrics


### Documentation For Models

 - [GuardrailsResponse](docs/GuardrailsResponse.md)
 - [Guardrailschema](docs/Guardrailschema.md)
 - [GuardrailschemaTargetsInner](docs/GuardrailschemaTargetsInner.md)
 - [MetricDefinitionschema](docs/MetricDefinitionschema.md)
 - [MetricsResponse](docs/MetricsResponse.md)
 - [ModelCardsResponse](docs/ModelCardsResponse.md)
 - [ModelCardschema](docs/ModelCardschema.md)
 - [ModelError](docs/ModelError.md)
 - [ModelInfoschema](docs/ModelInfoschema.md)
 - [ModelInfoschemaReferenceLinksInner](docs/ModelInfoschemaReferenceLinksInner.md)
 - [ModelsInfoResponse](docs/ModelsInfoResponse.md)
 - [PaginationInfo](docs/PaginationInfo.md)
 - [Reportschema](docs/Reportschema.md)
 - [ReportschemaContext](docs/ReportschemaContext.md)
 - [ReportschemaContextExecution](docs/ReportschemaContextExecution.md)
 - [ReportschemaContextTools](docs/ReportschemaContextTools.md)
 - [ReportschemaContextToolsLmEval](docs/ReportschemaContextToolsLmEval.md)
 - [ReportschemaContextToolsTransformers](docs/ReportschemaContextToolsTransformers.md)
 - [TaskDefinitionschema](docs/TaskDefinitionschema.md)
 - [TasksResponse](docs/TasksResponse.md)
 - [ThresholdsResponse](docs/ThresholdsResponse.md)
 - [Thresholdschema](docs/Thresholdschema.md)


<a id="documentation-for-authorization"></a>
## Documentation For Authorization

Endpoints do not require authorization.

