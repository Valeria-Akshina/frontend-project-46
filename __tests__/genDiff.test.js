import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

test('compare nested JSON files', () => {
  const file1 = getFixturePath('file1-nested.json');
  const file2 = getFixturePath('file2-nested.json');
  const expected = readFile('expected-nested.txt');
  
  const result = genDiff(file1, file2);
  expect(result).toEqual(expected);
});

test('compare nested YAML files', () => {
  const file1 = getFixturePath('file1-nested.yaml');
  const file2 = getFixturePath('file2-nested.yaml');
  const expected = readFile('expected-nested.txt');
  
  const result = genDiff(file1, file2);
  expect(result).toEqual(expected);
});

test('compare nested JSON and YAML files', () => {
  const file1 = getFixturePath('file1-nested.json');
  const file2 = getFixturePath('file2-nested.yaml');
  const expected = readFile('expected-nested.txt');
  
  const result = genDiff(file1, file2);
  expect(result).toEqual(expected);
});

test('default format is stylish', () => {
  const file1 = getFixturePath('file1-nested.json');
  const file2 = getFixturePath('file2-nested.json');
  
  const result1 = genDiff(file1, file2);
  const result2 = genDiff(file1, file2, 'stylish');
  expect(result1).toEqual(result2);
});