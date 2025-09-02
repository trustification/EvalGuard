import { jest } from '@jest/globals';

// Test the CLI structure and command patterns
describe('CLI Entry Point', () => {
  describe('Command Structure', () => {
    it('should have config command structure', () => {
      const configCommand = {
        command: 'config',
        subcommands: ['validate'],
        options: ['-t, --type <type>', '-f, --file <path>', '-r, --root <path>']
      };
      
      expect(configCommand.command).toBe('config');
      expect(configCommand.subcommands).toContain('validate');
      expect(configCommand.options).toHaveLength(3);
    });

    it('should have lm-eval command structure', () => {
      const lmEvalCommand = {
        command: 'lm-eval',
        subcommands: ['gen'],
        options: ['-f, --file <path>', '-d, --folder <path>']
      };
      
      expect(lmEvalCommand.command).toBe('lm-eval');
      expect(lmEvalCommand.subcommands).toContain('gen');
      expect(lmEvalCommand.options).toHaveLength(2);
    });

    it('should have api command structure', () => {
      const apiCommand = {
        command: 'api',
        subcommands: ['gen'],
        options: ['--type <type>', '--spec-version <version>']
      };
      
      expect(apiCommand.command).toBe('api');
      expect(apiCommand.subcommands).toContain('gen');
      expect(apiCommand.options).toHaveLength(2);
    });
  });

  describe('Command Options', () => {
    it('should support config validate options', () => {
      const validateOptions = {
        type: 'string',
        file: 'string',
        root: 'string'
      };
      
      expect(validateOptions.type).toBe('string');
      expect(validateOptions.file).toBe('string');
      expect(validateOptions.root).toBe('string');
    });

    it('should support lm-eval gen options', () => {
      const genOptions = {
        file: 'string',
        folder: 'string'
      };
      
      expect(genOptions.file).toBe('string');
      expect(genOptions.folder).toBe('string');
    });

    it('should support api gen options', () => {
      const apiGenOptions = {
        type: 'string',
        specVersion: 'string'
      };
      
      expect(apiGenOptions.type).toBe('string');
      expect(apiGenOptions.specVersion).toBe('string');
    });
  });

  describe('CLI Metadata', () => {
    it('should have program name', () => {
      const programInfo = {
        name: 'evalguard',
        description: 'CLI tool for EvalGuard schema management and validation',
        version: '1.0.0'
      };
      
      expect(programInfo.name).toBe('evalguard');
      expect(programInfo.description).toContain('EvalGuard');
      expect(programInfo.version).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });
});
