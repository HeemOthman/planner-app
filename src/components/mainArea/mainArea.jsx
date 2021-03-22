import React, { Component } from 'react';
import TaskCard from './../taskCard/taskCard'
import './mainArea.css'

class MainArea extends Component {
    state = {
        newTaskCardTitle: "Enter a title",
        ids: []
     }

    
    render() { 
        return (
            <React.Fragment>
                <h1 className="header">Task List</h1>
                <div className="upperArea">
                    <input className="input_taskCardTitle"
                           placeholder={this.state.newTaskCardTitle}
                           onChange={(event) => this.handleChangeTaskCardTitle(event)}>
                    </input>
                    <button className="button_addTaskCard"
                            onClick={this.handleAddTaskCard}>
                                Add Task Card
                    </button>
                </div>

                <div className="mainArea">
                    {this.state.ids.map(id =>
                    <TaskCard key={id} id={id} onDelete={this.handleDelete} title={this.state.newTaskCardTitle}/>)}
                </div>
            </React.Fragment>
         );
    }


    //HANDLE CHANGING THE TASK CARD TITLE
    handleChangeTaskCardTitle = (event) => {
        this.setState({newTaskCardTitle: event.target.value === ""? "Enter a title" : event.target.value})
    };


    //HANDLE ADDING A TASK CARD
    handleAddTaskCard = () => {
        let taskCards = this.state.ids;
        let nextId = taskCards[taskCards.length-1];

        if (nextId == null? nextId = 0: nextId+=1);

        taskCards.push(nextId);

        this.setState({ids: taskCards});
    };


    //HANDLE DELETING A TASK CARD
    handleDelete = (id) => {
        const taskCards = this.state.ids.filter(taskCardId => taskCardId !== id);
        this.setState({ids: taskCards});
    };

}
 
export default MainArea;