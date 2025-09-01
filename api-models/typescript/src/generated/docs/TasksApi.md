# TasksApi

All URIs are relative to *https://api.evalguard.org/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getTask**](#gettask) | **GET** /tasks/{task_id} | Get task by ID|
|[**listTasks**](#listtasks) | **GET** /tasks | List available tasks|

# **getTask**
> TaskDefinitionschema getTask()

Retrieve a specific task by its unique identifier. 

### Example

```typescript
import {
    TasksApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

let taskId: string; //Unique identifier of the task (default to undefined)

const { status, data } = await apiInstance.getTask(
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **taskId** | [**string**] | Unique identifier of the task | defaults to undefined|


### Return type

**TaskDefinitionschema**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Task details |  -  |
|**404** | Task not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listTasks**
> TasksResponse listTasks()

Retrieve a list of all evaluation tasks available in the system. Useful for building task selection interfaces. 

### Example

```typescript
import {
    TasksApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

let limit: number; //Maximum number of items to return (optional) (default to 20)
let offset: number; //Number of items to skip for pagination (optional) (default to 0)

const { status, data } = await apiInstance.listTasks(
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

**TasksResponse**

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

