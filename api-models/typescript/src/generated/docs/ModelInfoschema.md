# ModelInfoschema

Information about a model

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique model identifier | [default to undefined]
**name** | **string** | Model name | [default to undefined]
**namespace** | **string** | Model namespace or organization | [default to undefined]
**aliases** | **Array&lt;string&gt;** | List of aliases for the model\&#39;s name. Must not include the namespace. | [optional] [default to undefined]
**reference_links** | [**Array&lt;ReferenceLink&gt;**](ReferenceLink.md) | List of reference links for the model | [optional] [default to undefined]

## Example

```typescript
import { ModelInfoschema } from '@trustification/evalguard-api-model';

const instance: ModelInfoschema = {
    id,
    name,
    namespace,
    aliases,
    reference_links,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
