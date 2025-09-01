# MetricDefinitionschema

Schema for a metric used to evaluate tasks in model evaluations.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique metric identifier, used to link metrics to tasks and reports. | [default to undefined]
**name** | **string** | Human-readable name of the metric. | [default to undefined]
**description** | **string** | Detailed description of what the metric measures. | [optional] [default to undefined]
**type** | **string** | Type of metric output (percentage, raw score, count, etc.). | [optional] [default to undefined]
**direction** | **string** | Indicates whether higher or lower values correspond to better performance. | [default to undefined]
**tags** | **Array&lt;string&gt;** | Optional tags describing the metric, e.g., accuracy, robustness, efficiency. | [optional] [default to undefined]

## Example

```typescript
import { MetricDefinitionschema } from '@trustification/evalguard-api-model';

const instance: MetricDefinitionschema = {
    id,
    name,
    description,
    type,
    direction,
    tags,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
