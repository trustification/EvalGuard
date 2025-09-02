// Test setup file for Jest
import { jest } from '@jest/globals';

// Extend global types
declare global {
  var testUtils: {
    mockConsole: () => void;
    restoreConsole: () => void;
  };
}

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock process.exit to prevent tests from exiting
const originalExit = process.exit;
beforeAll(() => {
  process.exit = jest.fn() as any;
});

afterAll(() => {
  process.exit = originalExit;
});

// Global test utilities
global.testUtils = {
  mockConsole: () => {
    jest.clearAllMocks();
  },
  restoreConsole: () => {
    jest.restoreAllMocks();
  },
};
