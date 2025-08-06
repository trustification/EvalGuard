# Guardrail

A guardrail is a policy or operational constraint that should be applied during  model evaluation or deployment to mitigate risks, enforce quality, or guide behavior.  It can target specific tasks, metrics, or models and is annotated with metadata for  interpretation and traceability. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Globally unique identifier for the guardrail. | [default to undefined]
**name** | **string** | Human-readable name of the guardrail. | [default to undefined]
**description** | **string** | Detailed explanation of the purpose and logic of the guardrail. | [optional] [default to undefined]
**targets** | [**Array&lt;GuardrailTargetsInner&gt;**](GuardrailTargetsInner.md) | Specifies what the guardrail applies to: tasks, metrics, and/or specific models.  | [default to undefined]
**scope** | **string** | Indicates the data flow stage at which the guardrail should be applied: \&#39;input\&#39; for prompt/input constraints, \&#39;output\&#39; for generation constraints,  or \&#39;both\&#39; for end-to-end application.  | [default to undefined]
**external_references** | **Array&lt;string&gt;** | List of external references (e.g., papers, documentation, implementations)  that support or explain the rationale for this guardrail.  | [optional] [default to undefined]
**instructions** | **string** | Implementation guidance or rule description, written in natural language or  pseudocode for how to enforce this guardrail.  | [default to undefined]

## Example

```typescript
import { Guardrail } from '@trustification/evalguard-api-model';

const instance: Guardrail = {
    id,
    name,
    description,
    targets,
    scope,
    external_references,
    instructions,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
