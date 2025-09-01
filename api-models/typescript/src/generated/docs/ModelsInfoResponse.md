# ModelsInfoResponse

Response containing a list of available models

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**models** | [**Array&lt;ModelInfoschema&gt;**](ModelInfoschema.md) | Array of model definitions | [default to undefined]
**pagination** | [**PaginationInfo**](PaginationInfo.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ModelsInfoResponse } from '@trustification/evalguard-api-model';

const instance: ModelsInfoResponse = {
    models,
    pagination,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
