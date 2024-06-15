import { Todo } from 'entities/todo';
import { StorageService } from './storage';

const key = 'test';
const storage = new StorageService(key);
const todosMock: Todo[] = [{ id: 'first', title: 'first', date: Date.now(), completed: false }];

describe('storage service', () => {
  test('set', () => {
    storage.set(todosMock);
    const storageValue = JSON.parse(localStorage.getItem(key) as string);
    expect(storageValue).toEqual(todosMock);
  });

  test('get', () => {
    const todosFromStorage = storage.get();
    expect(todosFromStorage).toEqual(todosMock);
  });

  test('remove', () => {
    storage.remove();
    const storageValue = JSON.parse(localStorage.getItem(key) as string);
    expect(storageValue).toBeNull();
  });
});
