# Thresholdschema

Schema to define interpretation thresholds for metric scores within a task context.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**task** | **string** | Task ID to which these thresholds apply. | [default to undefined]
**thresholds** | **object** | Mapping from metric IDs to arrays of threshold ranges and labels. | [default to undefined]

## Example

```typescript
import { Thresholdschema } from '@trustification/evalguard-api-model';

const instance: Thresholdschema = {
    task,
    thresholds,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
