// Auto-generated TypeScript interfaces from EvalGuard schemas
// Generated on: 2025-08-01T14:44:50.015Z

/**
 * Schema for a model evaluation task, based on lm-eval report data plus user-added metadata.
 */
export interface Task {
  /**
   * Unique task identifier.
   */
  id: string;
  /**
   * Human-readable name of the task.
   */
  name: string;
  /**
   * Optional detailed description of the task.
   */
  description?: string;
  /**
   * Optional category of the task, e.g. 'question_answering', 'language_modeling'.
   */
  category?: string;
  /**
   * List of metric IDs applicable to this task.
   */
  metrics: string[];
  /**
   * Optional tags for the task, e.g. domain, language, difficulty.
   */
  tags?: string[];
  /**
   * Optional list of languages relevant to the task.
   */
  languages?: string[];
}


/**
 * Schema for a metric used to evaluate tasks in model evaluations.
 */
export interface Metric {
  /**
   * Unique metric identifier, used to link metrics to tasks and reports.
   */
  id: string;
  /**
   * Human-readable name of the metric.
   */
  name: string;
  /**
   * Detailed description of what the metric measures.
   */
  description?: string;
  /**
   * Type of metric output (percentage, raw score, count, etc.).
   */
  type?: 'percentage' | 'score' | 'count' | 'time' | 'other';
  /**
   * Indicates whether higher or lower values correspond to better performance.
   */
  direction: 'higher_is_better' | 'lower_is_better';
  /**
   * Optional tags describing the metric, e.g., accuracy, robustness, efficiency.
   */
  tags?: string[];
}


/**
 * Schema to define interpretation thresholds for metric scores within a task context.
 */
export interface Threshold {
  /**
   * Task ID to which these thresholds apply.
   */
  task: string;
  /**
   * Mapping from metric IDs to arrays of threshold ranges and labels.
   */
  thresholds: {
    /**
     * Array of threshold ranges for a metric
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^.+$".
     */
    [k: string]: ThresholdRangeItem[];
  };
}


/**
 * A threshold range with label and optional min/max values
 */
export type ThresholdRangeItem = {
  [k: string]: any;
} & {
  /**
   * Human-readable interpretation label for this threshold range.
   */
  label: string;
  /**
   * Inclusive minimum value for this range. Optional if only max is set.
   */
  min?: number;
  /**
   * Exclusive maximum value for this range. Optional if only min is set.
   */
  max?: number;
  /**
   * Optional detailed explanation of what this threshold range means.
   */
  interpretation?: string;
};


/**
 * Schema for a report of model evaluation results.
 */
export interface Report {
  /**
   * Unique report identifier.
   */
  id?: string;
  /**
   * Flexible key-value metadata about the report generation.
   */
  metadata?: {
    [k: string]: string;
  };
  /**
   * Contextual information about the report generation.
   */
  context?: {
    /**
     * Name of the model being evaluated.
     */
    model_name?: string;
    /**
     * Version of the model being evaluated.
     */
    model_source?: string;
    /**
     * Git hash of the model being evaluated.
     */
    git_hash?: string;
    /**
     * Timestamp of the report generation.
     */
    date?: number;
    /**
     * Execution information about the report generation.
     */
    execution?: {
      /**
       * Arguments used to instantiate the model.
       */
      model_args_plain?: string;
      /**
       * Arguments used to instantiate the model.
       */
      model_args_dict?: {
        [k: string]: string;
      };
    };
    /**
     * Tools used to generate the report.
     */
    tools?: {
      /**
       * lm-eval library used to generate the report.
       */
      lm_eval?: {
        version?: string;
      };
      /**
       * Transformers library used to generate the report.
       */
      transformers?: {
        version?: string;
      };
    };
  };
  /**
   * List of tasks in the report.
   */
  tasks?: {
    /**
     * Reference to the task.
     */
    task_ref?: string;
    /**
     * Path to the dataset.
     */
    dataset_path?: string;
    /**
     * Name of the dataset.
     */
    dataset_name?: string;
    /**
     * Type of the output.
     */
    output_type?: string;
    /**
     * Number of times the task was repeated.
     */
    repeats?: number;
    /**
     * Whether to decontaminate the task.
     */
    should_decontaminate?: boolean;
    /**
     * Whether the task contains unsafe code.
     */
    unsafe_code?: boolean;
    /**
     * Number of shots in the task.
     */
    n_shot?: number;
    /**
     * Number of samples in the task.
     */
    n_samples?: {
      /**
       * Number of original samples.
       */
      original?: number;
      /**
       * Number of effective samples.
       */
      effective?: number;
    };
    /**
     * Version of the task result.
     */
    version?: number;
    /**
     * Metadata about the task result.
     */
    metadata?: {
      [k: string]: string;
    };
  }[];
  /**
   * List of results in the report.
   */
  results?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9_-]+$".
     */
    [k: string]: {
      value: number;
      stderr?: number;
    };
  }[];
}


/**
 * Paginated list of reports
 */
export interface ReportList {
  /**
   * List of evaluation reports
   */
  reports: Report[];
  pagination: PaginationInfo;
}


/**
 * Pagination information
 */
export interface PaginationInfo {
  /**
   * Total number of items
   */
  total: number;
  /**
   * Number of items per page
   */
  limit: number;
  /**
   * Number of items skipped
   */
  offset: number;
  /**
   * Whether there are more items available
   */
  has_more: boolean;
}


/**
 * Information about a model
 */
export interface ModelInfo {
  /**
   * Model name
   */
  name: string;
  /**
   * Model source/organization
   */
  source: string;
  /**
   * Number of evaluation reports for this model
   */
  report_count: number;
  /**
   * Date of the most recent evaluation
   */
  latest_evaluation: string;
}


/**
 * Error response
 */
export interface Error {
  /**
   * Error message
   */
  error: string;
  /**
   * Error code
   */
  code?: string;
  /**
   * Additional error details
   */
  details?: {
    [k: string]: any;
  };
}


/**
 * Response for thresholds endpoint
 */
export interface ThresholdsResponse {
  /**
   * List of threshold objects
   */
  thresholds?: Threshold[];
}


