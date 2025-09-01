# MetricsResponse

Response containing a list of available metrics

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**metrics** | [**Array&lt;MetricDefinitionschema&gt;**](MetricDefinitionschema.md) | Array of metric definitions | [default to undefined]
**pagination** | [**PaginationInfo**](PaginationInfo.md) |  | [optional] [default to undefined]

## Example

```typescript
import { MetricsResponse } from '@trustification/evalguard-api-model';

const instance: MetricsResponse = {
    metrics,
    pagination,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
