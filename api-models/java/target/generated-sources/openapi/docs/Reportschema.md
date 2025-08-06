

# Reportschema

Schema for a report of model evaluation results.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**id** | **String** | Unique report identifier. |  [optional] |
|**metadata** | **Map&lt;String, String&gt;** | Flexible key-value metadata about the report generation. |  [optional] |
|**context** | [**ReportContext**](ReportContext.md) |  |  [optional] |
|**tasks** | **List&lt;Object&gt;** | List of tasks in the report. The keys are the task names. |  [optional] |
|**results** | **List&lt;Object&gt;** | List of results in the report. The keys are the metric names. |  [optional] |



