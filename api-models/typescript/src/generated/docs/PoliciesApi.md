# PoliciesApi

All URIs are relative to *https://api.evalguard.org/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getPolicy**](#getpolicy) | **GET** /policies/{policy_id} | Get policy by ID|
|[**listPolicies**](#listpolicies) | **GET** /policies | List available policies|

# **getPolicy**
> Policyschema getPolicy()

Retrieve a specific policy by its unique identifier. 

### Example

```typescript
import {
    PoliciesApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new PoliciesApi(configuration);

let policyId: string; //Unique identifier of the policy (default to undefined)

const { status, data } = await apiInstance.getPolicy(
    policyId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **policyId** | [**string**] | Unique identifier of the policy | defaults to undefined|


### Return type

**Policyschema**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Policy details |  -  |
|**404** | Policy not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listPolicies**
> PoliciesResponse listPolicies()

Retrieve a list of all policies available in the system. 

### Example

```typescript
import {
    PoliciesApi,
    Configuration
} from '@trustification/evalguard-api-model';

const configuration = new Configuration();
const apiInstance = new PoliciesApi(configuration);

let limit: number; //Maximum number of items to return (optional) (default to 20)
let offset: number; //Number of items to skip for pagination (optional) (default to 0)

const { status, data } = await apiInstance.listPolicies(
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

**PoliciesResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of policies |  -  |
|**404** | Policy not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

