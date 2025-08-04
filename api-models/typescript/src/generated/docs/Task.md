# Task

Schema for a model evaluation task, based on lm-eval report data plus user-added metadata.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique task identifier. | [default to undefined]
**name** | **string** | Human-readable name of the task. | [default to undefined]
**description** | **string** | Optional detailed description of the task. | [optional] [default to undefined]
**category** | **string** | Optional category of the task, e.g. \&#39;question_answering\&#39;, \&#39;language_modeling\&#39;. | [optional] [default to undefined]
**metrics** | **Array&lt;string&gt;** | List of metric IDs applicable to this task. | [default to undefined]
**tags** | **Array&lt;string&gt;** | Optional tags for the task, e.g. domain, language, difficulty. | [optional] [default to undefined]
**languages** | **Array&lt;string&gt;** | Optional list of languages relevant to the task. | [optional] [default to undefined]

## Example

```typescript
import { Task } from '@trustification/evalguard-api-model';

const instance: Task = {
    id,
    name,
    description,
    category,
    metrics,
    tags,
    languages,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
