import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todos';
import {addTodo, findById, toggleToDo, updateToDo, removeTodo, filterTodos} from './lib/todoHelpers.js';
import {pipe, partial} from './lib/utils.js';
import {loadTodos, createTodo, saveTodo, destroyTodo} from './lib/todoService';

class App extends Component {

  state = {
    todos: [],
    currentTodo: ''
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  handleTodoChange = (eve) => {
    this.setState({
      currentTodo: eve.target.value
    })
  }

handleSubmit = (eve) => {
  eve.preventDefault();

  const newTodo = {id: this.state.todos.length + 1, name: this.state.currentTodo, isComplete: false};

  this.setState({
    todos: addTodo(this.state.todos, newTodo),
    currentTodo: '',
    errorMessage: ''
  })

  createTodo(newTodo).then(() => this.showTempMessage('Todo Added'))
}

showTempMessage = (msg) => {
  this.setState({message: msg})

  setTimeout(() => this.setState({message: ''}), 3000);
}

handleToggle = (id) => {
  const getToggledTodo = pipe(findById, toggleToDo);
  const updated = getToggledTodo(id, this.state.todos);
  const getUpdatedTodos = partial(updateToDo, this.state.todos);
  const updatedToDos = getUpdatedTodos(updated);
  this.setState({todos: updatedToDos});

  saveTodo(updated).then(() => this.showTempMessage('Todo Updated'))
}

handleEmpty = (eve) => {
  eve.preventDefault();
  this.setState({
    errorMessage: 'Please enter a todo name'
  });
}

handleRemove = (id, eve) => {
  eve.preventDefault();
  const updatedToDos = removeTodo(this.state.todos, id);
  this.setState({todos: updatedToDos});

  destroyTodo(id).then(() => this.showTempMessage('Todo Deleted'))
}

componentDidMount() {
  loadTodos()
    .then((todos) => this.setState({todos}));
}

  render() {
    const submitHandler = this.state.currentTodo? this.handleSubmit : this.handleEmpty;
    const displayTodos = filterTodos(this.state.todos, this.context.route);

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
        {this.state.errorMessage && <span>{this.state.errorMessage}</span>}
        {this.state.message && <span>{this.state.message}</span>}
          <TodoForm currentTodo={this.state.currentTodo}
                    handleTodoChange={this.handleTodoChange}
                    handleSubmit={submitHandler} />
        </div>
        <div>
          <TodoList todos={displayTodos}
                    handleToggle={this.handleToggle}
                    handleRemove={this.handleRemove} />
          <Footer />
        </div>
      </div>
    );
  }
}


export default App;
