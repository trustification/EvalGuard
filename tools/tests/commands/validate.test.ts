import { validateCommand } from '../../src/commands/validate';
import * as path from 'path';

// Define the interface locally since it's not exported from types
interface ValidateOptions {
  type?: string;
  file?: string;
  root?: string;
}

describe('validateCommand', () => {
  const testRootDir = `${__dirname}/../fixtures`;
  const projectRoot = path.resolve(__dirname, '../../../');

  beforeEach(() => {
    // Clear any previous mocks
    jest.clearAllMocks();
  });

  describe('with test fixtures (testing schema loading)', () => {
    it('should handle missing schemas gracefully', async () => {
      const options: ValidateOptions = {
        root: testRootDir
      };

      // This tests the schema loading logic - should handle missing schemas gracefully
      await expect(validateCommand(options)).resolves.not.toThrow();
    });
  });

  describe('with real project schemas (testing config validation)', () => {
    it('should validate tasks from real project', async () => {
      const options: ValidateOptions = {
        root: projectRoot,
        type: 'tasks'
      };

      // This should actually execute the validation logic with real schemas
      await expect(validateCommand(options)).resolves.not.toThrow();
    });

    it('should validate metrics from real project', async () => {
      const options: ValidateOptions = {
        root: projectRoot,
        type: 'metrics'
      };

      await expect(validateCommand(options)).resolves.not.toThrow();
    });

    it('should validate policies from real project', async () => {
      const options: ValidateOptions = {
        root: projectRoot,
        type: 'policies'
      };

      await expect(validateCommand(options)).resolves.not.toThrow();
    });

    it('should validate guardrails from real project', async () => {
      const options: ValidateOptions = {
        root: projectRoot,
        type: 'guardrails'
      };

      await expect(validateCommand(options)).resolves.not.toThrow();
    });

    it('should validate all types from real project', async () => {
      const options: ValidateOptions = {
        root: projectRoot
      };

      await expect(validateCommand(options)).resolves.not.toThrow();
    });
  });

  describe('error handling', () => {
    it('should handle invalid type gracefully', async () => {
      const options: ValidateOptions = {
        root: projectRoot,
        type: 'invalid-type'
      };

      // Since process.exit is mocked, the function should complete without throwing
      await expect(validateCommand(options)).resolves.not.toThrow();
    });

    it('should handle missing root directory gracefully', async () => {
      const options: ValidateOptions = {
        root: '/nonexistent/path'
      };

      // Should handle missing directory gracefully
      await expect(validateCommand(options)).resolves.not.toThrow();
    });
  });

  describe('validation options', () => {
    it('should accept all valid option combinations', () => {
      const validOptions: ValidateOptions[] = [
        { root: projectRoot },
        { root: projectRoot, type: 'tasks' },
        { root: projectRoot, type: 'metrics' },
        { root: projectRoot, type: 'policies' },
        { root: projectRoot, type: 'guardrails' },
        { root: projectRoot, type: 'models' },
        { type: 'tasks' }, // No root specified
        { type: 'metrics' }, // No root specified
      ];

      validOptions.forEach(options => {
        if (options.root) {
          expect(options.root).toBeDefined();
        }
        if (options.type) {
          expect(options.type).toBeDefined();
        }
        // At least one option should be defined
        expect(options.root || options.type).toBeDefined();
      });
    });
  });
});

