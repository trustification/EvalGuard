# ReportQueryQuery


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**model_name** | **string** | Filter reports by model name (exact match) | [optional] [default to undefined]
**model_source** | **string** | Filter reports by model source/organization | [optional] [default to undefined]
**tasks** | **Array&lt;string&gt;** | Filter reports containing specific tasks | [optional] [default to undefined]
**metrics** | **Array&lt;string&gt;** | Filter reports containing specific metrics | [optional] [default to undefined]
**report_context** | **{ [key: string]: any; }** | Filter by specific parameters used for generating the report | [optional] [default to undefined]

## Example

```typescript
import { ReportQueryQuery } from '@trustification/evalguard-api-model';

const instance: ReportQueryQuery = {
    model_name,
    model_source,
    tasks,
    metrics,
    report_context,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
