# TasksResponse

Response containing a list of available tasks

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**tasks** | **Array&lt;{ [key: string]: any; }&gt;** | Array of task definitions | [default to undefined]
**pagination** | [**PaginationInfo**](PaginationInfo.md) |  | [optional] [default to undefined]

## Example

```typescript
import { TasksResponse } from '@trustification/evalguard-api-model';

const instance: TasksResponse = {
    tasks,
    pagination,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
