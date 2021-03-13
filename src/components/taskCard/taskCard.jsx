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

                    <span className="removeCard" onClick={() => this.props.onDelete(this.props.id)}>X</span>
                </div>
                
                <div className="body">
                    <ul>
                        {this.state.tasks.map(task =>
                            <div className="task" key={task.id}>
                                <input type="checkbox"
                                       id={task.id}
                                       onChange={() => this.handleCheckboxClick(this.state.tasks[task.id])}
                                       checked={task.isComplete}></input>
                                <li className="taskDescription"
                                    id={task.id}>{task.value}</li>
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


    //HANDLE CLICKING THE CHECKBOX
    handleCheckboxClick = (task) => {
        console.log(task.id);

        const updatedTasks = [...this.state.tasks];
        updatedTasks[task.id] = {...task};
        updatedTasks[task.id].isComplete = true;

         this.setState({
            tasks: updatedTasks
        });

        console.log(updatedTasks[task.id].isComplete);
    }
}
 
export default TaskCard;