# ReportsApi

All URIs are relative to *https://api.evalguard.org/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getReport**](#getreport) | **GET** /reports/{namespace}/{model_name}/lm-eval/{report_id} | Get evaluation report by ID|
|[**listReports**](#listreports) | **GET** /reports/{namespace}/{model_name} | List evaluation reports for a model|

# **getReport**
> object getReport()

Retrieve a specific evaluation report by its unique identifier. Returns the complete report including context, tasks, and results. 

### Example

```typescript
import {
    ReportsApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new ReportsApi(configuration);

let namespace: string; //Namespace of the model (default to undefined)
let modelName: string; //Name of the model (default to undefined)
let reportId: string; //Unique identifier of the report (default to undefined)

const { status, data } = await apiInstance.getReport(
    namespace,
    modelName,
    reportId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **namespace** | [**string**] | Namespace of the model | defaults to undefined|
| **modelName** | [**string**] | Name of the model | defaults to undefined|
| **reportId** | [**string**] | Unique identifier of the report | defaults to undefined|


### Return type

**object**

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

# **listReports**
> ReportsResponse listReports()

Retrieve a list of all evaluation reports for a specific model. 

### Example

```typescript
import {
    ReportsApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new ReportsApi(configuration);

let namespace: string; //Namespace of the model (default to undefined)
let modelName: string; //Name of the model (default to undefined)
let reportType: ReportType; //Type of report (optional) (default to undefined)
let limit: number; //Maximum number of items to return (optional) (default to 20)
let offset: number; //Number of items to skip for pagination (optional) (default to 0)

const { status, data } = await apiInstance.listReports(
    namespace,
    modelName,
    reportType,
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **namespace** | [**string**] | Namespace of the model | defaults to undefined|
| **modelName** | [**string**] | Name of the model | defaults to undefined|
| **reportType** | **ReportType** | Type of report | (optional) defaults to undefined|
| **limit** | [**number**] | Maximum number of items to return | (optional) defaults to 20|
| **offset** | [**number**] | Number of items to skip for pagination | (optional) defaults to 0|


### Return type

**ReportsResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of evaluation reports |  -  |
|**404** | Model not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

