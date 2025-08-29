# ModelsApi

All URIs are relative to *https://api.evalguard.org/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getModel**](#getmodel) | **GET** /models/{model_id} | Get model by ID|
|[**listModels**](#listmodels) | **GET** /models | List available models|

# **getModel**
> ModelInfoschema getModel()

Retrieve a specific model by its unique identifier. 

### Example

```typescript
import {
    ModelsApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new ModelsApi(configuration);

let modelId: string; //Unique identifier of the model (default to undefined)

const { status, data } = await apiInstance.getModel(
    modelId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **modelId** | [**string**] | Unique identifier of the model | defaults to undefined|


### Return type

**ModelInfoschema**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Model details |  -  |
|**404** | Model not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listModels**
> ModelsInfoResponse listModels()

Retrieve a list of all models that have evaluation reports in the system. Useful for building model selection interfaces. 

### Example

```typescript
import {
    ModelsApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new ModelsApi(configuration);

let source: string; //Filter by model source/organization (optional) (default to undefined)
let limit: number; //Maximum number of items to return (optional) (default to 20)
let offset: number; //Number of items to skip for pagination (optional) (default to 0)

const { status, data } = await apiInstance.listModels(
    source,
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **source** | [**string**] | Filter by model source/organization | (optional) defaults to undefined|
| **limit** | [**number**] | Maximum number of items to return | (optional) defaults to 20|
| **offset** | [**number**] | Number of items to skip for pagination | (optional) defaults to 0|


### Return type

**ModelsInfoResponse**

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

