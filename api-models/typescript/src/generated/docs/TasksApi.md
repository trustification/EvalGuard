# TasksApi

All URIs are relative to *https://api.evalguard.org/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**listTasks**](#listtasks) | **GET** /tasks | List available tasks|

# **listTasks**
> ListTasks200Response listTasks()

Retrieve a list of all evaluation tasks available in the system. Useful for building task selection interfaces. 

### Example

```typescript
import {
    TasksApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

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

