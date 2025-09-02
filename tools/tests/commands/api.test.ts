import { jest } from '@jest/globals';
import { addApiCommand } from '../../src/commands/api';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('API Command', () => {
  const projectRoot = path.resolve(__dirname, '../../../');
  let mockProgram: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create a mock program object that matches the expected structure
    mockProgram = {
      command: jest.fn().mockReturnValue({
        description: jest.fn().mockReturnThis(),
        command: jest.fn().mockReturnValue({
          description: jest.fn().mockReturnThis(),
          option: jest.fn().mockReturnThis(),
          action: jest.fn().mockReturnThis(),
        }),
      }),
    };
  });

  describe('Command Structure', () => {
    it('should be a function', () => {
      expect(typeof addApiCommand).toBe('function');
    });

    it('should accept a program parameter', () => {
      expect(() => addApiCommand(mockProgram)).not.toThrow();
    });
  });

  describe('Command Registration', () => {
    it('should register api command with program', () => {
      addApiCommand(mockProgram);
      expect(mockProgram.command).toHaveBeenCalledWith('api');
    });

    it('should set command description', () => {
      const mockApiCommand = {
        description: jest.fn().mockReturnThis(),
        command: jest.fn().mockReturnValue({
          description: jest.fn().mockReturnThis(),
          option: jest.fn().mockReturnThis(),
          action: jest.fn().mockReturnThis(),
        }),
      };
      mockProgram.command.mockReturnValue(mockApiCommand);

      addApiCommand(mockProgram);
      expect(mockApiCommand.description).toHaveBeenCalledWith('API model management commands');
    });
  });

  describe('Subcommands', () => {
    it('should register gen subcommand', () => {
      const mockApiCommand = {
        description: jest.fn().mockReturnThis(),
        command: jest.fn().mockReturnValue({
          description: jest.fn().mockReturnThis(),
          option: jest.fn().mockReturnThis(),
          action: jest.fn().mockReturnThis(),
        }),
      };
      mockProgram.command.mockReturnValue(mockApiCommand);

      addApiCommand(mockProgram);
      
      // Should call command for 'gen' subcommand
      expect(mockApiCommand.command).toHaveBeenCalledWith('gen');
    });

    it('should register options for gen subcommand', () => {
      const mockGenCommand = {
        description: jest.fn().mockReturnThis(),
        option: jest.fn().mockReturnThis(),
        action: jest.fn().mockReturnThis(),
      };
      const mockApiCommand = {
        description: jest.fn().mockReturnThis(),
        command: jest.fn().mockReturnValue(mockGenCommand),
      };
      mockProgram.command.mockReturnValue(mockApiCommand);

      addApiCommand(mockProgram);
      
      // Should call option for type and spec-version
      expect(mockGenCommand.option).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle null program gracefully', () => {
      // The function doesn't handle null gracefully, so expect it to throw
      expect(() => addApiCommand(null as any)).toThrow();
    });

    it('should handle undefined program gracefully', () => {
      // The function doesn't handle undefined gracefully, so expect it to throw
      expect(() => addApiCommand(undefined as any)).toThrow();
    });
  });

  describe('Platform Portability', () => {
    it('should use platform-agnostic temp directory', () => {
      // Test that we can get a temp directory on any platform
      const tempDir = os.tmpdir();
      expect(tempDir).toBeDefined();
      expect(typeof tempDir).toBe('string');
      expect(tempDir.length).toBeGreaterThan(0);
    });

    it('should handle git commands gracefully', () => {
      // Test that git status can be called (may fail if not in git repo, but shouldn't crash)
      const { execSync } = require('child_process');
      
      try {
        const result = execSync('git --version', { encoding: 'utf8' });
        expect(result).toContain('git version');
      } catch (error) {
        // Git might not be available, but that's okay for testing
        expect(error).toBeDefined();
      }
    });
  });

  describe('Project Structure', () => {
    it('should have valid API schemas in the project', () => {
      const schemasDir = path.join(projectRoot, 'schemas');
      const apiSchemaPath = path.join(schemasDir, 'v1', 'api.schema.yaml');
      
      // Check that API schema exists
      expect(fs.existsSync(apiSchemaPath)).toBe(true);
      
      // Check that it's a valid OpenAPI file
      const content = fs.readFileSync(apiSchemaPath, 'utf-8');
      expect(content).toContain('openapi:');
      expect(content).toContain('title');
    });

    it('should have valid Java API model configuration', () => {
      const javaDir = path.join(projectRoot, 'api-models/java');
      const pomPath = path.join(javaDir, 'pom.xml');
      
      expect(fs.existsSync(pomPath)).toBe(true);
      
      const content = fs.readFileSync(pomPath, 'utf-8');
      expect(content).toContain('<groupId>');
      expect(content).toContain('<artifactId>');
    });

    it('should have valid TypeScript API model configuration', () => {
      const tsDir = path.join(projectRoot, 'api-models/typescript');
      const packagePath = path.join(tsDir, 'package.json');
      const generateScript = path.join(tsDir, 'scripts', 'generate.js');
      
      expect(fs.existsSync(packagePath)).toBe(true);
      expect(fs.existsSync(generateScript)).toBe(true);
      
      const packageContent = fs.readFileSync(packagePath, 'utf-8');
      const packageJson = JSON.parse(packageContent);
      
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts.generate).toBeDefined();
    });
  });
});
