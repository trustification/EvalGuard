

# Reportschema

Schema for a report of model evaluation results.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**id** | **String** | Unique report identifier. |  [optional] |
|**metadata** | **Map&lt;String, String&gt;** | Flexible key-value metadata about the report generation. |  [optional] |
|**context** | [**ReportContext**](ReportContext.md) |  |  [optional] |
|**tasks** | [**List&lt;ReportTasksInner&gt;**](ReportTasksInner.md) | List of tasks in the report. |  [optional] |
|**results** | **List&lt;Object&gt;** | List of results in the report. |  [optional] |



