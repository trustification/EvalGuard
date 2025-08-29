# ModelCardsResponse

Response containing a list of model cards

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**model_cards** | [**Array&lt;ModelCardschema&gt;**](ModelCardschema.md) | Array of model cards | [default to undefined]
**pagination** | [**PaginationInfo**](PaginationInfo.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ModelCardsResponse } from '@trustification/evalguard-api-model';

const instance: ModelCardsResponse = {
    model_cards,
    pagination,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
