# GuardrailTarget


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**task** | **string** | Task identifier to which the guardrail applies. | [default to undefined]
**metrics** | **Array&lt;string&gt;** | List of metric identifiers to which the guardrail applies | [default to undefined]
**model** | **string** | Model identifier this guardrail is scoped to (Optional) | [optional] [default to undefined]

## Example

```typescript
import { GuardrailTarget } from '@trustification/evalguard-api-model';

const instance: GuardrailTarget = {
    task,
    metrics,
    model,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
