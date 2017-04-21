import {addTodo, findById, toggleToDo, updateToDo, removeTodo, filterTodos} from './todoHelpers';

test('addTodo should add the new item to its list', () => {
  const startTodo = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'sometwo', isComplete: false}
  ]

  const itemToDo = {id: 3, name: 'somethree', isComplete: true}

  const endTodo = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'sometwo', isComplete: false},
    {id: 3, name: 'somethree', isComplete: true}
  ]

  const result = addTodo(startTodo, itemToDo);

  expect(result).toEqual(endTodo);
});

test('addTodo should not mutate existing array', () => {
  const startTodo = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'sometwo', isComplete: false}
  ]

  const itemToDo = {id: 3, name: 'somethree', isComplete: true}

  const endTodo = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'sometwo', isComplete: false},
    {id: 3, name: 'somethree', isComplete: true}
  ]

  const result = addTodo(startTodo, itemToDo);

  expect(result).not.toEqual(startTodo);
});

test('findById should return the expect object using id', () => {
  const startTodo = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'sometwo', isComplete: false}
  ]

  const expectedTodo = {id: 1, name: 'someone', isComplete: true}

  const result = findById(1, startTodo);

  expect(result).toEqual(expectedTodo);
});

test('toggleToDo should toggle the isComplete key', () => {
  const startTodo = {id: 1, name: 'someone', isComplete: true}

  const expectedTodo = {id: 1, name: 'someone', isComplete: false}

  const result = toggleToDo(startTodo);

  expect(result).toEqual(expectedTodo);
});

test('updateToDo should update the list', () => {
  const startTodo = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'sometwo', isComplete: false}
  ]

  const toUpdateToDo = {id: 2, name: 'some2', isComplete: false}

  const expectedTodo = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'some2', isComplete: false}
  ]

  const result = updateToDo(startTodo, toUpdateToDo);

  expect(result).toEqual(expectedTodo);
});

test('updateToDo should not mutate the original array', () => {
  const startTodo = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'sometwo', isComplete: false}
  ]

  const toUpdateToDo = {id: 2, name: 'some2', isComplete: false}

  const expectedTodo = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'some2', isComplete: false}
  ]

  const result = updateToDo(startTodo, toUpdateToDo);

  expect(result).not.toBe(startTodo);
});

test('removeTodo should remove an item from the list', () => {
  const startTodo = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'sometwo', isComplete: false}
  ]

  const toRemoveId = 2;

  const expectedTodo = [{id: 1, name: 'someone', isComplete: true}]

  const result = removeTodo(startTodo, toRemoveId);

  expect(result).toEqual(expectedTodo);
})

test('removeTodo should not remove an item from the original list', () => {
  const startTodo = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'sometwo', isComplete: false}
  ]

  const toRemoveId = 2;

  const expectedTodo = [{id: 1, name: 'someone', isComplete: true}]

  const result = removeTodo(startTodo, toRemoveId);

  expect(result).not.toBe(startTodo);
})


test('filterTodos should return all items for the root route', () => {
  const startTodos = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'sometwo', isComplete: false}
  ]

  const result = filterTodos(startTodos, '/');

  expect(result).toEqual(startTodos);
})

test('filterTodos should return completed items for the completed route', () => {
  const startTodos = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'sometwo', isComplete: false}
  ]

  const expectedTodos = [{id: 1, name: 'someone', isComplete: true}]

  const result = filterTodos(startTodos, '/complete');

  expect(result).toEqual(expectedTodos);
})

test('filterTodos should return incomplete items for the active route', () => {
  const startTodos = [
    {id: 1, name: 'someone', isComplete: true},
    {id: 2, name: 'sometwo', isComplete: false}
  ]

  const expectedTodos = [{id: 2, name: 'sometwo', isComplete: false}]

  const result = filterTodos(startTodos, '/active');

  expect(result).toEqual(expectedTodos);
})
