

# Task

Schema for a model evaluation task, based on lm-eval report data plus user-added metadata.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**id** | **String** | Unique task identifier. |  |
|**name** | **String** | Human-readable name of the task. |  |
|**description** | **String** | Optional detailed description of the task. |  [optional] |
|**category** | **String** | Optional category of the task, e.g. &#39;question_answering&#39;, &#39;language_modeling&#39;. |  [optional] |
|**metrics** | **List&lt;String&gt;** | List of metric IDs applicable to this task. |  |
|**tags** | **List&lt;String&gt;** | Optional tags for the task, e.g. domain, language, difficulty. |  [optional] |
|**languages** | **List&lt;String&gt;** | Optional list of languages relevant to the task. |  [optional] |



