# GuardrailsResponse

Response containing a list of available guardrails

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**guardrails** | [**Array&lt;Guardrailschema&gt;**](Guardrailschema.md) | Array of guardrail definitions | [default to undefined]
**pagination** | [**PaginationInfo**](PaginationInfo.md) |  | [optional] [default to undefined]

## Example

```typescript
import { GuardrailsResponse } from '@trustification/evalguard-api-model';

const instance: GuardrailsResponse = {
    guardrails,
    pagination,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
