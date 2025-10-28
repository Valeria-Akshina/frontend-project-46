import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__tests__', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('compare flat JSON files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('expected.txt').trim();
  
  const result = genDiff(file1, file2);
  expect(result).toEqual(expected);
});

test('compare flat YAML files', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');
  const expected = readFile('expected.txt').trim();
  
  const result = genDiff(file1, file2);
  expect(result).toEqual(expected);
});

test('compare JSON and YAML files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yaml');
  const expected = readFile('expected.txt').trim();
  
  const result = genDiff(file1, file2);
  expect(result).toEqual(expected);
});

test('compare identical files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file1.json');
  
  const result = genDiff(file1, file2);
  expect(result).toContain('host: hexlet.io');
  expect(result).not.toContain('+');
  expect(result).not.toContain('-');
});

test('default format is stylish', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  
  const result1 = genDiff(file1, file2);
  const result2 = genDiff(file1, file2, 'stylish');
  expect(result1).toEqual(result2);
});

test('throws error for unsupported format', () => {
  const file1 = getFixturePath('file1.txt');
  const file2 = getFixturePath('file2.txt');
  
  expect(() => genDiff(file1, file2)).toThrow('Unsupported format');
});