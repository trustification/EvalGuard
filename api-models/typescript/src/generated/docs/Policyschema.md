# Policyschema

Schema for a policy used to evaluate tasks in model evaluations.  Policies organize thresholds and guardrails by evaluation context.  Thresholds are embedded within policies, organized by task ID and metric ID. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique policy identifier, used to link policies to tasks and reports. | [default to undefined]
**name** | **string** | Human-readable name of the policy. | [default to undefined]
**description** | **string** | Detailed description of the policy. | [default to undefined]
**thresholds** | **object** | Thresholds for the policy, organized by task ID. Each task maps to a TaskThresholds object. | [optional] [default to undefined]

## Example

```typescript
import { Policyschema } from '@trustification/evalguard-api-model';

const instance: Policyschema = {
    id,
    name,
    description,
    thresholds,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
