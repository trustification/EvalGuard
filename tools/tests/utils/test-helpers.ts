import * as fs from 'fs';
import * as path from 'path';

export const TEST_FIXTURES_DIR = path.join(__dirname, '..', 'fixtures');

export function getTestFixturePath(type: string, filename: string): string {
  return path.join(TEST_FIXTURES_DIR, type, filename);
}

export function loadTestFixture(type: string, filename: string): string {
  const filePath = getTestFixturePath(type, filename);
  return fs.readFileSync(filePath, 'utf-8');
}

export function getTestFixturesDir(type: string): string {
  return path.join(TEST_FIXTURES_DIR, type);
}

export function createTempTestDir(): string {
  const tempDir = path.join(__dirname, '..', 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  return tempDir;
}

export function cleanupTempTestDir(): void {
  const tempDir = path.join(__dirname, '..', 'temp');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}
