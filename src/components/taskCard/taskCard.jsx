import React, { Component } from 'react';
import TaskObject from '../taskObject/taskObject';
import './taskCard.css'

class TaskCard extends Component {
    state = { 
        title: this.props.title,
        id: this.props.id,
        completedTasks: 0,
        tasks: []
    }


    render() { 
        return ( 
            <div className="taskCard">
                <div className="titleContainer">
                    <input id="title"
                        className="title"
                        defaultValue={this.state.title === "Enter a title"? "New Task" : this.state.title}
                        onChange={this.handleChangeTitleText}>
                    </input>

                    <span className="gg-add-r" onClick={this.handleAddTask}></span>
                    <span className="gg-close-r" onClick={() => this.props.onDelete(this.props.id)}></span>
                </div>
                
                <div className="body">
                    <ul>
                        {this.state.tasks.map((task) =>
                            <TaskObject key={task.id}
                                        id={task.id}
                                        isComplete={task.isComplete}
                                        value={task.value}
                                        onCheckboxClick={(taskId) => this.handleCheckboxClick(taskId)}
                                        onChangeTaskText={(event, taskId) => this.handleChangeTaskText(event, taskId)}
                                        onRemoveTask={(taskId) => this.handleRemoveTask(taskId)}>
                            </TaskObject>
                        )}
                    </ul>
                </div>

                <div className="footer">
                    <div className="completedCount">
                        {this.state.completedTasks}/{this.state.tasks.length}
                    </div>
                </div>
            </div>
        );
    }


    //HANDLE CHANGING TITLE TEXT
    handleChangeTitleText = (newTitle) => {
        this.setState({ title: newTitle.target.value })
    }


    //HANDLE CHANGING TASK TEXT
    handleChangeTaskText = (event, taskId) => {
        let updatedTasks = [...this.state.tasks];
        let task = this.getTaskById(taskId);
        let index = updatedTasks.indexOf(task);

        updatedTasks[index].value = event.target.value;

        this.setState({ tasks: updatedTasks })
    }


    //HANDLE ADDING A TASK
    handleAddTask = () => {
        let updatedTasks = [...this.state.tasks];
        let newId = 0;

        if (updatedTasks.length > 0) {
            newId = updatedTasks[updatedTasks.length-1].id + 1;
        }
        
        updatedTasks.push({id: newId, value: "New Task", isComplete: false});

        this.setState({ tasks: updatedTasks });
    }


    //HANDLE REMOVING A TASK
    handleRemoveTask = (taskId) => {
        let updatedTaskss = [...this.state.tasks];
        let updatedTasks = updatedTaskss.filter(task => task.id !== taskId);
        
        this.setState({ tasks: updatedTasks }, () => {
            this.updateCompletedTasksCount();
        });
    }


    //HANDLE CLICKING THE CHECKBOX
    handleCheckboxClick = (taskId) => {
        let updatedTasks = [...this.state.tasks];
        let taskToComplete = this.getTaskById(taskId);
        let index = updatedTasks.indexOf(taskToComplete);

        updatedTasks[index].isComplete = !updatedTasks[index].isComplete;

        this.setState({ tasks: updatedTasks }, () => {
            this.updateCompletedTasksCount();
        });
    }


    //UPDATE THE COUNT OF COMPLETED TASKS
    updateCompletedTasksCount = () => {
        let total = 0;

        this.state.tasks.forEach((task) => {    
            if (task.isComplete) {
                total++;
            }
            
        });

        this.setState({ completedTasks: total })
    }


    //GET THE TASK BASED ON AN ID
    getTaskById = (id) => {
        let taskToGet = [];

        this.state.tasks.forEach((task) => {
            if (task.id === id) {
                taskToGet = task;
            }
        });

        return taskToGet;
    }


}
 
export default TaskCard;