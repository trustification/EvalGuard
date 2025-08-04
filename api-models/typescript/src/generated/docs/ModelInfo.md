# ModelInfo

Information about a model

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | Model name | [default to undefined]
**source** | **string** | Model source/organization | [default to undefined]
**report_count** | **number** | Number of evaluation reports for this model | [default to undefined]
**latest_evaluation** | **string** | Date of the most recent evaluation | [default to undefined]

## Example

```typescript
import { ModelInfo } from '@trustification/evalguard-api-model';

const instance: ModelInfo = {
    name,
    source,
    report_count,
    latest_evaluation,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
