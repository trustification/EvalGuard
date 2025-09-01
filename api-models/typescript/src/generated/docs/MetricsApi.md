# MetricsApi

All URIs are relative to *https://api.evalguard.org/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getMetric**](#getmetric) | **GET** /metrics/{metric_id} | Get metric by ID|
|[**listMetrics**](#listmetrics) | **GET** /metrics | List available metrics|

# **getMetric**
> MetricDefinitionschema getMetric()

Retrieve a specific metric by its unique identifier. 

### Example

```typescript
import {
    MetricsApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new MetricsApi(configuration);

let metricId: string; //Unique identifier of the metric (default to undefined)

const { status, data } = await apiInstance.getMetric(
    metricId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **metricId** | [**string**] | Unique identifier of the metric | defaults to undefined|


### Return type

**MetricDefinitionschema**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Metric details |  -  |
|**404** | Metric not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listMetrics**
> MetricsResponse listMetrics()

Retrieve a list of all metrics that have evaluation reports in the system. Useful for building metric selection interfaces. 

### Example

```typescript
import {
    MetricsApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new MetricsApi(configuration);

let limit: number; //Maximum number of items to return (optional) (default to 20)
let offset: number; //Number of items to skip for pagination (optional) (default to 0)

const { status, data } = await apiInstance.listMetrics(
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] | Maximum number of items to return | (optional) defaults to 20|
| **offset** | [**number**] | Number of items to skip for pagination | (optional) defaults to 0|


### Return type

**MetricsResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of metrics |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

