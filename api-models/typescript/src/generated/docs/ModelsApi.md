# ModelsApi

All URIs are relative to *https://api.evalguard.org/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**listModels**](#listmodels) | **GET** /models | List available models|

# **listModels**
> ListModels200Response listModels()

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

