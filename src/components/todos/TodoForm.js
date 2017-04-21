import React from 'react';

export const TodoForm = (props) => (
    <form onSubmit={props.handleSubmit}>
      <input type="text"
             value={props.currentTodo}
             onChange={props.handleTodoChange} />
    </form>
  )

TodoForm.propTypes = {
  currentTodo: React.PropTypes.string.isRequired,
  handleTodoChange: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}
