# ReportTasksInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**task_ref** | **string** | Reference to the task. | [optional] [default to undefined]
**dataset_path** | **string** | Path to the dataset. | [optional] [default to undefined]
**dataset_name** | **string** | Name of the dataset. | [optional] [default to undefined]
**output_type** | **string** | Type of the output. | [optional] [default to undefined]
**repeats** | **number** | Number of times the task was repeated. | [optional] [default to undefined]
**should_decontaminate** | **boolean** | Whether to decontaminate the task. | [optional] [default to undefined]
**unsafe_code** | **boolean** | Whether the task contains unsafe code. | [optional] [default to undefined]
**n_shot** | **number** | Number of shots in the task. | [optional] [default to undefined]
**n_samples** | [**ReportTasksInnerNSamples**](ReportTasksInnerNSamples.md) |  | [optional] [default to undefined]
**version** | **number** | Version of the task result. | [optional] [default to undefined]
**metadata** | **{ [key: string]: string; }** | Metadata about the task result. | [optional] [default to undefined]

## Example

```typescript
import { ReportTasksInner } from '@trustification/evalguard-api-model';

const instance: ReportTasksInner = {
    task_ref,
    dataset_path,
    dataset_name,
    output_type,
    repeats,
    should_decontaminate,
    unsafe_code,
    n_shot,
    n_samples,
    version,
    metadata,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
