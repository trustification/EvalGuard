# Reportschema

Schema for a report of model evaluation results.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique report identifier. | [optional] [default to undefined]
**metadata** | **{ [key: string]: string; }** | Flexible key-value metadata about the report generation. | [optional] [default to undefined]
**context** | [**ReportContext**](ReportContext.md) |  | [optional] [default to undefined]
**tasks** | [**Array&lt;ReportTasksInner&gt;**](ReportTasksInner.md) | List of tasks in the report. | [optional] [default to undefined]
**results** | **Array&lt;object&gt;** | List of results in the report. | [optional] [default to undefined]

## Example

```typescript
import { Reportschema } from '@trustification/evalguard-api-model';

const instance: Reportschema = {
    id,
    metadata,
    context,
    tasks,
    results,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
