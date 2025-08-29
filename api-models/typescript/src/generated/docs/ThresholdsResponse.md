# ThresholdsResponse

Response containing thresholds for specified tasks

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**thresholds** | [**Array&lt;Thresholdschema&gt;**](Thresholdschema.md) | Array of threshold definitions | [default to undefined]
**pagination** | [**PaginationInfo**](PaginationInfo.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ThresholdsResponse } from '@trustification/evalguard-api-model';

const instance: ThresholdsResponse = {
    thresholds,
    pagination,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
