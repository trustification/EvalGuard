# ModelCardsApi

All URIs are relative to *https://api.evalguard.org/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**listModelCards**](#listmodelcards) | **GET** /model-cards | List model cards|

# **listModelCards**
> ModelCardsResponse listModelCards()

Retrieve a list of model cards with flexible filtering. Supports filtering by model name, evaluation date range, task type, metrics, dtype, and other criteria. 

### Example

```typescript
import {
    ModelCardsApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new ModelCardsApi(configuration);

let modelName: string; //Filter by model name (default to undefined)
let policyId: string; //Filter by policy ID (optional) (default to undefined)
let tasks: string; //Filter by tasks (optional) (default to undefined)
let metrics: string; //Filter by metrics (optional) (default to undefined)
let limit: number; //Maximum number of items to return (optional) (default to 20)
let offset: number; //Number of items to skip for pagination (optional) (default to 0)

const { status, data } = await apiInstance.listModelCards(
    modelName,
    policyId,
    tasks,
    metrics,
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **modelName** | [**string**] | Filter by model name | defaults to undefined|
| **policyId** | [**string**] | Filter by policy ID | (optional) defaults to undefined|
| **tasks** | [**string**] | Filter by tasks | (optional) defaults to undefined|
| **metrics** | [**string**] | Filter by metrics | (optional) defaults to undefined|
| **limit** | [**number**] | Maximum number of items to return | (optional) defaults to 20|
| **offset** | [**number**] | Number of items to skip for pagination | (optional) defaults to 0|


### Return type

**ModelCardsResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of model cards |  -  |
|**400** | Invalid query parameters |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

