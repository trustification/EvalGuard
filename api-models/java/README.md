# EvalGuard Java API Client

This package provides a Java client for the EvalGuard API.

## Building

```bash
mvn clean compile
```

## Usage

### Basic Usage

```java
import com.evalguard.client.ApiClient;
import com.evalguard.client.ApiException;
import com.evalguard.api.DefaultApi;
import com.evalguard.model.ReportList;
import com.evalguard.model.Report;

public class Example {
    public static void main(String[] args) {
        // Create API client
        ApiClient apiClient = new ApiClient();
        apiClient.setBasePath("http://localhost:8080");
        
        DefaultApi api = new DefaultApi(apiClient);
        
        try {
            // Get all reports
            ReportList reports = api.getReports(null, null, null, null, null, null);
            
            // Get reports for a specific model
            ReportList modelReports = api.getReports("meta-llama/Llama-3.1-8B-Instruct", null, null, null, null, null);
            
            // Get a specific report
            Report report = api.getReport("report-id");
            
            // Get thresholds for tasks
            List<Threshold> thresholds = api.getThresholds("truthfulqa_mc1,winogender_schemas", null);
            
            // Get available models
            List<ModelInfo> models = api.getModels();
            
            // Get available tasks
            List<Task> tasks = api.getTasks();
            
        } catch (ApiException e) {
            System.err.println("API Error: " + e.getMessage());
        }
    }
}
```

### Advanced Usage

```java
import com.evalguard.model.*;

// Use generated model classes directly
Report report = api.getReport("report-id");
List<Threshold> thresholds = api.getThresholds("task1,task2", null);
```

## Development

### Code Generation

The client is generated from the OpenAPI specification. To regenerate:

```bash
mvn clean generate-sources
```

### Running Tests

```bash
mvn test
```

### Building JAR

```bash
mvn clean package
```

## API Endpoints

- `GET /reports` - List evaluation reports
- `GET /reports/{id}` - Get specific report
- `GET /reports/{id}/metrics` - Get metrics for a report
- `GET /thresholds` - Get performance thresholds
- `GET /models` - List available models
- `GET /tasks` - List available tasks

## Dependencies

- OkHttp 4.12.0 - HTTP client
- Gson 2.10.1 - JSON serialization
- JUnit Jupiter 5.10.0 - Testing framework

## Models

All Java model classes are automatically generated from the OpenAPI specification and available in the `com.evalguard.model` package. 