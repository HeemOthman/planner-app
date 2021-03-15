import React, { Component } from 'react';
import './taskCard.css'

class TaskCard extends Component {
    state = { 
        title: "Title",
        id: this.props.id,
        tasks: [
            {id: 0, value:"myTask", isComplete: false},
            {id: 1, value:"To do", isComplete: false}
        ]
    }


    render() { 
        return ( 
            <div className="taskCard">
                <div className="titleContainer">
                    <input id="title"
                        className="title"
                        defaultValue={this.state.title}
                        onChange={this.handleChange}>
                    </input>

                    <span className="gg-add-r" onClick={this.handleAddTask}></span>
                    <span className="gg-close-r" onClick={() => this.props.onDelete(this.props.id)}></span>
                </div>
                
                <div className="body">
                    <ul>
                        {this.state.tasks.map(task =>
                            <div className="taskList" key={task.id}>
                                <input type="checkbox"
                                       className="checkbox"
                                       id={task.id}
                                       onChange={() => this.handleCheckboxClick(task)}
                                       checked={task.isComplete}>
                                </input>
                                <li>
                                    <input className="taskDescription"
                                           id={task.id}
                                           style={task.isComplete? {"textDecoration": "line-through"} : {} }
                                           defaultValue={task.value}
                                           onChange={(event) => this.handleChangeTask(event, task)}>
                                    </input>
                                </li>
                                <span className="gg-trash" onClick={() => this.handleRemoveTask(task)}></span>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        );
    }


    //HANDLE CHANGING TITLE TEXT
    handleChange = (newInput) => {
        this.setState({
            title: newInput.target.value
        })
    }


    //HANDLE CHANGING TITLE TEXT
    handleChangeTask = (event, task) => {
        const updatedTasks = [...this.state.tasks];
        let index = updatedTasks.indexOf(task);
        updatedTasks[index].value = event.target.value;

        this.setState({
            tasks: updatedTasks
        })
    }


//TODO: If adding, then deleting, then adding tasks back,
//will get an error about encountering children with the same id.
//Need to update the id's of each item based on their current index

    //HANDLE ADDING A TASK
    handleAddTask = () => {
        this.setState({
            tasks: [...this.state.tasks, {id: this.state.tasks.length, value: "New Task", isComplete: false}]
        });
    }


    //HANDLE REMOVING A TASK
    handleRemoveTask = (task) => {
        const updatedTasks = [...this.state.tasks];
        let index = updatedTasks.indexOf(task);

        updatedTasks.splice(index, 1);

        this.setState({
            tasks: updatedTasks
        });
    }


    //HANDLE CLICKING THE CHECKBOX
    handleCheckboxClick = (task) => {
        const updatedTasks = [...this.state.tasks];
        let index = updatedTasks.indexOf(task);

        updatedTasks[index].isComplete = !updatedTasks[index].isComplete;

        this.setState({
            tasks: updatedTasks
        });
    }

}
 
export default TaskCard;