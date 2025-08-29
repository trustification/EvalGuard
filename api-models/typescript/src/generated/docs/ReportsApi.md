# ReportsApi

All URIs are relative to *https://api.evalguard.org/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getReport**](#getreport) | **GET** /reports/{report_id} | Get evaluation report by ID|

# **getReport**
> Reportschema getReport()

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

**Reportschema**

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

