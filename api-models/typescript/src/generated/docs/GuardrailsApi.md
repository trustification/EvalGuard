# GuardrailsApi

All URIs are relative to *https://api.evalguard.org/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getGuardrail**](#getguardrail) | **GET** /guardrails/{guardrail_id} | Get guardrail by ID|
|[**listGuardrails**](#listguardrails) | **GET** /guardrails | List guardrails|

# **getGuardrail**
> Guardrail getGuardrail()

Retrieve a specific guardrail by its unique identifier. Returns the complete guardrail including target scope, instructions, and metadata. 

### Example

```typescript
import {
    GuardrailsApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new GuardrailsApi(configuration);

let guardrailId: string; //Unique identifier of the guardrail (default to undefined)

const { status, data } = await apiInstance.getGuardrail(
    guardrailId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **guardrailId** | [**string**] | Unique identifier of the guardrail | defaults to undefined|


### Return type

**Guardrail**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Guardrail details |  -  |
|**404** | Guardrail not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listGuardrails**
> ListGuardrails200Response listGuardrails()

Retrieve a list of guardrails with optional filtering by tasks and metrics. Guardrails are policies or operational constraints that should be applied during  model evaluation or deployment. 

### Example

```typescript
import {
    GuardrailsApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new GuardrailsApi(configuration);

let tasks: string; //Comma-separated list of task identifiers to filter guardrails (optional) (default to undefined)
let metrics: string; //Comma-separated list of metric identifiers to filter guardrails (optional) (default to undefined)
let limit: number; //Maximum number of guardrails to return (optional) (default to 20)
let offset: number; //Number of guardrails to skip for pagination (optional) (default to 0)

const { status, data } = await apiInstance.listGuardrails(
    tasks,
    metrics,
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tasks** | [**string**] | Comma-separated list of task identifiers to filter guardrails | (optional) defaults to undefined|
| **metrics** | [**string**] | Comma-separated list of metric identifiers to filter guardrails | (optional) defaults to undefined|
| **limit** | [**number**] | Maximum number of guardrails to return | (optional) defaults to 20|
| **offset** | [**number**] | Number of guardrails to skip for pagination | (optional) defaults to 0|


### Return type

**ListGuardrails200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of guardrails |  -  |
|**400** | Invalid query parameters |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

