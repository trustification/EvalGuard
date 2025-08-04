# PaginationInfo

Pagination information

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total** | **number** | Total number of items | [default to undefined]
**limit** | **number** | Number of items per page | [default to undefined]
**offset** | **number** | Number of items skipped | [default to undefined]
**has_more** | **boolean** | Whether there are more items available | [default to undefined]

## Example

```typescript
import { PaginationInfo } from '@trustification/evalguard-api-model';

const instance: PaginationInfo = {
    total,
    limit,
    offset,
    has_more,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
