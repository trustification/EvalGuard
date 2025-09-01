# PoliciesResponse

Response containing a list of available policies

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**policies** | [**Array&lt;Policyschema&gt;**](Policyschema.md) | Array of policy definitions | [default to undefined]
**pagination** | [**PaginationInfo**](PaginationInfo.md) |  | [optional] [default to undefined]

## Example

```typescript
import { PoliciesResponse } from '@trustification/evalguard-api-model';

const instance: PoliciesResponse = {
    policies,
    pagination,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
