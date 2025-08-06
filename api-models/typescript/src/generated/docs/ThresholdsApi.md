# ThresholdsApi

All URIs are relative to *https://api.evalguard.org/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getThresholds**](#getthresholds) | **GET** /thresholds | Get thresholds for multiple tasks and metrics|

# **getThresholds**
> GetThresholds200Response getThresholds()

Retrieve performance thresholds for multiple tasks and metrics in a single request. Useful for interpreting metric results across multiple tasks in a report. Supports filtering by specific tasks and metrics. 

### Example

```typescript
import {
    ThresholdsApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new ThresholdsApi(configuration);

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

