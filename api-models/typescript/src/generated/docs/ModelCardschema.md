# ModelCardschema

A comprehensive model card that includes model identification, evaluation results  with tasks, metrics, thresholds, and recommended guardrails for responsible AI deployment. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**model** | [**ModelInfoschema**](ModelInfoschema.md) |  | [default to undefined]
**tasks** | **object** | Tasks with their definitions, metrics, and evaluation results. Keys are task identifiers. | [default to undefined]
**guardrails** | [**Array&lt;Guardrailschema&gt;**](Guardrailschema.md) | List of recommended guardrails for this model | [optional] [default to undefined]

## Example

```typescript
import { ModelCardschema } from '@trustification/evalguard-api-model';

const instance: ModelCardschema = {
    model,
    tasks,
    guardrails,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
