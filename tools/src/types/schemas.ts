// Auto-generated TypeScript interfaces from EvalGuard schemas
// Generated on: 2025-08-01T05:58:57.057Z

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


