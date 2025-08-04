# ModelError

Error response

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**error** | **string** | Error message | [default to undefined]
**code** | **string** | Error code | [optional] [default to undefined]
**details** | **{ [key: string]: any; }** | Additional error details | [optional] [default to undefined]

## Example

```typescript
import { ModelError } from '@trustification/evalguard-api-model';

const instance: ModelError = {
    error,
    code,
    details,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
