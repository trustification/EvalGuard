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
*DefaultApi* | [**getReport**](docs/DefaultApi.md#getreport) | **GET** /reports/{report_id} | Get evaluation report by ID
*DefaultApi* | [**getReportMetrics**](docs/DefaultApi.md#getreportmetrics) | **GET** /reports/{report_id}/metrics | Get metrics for a specific report
*DefaultApi* | [**getThresholds**](docs/DefaultApi.md#getthresholds) | **GET** /thresholds | Get thresholds for multiple tasks and metrics
*DefaultApi* | [**listModels**](docs/DefaultApi.md#listmodels) | **GET** /models | List available models
*DefaultApi* | [**listReports**](docs/DefaultApi.md#listreports) | **GET** /reports | List evaluation reports
*DefaultApi* | [**listTasks**](docs/DefaultApi.md#listtasks) | **GET** /tasks | List available tasks


### Documentation For Models

 - [Errorschema](docs/Errorschema.md)
 - [GetReportMetrics200Response](docs/GetReportMetrics200Response.md)
 - [GetReportMetrics200ResponseMetricsInnerValue](docs/GetReportMetrics200ResponseMetricsInnerValue.md)
 - [GetThresholds200Response](docs/GetThresholds200Response.md)
 - [ListModels200Response](docs/ListModels200Response.md)
 - [ListTasks200Response](docs/ListTasks200Response.md)
 - [ModelError](docs/ModelError.md)
 - [ModelInfo](docs/ModelInfo.md)
 - [ModelInfoschema](docs/ModelInfoschema.md)
 - [PaginationInfo](docs/PaginationInfo.md)
 - [PaginationInfoschema](docs/PaginationInfoschema.md)
 - [Report](docs/Report.md)
 - [ReportContext](docs/ReportContext.md)
 - [ReportContextExecution](docs/ReportContextExecution.md)
 - [ReportContextTools](docs/ReportContextTools.md)
 - [ReportContextToolsLmEval](docs/ReportContextToolsLmEval.md)
 - [ReportContextToolsTransformers](docs/ReportContextToolsTransformers.md)
 - [ReportList](docs/ReportList.md)
 - [ReportListschema](docs/ReportListschema.md)
 - [ReportTasksInner](docs/ReportTasksInner.md)
 - [ReportTasksInnerNSamples](docs/ReportTasksInnerNSamples.md)
 - [Reportschema](docs/Reportschema.md)
 - [Task](docs/Task.md)
 - [Taskschema](docs/Taskschema.md)
 - [Threshold](docs/Threshold.md)
 - [Thresholdschema](docs/Thresholdschema.md)


<a id="documentation-for-authorization"></a>
## Documentation For Authorization

Endpoints do not require authorization.

