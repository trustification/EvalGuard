# ReportListschema

Paginated list of reports

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**reports** | [**Array&lt;Reportschema&gt;**](Reportschema.md) | List of evaluation reports | [default to undefined]
**pagination** | [**PaginationInfoschema**](PaginationInfoschema.md) |  | [default to undefined]

## Example

```typescript
import { ReportListschema } from '@trustification/evalguard-api-model';

const instance: ReportListschema = {
    reports,
    pagination,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
