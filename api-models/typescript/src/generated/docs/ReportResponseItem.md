# ReportResponseItem

Evaluation report

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**report_type** | [**ReportType**](ReportType.md) |  | [optional] [default to undefined]
**id** | **string** | Unique identifier of the report | [optional] [default to undefined]
**model_name** | **string** | Name of the report | [optional] [default to undefined]
**namespace** | **string** | Namespace of the model | [optional] [default to undefined]
**created_at** | **string** | Timestamp of the report creation | [optional] [default to undefined]

## Example

```typescript
import { ReportResponseItem } from '@trustification/evalguard-api-model';

const instance: ReportResponseItem = {
    report_type,
    id,
    model_name,
    namespace,
    created_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
