# DefaultApi

All URIs are relative to *https://api.evalguard.org/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getReport**](#getreport) | **GET** /reports/{report_id} | Get evaluation report by ID|
|[**getReportMetrics**](#getreportmetrics) | **GET** /reports/{report_id}/metrics | Get metrics for a specific report|
|[**getThresholds**](#getthresholds) | **GET** /thresholds | Get thresholds for multiple tasks and metrics|
|[**listModels**](#listmodels) | **GET** /models | List available models|
|[**listReports**](#listreports) | **GET** /reports | List evaluation reports|
|[**listTasks**](#listtasks) | **GET** /tasks | List available tasks|

# **getReport**
> Report getReport()

Retrieve a specific evaluation report by its unique identifier. Returns the complete report including context, tasks, and results. 

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let reportId: string; //Unique identifier of the report (default to undefined)

const { status, data } = await apiInstance.getReport(
    reportId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportId** | [**string**] | Unique identifier of the report | defaults to undefined|


### Return type

**Report**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Evaluation report details |  -  |
|**404** | Report not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getReportMetrics**
> GetReportMetrics200Response getReportMetrics()

Retrieve only the metrics/results for a specific evaluation report. Useful when you only need the performance data without the full context. 

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let reportId: string; //Unique identifier of the report (default to undefined)
let metric: string; //Filter to specific metric(s) (optional) (default to undefined)

const { status, data } = await apiInstance.getReportMetrics(
    reportId,
    metric
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportId** | [**string**] | Unique identifier of the report | defaults to undefined|
| **metric** | [**string**] | Filter to specific metric(s) | (optional) defaults to undefined|


### Return type

**GetReportMetrics200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Report metrics |  -  |
|**404** | Report not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getThresholds**
> GetThresholds200Response getThresholds()

Retrieve performance thresholds for multiple tasks and metrics in a single request. Useful for interpreting metric results across multiple tasks in a report. Supports filtering by specific tasks and metrics. 

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let tasks: string; //Comma-separated list of task IDs to get thresholds for (default to undefined)
let metrics: string; //Comma-separated list of metric IDs to filter by (optional) (optional) (default to undefined)

const { status, data } = await apiInstance.getThresholds(
    tasks,
    metrics
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tasks** | [**string**] | Comma-separated list of task IDs to get thresholds for | defaults to undefined|
| **metrics** | [**string**] | Comma-separated list of metric IDs to filter by (optional) | (optional) defaults to undefined|


### Return type

**GetThresholds200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Thresholds for the specified tasks and metrics |  -  |
|**400** | Invalid parameters (missing tasks or invalid task/metric names) |  -  |
|**404** | Thresholds not found for one or more specified tasks |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listModels**
> ListModels200Response listModels()

Retrieve a list of all models that have evaluation reports in the system. Useful for building model selection interfaces. 

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let source: string; //Filter by model source/organization (optional) (default to undefined)

const { status, data } = await apiInstance.listModels(
    source
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **source** | [**string**] | Filter by model source/organization | (optional) defaults to undefined|


### Return type

**ListModels200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of models |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listReports**
> ReportList listReports()

Retrieve a list of evaluation reports with optional filtering. Supports filtering by model name, evaluation date range, task type, and other criteria. 

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let modelName: string; //Filter reports by model name (exact match) (optional) (default to undefined)
let modelSource: string; //Filter reports by model source/organization (optional) (default to undefined)
let taskRef: string; //Filter reports containing specific task (optional) (default to undefined)
let metric: string; //Filter reports containing specific metric (optional) (default to undefined)
let limit: number; //Maximum number of reports to return (optional) (default to 20)
let offset: number; //Number of reports to skip for pagination (optional) (default to 0)

const { status, data } = await apiInstance.listReports(
    modelName,
    modelSource,
    taskRef,
    metric,
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **modelName** | [**string**] | Filter reports by model name (exact match) | (optional) defaults to undefined|
| **modelSource** | [**string**] | Filter reports by model source/organization | (optional) defaults to undefined|
| **taskRef** | [**string**] | Filter reports containing specific task | (optional) defaults to undefined|
| **metric** | [**string**] | Filter reports containing specific metric | (optional) defaults to undefined|
| **limit** | [**number**] | Maximum number of reports to return | (optional) defaults to 20|
| **offset** | [**number**] | Number of reports to skip for pagination | (optional) defaults to 0|


### Return type

**ReportList**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of evaluation reports |  -  |
|**400** | Invalid query parameters |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listTasks**
> ListTasks200Response listTasks()

Retrieve a list of all evaluation tasks available in the system. Useful for building task selection interfaces. 

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.listTasks();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ListTasks200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of tasks |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

