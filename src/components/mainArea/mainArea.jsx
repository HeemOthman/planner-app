import React, { Component } from 'react';
import TaskCard from './../taskCard/taskCard'
import './mainArea.css'

class MainArea extends Component {
    state = {
        newTaskCardTitle: "Enter a title",
        taskCards: []
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
                    {this.state.taskCards.map((taskCard) =>
                        <TaskCard key={taskCard.id}
                                id={taskCard.id}
                                taskCardClass={taskCard.taskCardClass}
                                title={taskCard.title}
                                onDelete={this.handleDelete}
                        />
                    )}
                </div>
            </React.Fragment>
         );
    }


    //ONCE THE COMPONENT IS LOADED
    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("taskCards"));

        if (localStorage.getItem("taskCards")) {
            this.setState({ taskCards: data });
        }
    }


    //HANDLE CHANGING THE TASK CARD TITLE
    handleChangeTaskCardTitle = (event) => {
        this.setState({newTaskCardTitle: event.target.value === ""? "Enter a title" : event.target.value});
    };


    //HANDLE ADDING A TASK CARD
    handleAddTaskCard = () => {
        let taskCards = this.state.taskCards;
        let nextId = 0;

        if (taskCards[taskCards.length-1] !== undefined) {
            nextId = taskCards[taskCards.length-1].id + 1;
        }

        taskCards.push({id: nextId, title: this.state.newTaskCardTitle, taskCardClass: "taskCard"});

        this.setState({taskCards: taskCards});

        if (!localStorage.taskCards) {
            localStorage.setItem("taskCards", JSON.stringify(taskCards));
        }
        else {
            localStorage.taskCards = JSON.stringify(taskCards);
        }
    };


    //HANDLE DELETING A TASK CARD
    handleDelete = (id) => {
        let taskCards = [...this.state.taskCards];
        
        //CODE TO CHANGE THE ANIMATION OF THE TASK CARD TO DELETE
        /*
        let taskCardToDelete = null;

        taskCards.forEach((taskCard) => {
            if (taskCard.id === id) {
                taskCardToDelete = taskCard;
            }
        });

        let index = taskCards.indexOf(taskCardToDelete);
        taskCards[index] = {id: id, title: taskCardToDelete.title, taskCardClass: "taskCard"};
        */

        this.setState({taskCards: taskCards}, () => {
            let taskCards = this.state.taskCards.filter(taskCard => taskCard.id !== id);
            this.setState({taskCards: taskCards});

            if (!localStorage.taskCards) {
                localStorage.setItem("taskCards", JSON.stringify(taskCards));
            }
            else {
                localStorage.taskCards = JSON.stringify(taskCards);
            }
        });
    };

}
 
export default MainArea;