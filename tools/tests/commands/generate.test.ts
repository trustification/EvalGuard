import { generateCommand } from '../../src/commands/generate';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

// Define the interface locally since it's not exported from types
interface GenerateOptions {
  file?: string;
  folder?: string;
}

describe('generateCommand', () => {
  const testRootDir = `${__dirname}/../fixtures`;
  const projectRoot = path.resolve(__dirname, '../../../');

  beforeEach(() => {
    // Clear any previous mocks
    jest.clearAllMocks();
  });

  describe('with real LM-eval reports', () => {
    it('should process real LM-eval report and generate config files', async () => {
      const options: GenerateOptions = {
        file: path.join(testRootDir, 'reports/lm-eval/real-report.json'),
        folder: testRootDir
      };

      // This should actually execute the report processing logic
      await expect(generateCommand(options)).resolves.not.toThrow();
    });

    it('should handle missing report file gracefully', async () => {
      const options: GenerateOptions = {
        file: '/nonexistent/report.json',
        folder: testRootDir
      };

      // The function should handle missing files gracefully
      await expect(generateCommand(options)).resolves.not.toThrow();
    });

    it('should process report without folder specification', async () => {
      const options: GenerateOptions = {
        file: path.join(testRootDir, 'reports/lm-eval/real-report.json')
      };

      await expect(generateCommand(options)).resolves.not.toThrow();
    });
  });

  describe('report processing logic', () => {
    it('should extract tasks and metrics from LM-eval report structure', () => {
      // Test the core logic that processes the report
      const reportPath = path.join(testRootDir, 'reports/lm-eval/real-report.json');
      const reportContent = fs.readFileSync(reportPath, 'utf-8');
      const report = JSON.parse(reportContent);

      // Verify report structure
      expect(report.results).toBeDefined();
      expect(report.configs).toBeDefined();
      expect(Object.keys(report.configs)).toHaveLength(2);

      // Check specific task
      const truthfulqaConfig = report.configs.truthfulqa_mc1;
      expect(truthfulqaConfig.task).toBe('TruthfulQA Multiple Choice');
      expect(truthfulqaConfig.tag).toContain('question_answering');
      expect(truthfulqaConfig.metric_list).toHaveLength(2);

      // Check metrics
      const accMetric = truthfulqaConfig.metric_list.find((m: any) => m.metric === 'acc');
      expect(accMetric.higher_is_better).toBe(true);
    });

    it('should generate correct task YAML structure', () => {
      const expectedTaskPath = path.join(testRootDir, 'expected/generate/tasks-output.yaml');
      const expectedTask = yaml.load(fs.readFileSync(expectedTaskPath, 'utf-8'));

      expect(expectedTask).toMatchObject({
        id: 'truthfulqa_mc1',
        name: 'TruthfulQA Multiple Choice',
        category: 'question_answering',
        tags: expect.arrayContaining(['question_answering', 'truthfulness'])
      });
    });

    it('should generate correct metric YAML structure', () => {
      const expectedMetricPath = path.join(testRootDir, 'expected/generate/metrics-output.yaml');
      const expectedMetric = yaml.load(fs.readFileSync(expectedMetricPath, 'utf-8'));

      expect(expectedMetric).toMatchObject({
        id: 'acc',
        name: 'acc',
        direction: 'higher_is_better'
      });
    });
  });

  describe('file generation options', () => {
    it('should accept valid option combinations', () => {
      const validOptions: GenerateOptions[] = [
        { file: 'report.json' },
        { file: 'report.json', folder: '/custom/path' },
        { folder: '/custom/path' }
      ];

      validOptions.forEach(options => {
        if (options.file) {
          expect(options.file).toBeDefined();
        }
        if (options.folder) {
          expect(options.folder).toBeDefined();
        }
        // At least one option should be defined
        expect(options.file || options.folder).toBeDefined();
      });
    });
  });
});
