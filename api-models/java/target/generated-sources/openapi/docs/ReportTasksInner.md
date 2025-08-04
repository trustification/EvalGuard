

# ReportTasksInner


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**taskRef** | **String** | Reference to the task. |  [optional] |
|**datasetPath** | **String** | Path to the dataset. |  [optional] |
|**datasetName** | **String** | Name of the dataset. |  [optional] |
|**outputType** | **String** | Type of the output. |  [optional] |
|**repeats** | **BigDecimal** | Number of times the task was repeated. |  [optional] |
|**shouldDecontaminate** | **Boolean** | Whether to decontaminate the task. |  [optional] |
|**unsafeCode** | **Boolean** | Whether the task contains unsafe code. |  [optional] |
|**nShot** | **BigDecimal** | Number of shots in the task. |  [optional] |
|**nSamples** | [**ReportTasksInnerNSamples**](ReportTasksInnerNSamples.md) |  |  [optional] |
|**version** | **BigDecimal** | Version of the task result. |  [optional] |
|**metadata** | **Map&lt;String, String&gt;** | Metadata about the task result. |  [optional] |



