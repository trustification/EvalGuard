# ReportsApi

All URIs are relative to *https://api.evalguard.org/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getReport**](#getreport) | **GET** /reports/{report_id} | Get evaluation report by ID|
|[**getReportMetrics**](#getreportmetrics) | **GET** /reports/{report_id}/metrics | Get metrics for a specific report|
|[**listReports**](#listreports) | **POST** /reports | List evaluation reports|

# **getReport**
> Report getReport()

Retrieve a specific evaluation report by its unique identifier. Returns the complete report including context, tasks, and results. 

### Example

```typescript
import {
    ReportsApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new ReportsApi(configuration);

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
    ReportsApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new ReportsApi(configuration);

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

# **listReports**
> ReportList listReports(reportQueryschema)

Retrieve a list of evaluation reports with flexible filtering. Supports filtering by model name, evaluation date range, task type, metrics, dtype, and other criteria. 

### Example

```typescript
import {
    ReportsApi,
    Configuration,
    ReportQueryschema
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new ReportsApi(configuration);

let reportQueryschema: ReportQueryschema; //
let limit: number; //Maximum number of reports to return (optional) (default to 20)
let offset: number; //Number of reports to skip for pagination (optional) (default to 0)

const { status, data } = await apiInstance.listReports(
    reportQueryschema,
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportQueryschema** | **ReportQueryschema**|  | |
| **limit** | [**number**] | Maximum number of reports to return | (optional) defaults to 20|
| **offset** | [**number**] | Number of reports to skip for pagination | (optional) defaults to 0|


### Return type

**ReportList**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of evaluation reports |  -  |
|**400** | Invalid query parameters |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

