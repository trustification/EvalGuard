

# Guardrail

A guardrail is a policy or operational constraint that should be applied during  model evaluation or deployment to mitigate risks, enforce quality, or guide behavior.  It can target specific tasks, metrics, or models and is annotated with metadata for  interpretation and traceability. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**id** | **String** | Globally unique identifier for the guardrail. |  |
|**name** | **String** | Human-readable name of the guardrail. |  |
|**description** | **String** | Detailed explanation of the purpose and logic of the guardrail. |  [optional] |
|**targets** | [**List&lt;GuardrailTargetsInner&gt;**](GuardrailTargetsInner.md) | Specifies what the guardrail applies to: tasks, metrics, and/or specific models.  |  |
|**scope** | [**ScopeEnum**](#ScopeEnum) | Indicates the data flow stage at which the guardrail should be applied: &#39;input&#39; for prompt/input constraints, &#39;output&#39; for generation constraints,  or &#39;both&#39; for end-to-end application.  |  |
|**externalReferences** | **List&lt;String&gt;** | List of external references (e.g., papers, documentation, implementations)  that support or explain the rationale for this guardrail.  |  [optional] |
|**instructions** | **String** | Implementation guidance or rule description, written in natural language or  pseudocode for how to enforce this guardrail.  |  |



## Enum: ScopeEnum

| Name | Value |
|---- | -----|
| INPUT | &quot;input&quot; |
| OUTPUT | &quot;output&quot; |
| BOTH | &quot;both&quot; |



