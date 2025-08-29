# ReportschemaContext

Contextual information about the report generation.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**model_name** | **string** | Name of the model being evaluated. | [optional] [default to undefined]
**model_source** | **string** | Version of the model being evaluated. | [optional] [default to undefined]
**git_hash** | **string** | Git hash of the model being evaluated. | [optional] [default to undefined]
**date** | **number** | Timestamp of the report generation. | [optional] [default to undefined]
**execution** | [**ReportschemaContextExecution**](ReportschemaContextExecution.md) |  | [optional] [default to undefined]
**tools** | [**ReportschemaContextTools**](ReportschemaContextTools.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ReportschemaContext } from '@trustification/evalguard-api-model';

const instance: ReportschemaContext = {
    model_name,
    model_source,
    git_hash,
    date,
    execution,
    tools,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
