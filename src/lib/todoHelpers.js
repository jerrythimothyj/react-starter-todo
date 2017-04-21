export const addTodo = (list, item) => [...list, item]

export const findById = (id, list) => list.find(item => item.id === id)

export const toggleToDo = (todo) => ({...todo, isComplete: !todo.isComplete})

export const updateToDo = (list, toUpdateToDo) => {
	const updatedIndex = list.findIndex(item => item.id === toUpdateToDo.id)
	return [
		...list.slice(0,updatedIndex),
		toUpdateToDo,
		...list.slice(updatedIndex+1)
	]
}

export const removeTodo = (list, id) => {
	const removeIndex = list.findIndex(item => item.id === id)

	return [
		...list.slice(0,removeIndex),
		...list.slice(removeIndex+1)
	]
}

export const filterTodos = (list, route) => {
	switch(route) {
		case '/active':
			return list.filter(item => item.isComplete===false);

		case '/complete':
				return list.filter(item => item.isComplete===true);

		default:
					return list;
	}
}
