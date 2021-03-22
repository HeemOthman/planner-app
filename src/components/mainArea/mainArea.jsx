import React, { Component } from 'react';
import TaskCard from './../taskCard/taskCard'
import './mainArea.css'

class MainArea extends Component {
    state = {
        newTaskCardTitle: "Enter a card title",
        taskCards: []
    }

    
    render() { 
        return (
            <React.Fragment>
                <h1 className="header">Task List</h1>
                <div className="upperArea">
                    <input className="input_taskCardTitle"
                           placeholder={this.state.newTaskCardTitle}
                           onChange={(event) => this.handleChangeCardTitleInput(event)}>
                    </input>
                    <button className="button_addTaskCard"
                            onClick={this.handleAddCard}>
                                Add New Card
                    </button>
                </div>

                <div className="mainArea">
                    {this.state.taskCards.map((taskCard) =>
                        <TaskCard key={taskCard.id}
                                id={taskCard.id}
                                title={taskCard.title}
                                completedTasks={taskCard.completedTasks}
                                tasks={taskCard.tasks}
                                taskCardClass={taskCard.taskCardClass}
                                onDeleteCard={this.handleDeleteCard}
                                onChangeTitleText={this.handleChangeTitleText}
                                onAddTask={this.handleAddTask}
                                onRemoveTask={this.handleRemoveTask}
                                onCheckboxClick={this.handleCheckboxClick}
                                onChangeTaskText={this.handleChangeTaskText}
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


    /****************************************/
    /* MAIN AREA METHODS ********************/
    /****************************************/

    //HANDLE CHANGING THE TASK CARD TITLE
    handleChangeCardTitleInput = (event) => {
        this.setState({newTaskCardTitle: event.target.value === ""? "Enter a card title" : event.target.value});
    };


    //HANDLE ADDING A TASK CARD
    handleAddCard = () => {
        let taskCards = [...this.state.taskCards];

        //CREATE A DEFAULT ID
        let nextId = 0;

        //IF THERE ARE NO CARDS USE THE DEFAULT ID, OTHERWISE GET THE LAST CARD'S ID AND ADD 1
        if (taskCards[taskCards.length-1] !== undefined) {
            nextId = taskCards[taskCards.length-1].id + 1;
        }

        //PUSH THE NEW CARD INTO THE ARRAY OF TASK CARDS
        taskCards.push({id: nextId,
                        title: this.state.newTaskCardTitle,
                        completedTasks: 0,
                        tasks: [],
                        taskCardClass: "taskCard"
        });

        //SET THE STATE AND UPDATE LOCAL STORAGE
        this.setState({taskCards: taskCards}, () => this.updateLocalStorage());
    };


    //HANDLE DELETING A TASK CARD
    handleDeleteCard = (id) => {
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

        //FILTER OUT THE CARD TO BE DELETED
        taskCards = this.state.taskCards.filter(taskCard => taskCard.id !== id);

        //SET THE STATE AND UPDATE LOCAL STORAGE
        this.setState({taskCards: taskCards}, () => this.updateLocalStorage());
    };


    
    /****************************************/
    /* TASK CARD METHODS ********************/
    /****************************************/

     //HANDLE CHANGING TITLE TEXT
     handleChangeTitleText = (cardId, event) => {
        let taskCards = this.state.taskCards;

        //GET THE CARD WHOSE TITLE CHANGED AND UPDATE THE TITLE TO WHAT WAS TYPED IN
        taskCards.forEach((taskCard) => {
            if (taskCard.id === cardId) {
                taskCard.title = event.target.value
            }
        });

        this.setState({ taskCards: taskCards }, () => this.updateLocalStorage());
    }


    //HANDLE CHANGING TASK TEXT
    handleChangeTaskText = (cardId, taskId, event) => {
        let taskCards = [...this.state.taskCards];
        let card;
        let updatedTasks = [];

        //GET THE CARD THAT THE TEXT CHANGED
        taskCards.forEach((taskCard) => {
            if (taskCard.id === cardId) {
                card = taskCard;
            }
        });

        //GET THE INDEX OF THE TASKS WHOSE TEXT CHANGED AND SET THE VALUE TO WHAT WAS TYPED IN
        updatedTasks = [...card.tasks];
        let task = this.getTaskById(cardId, taskId);
        let index = updatedTasks.indexOf(task);
        updatedTasks[index].value = event.target.value;

        //UPDATE THE CARD'S TASKS SO IT HAS THE NEW TEXT
        card.tasks = updatedTasks;

        //SET THE STATE AND UPDATE LOCAL STORAGE
        this.setState({ taskCards: taskCards }, () => this.updateLocalStorage());
    }


    //HANDLE ADDING A TASK
    handleAddTask = (cardId) => {
        let taskCards = [...this.state.taskCards];
        let updatedTasks = [];

        //GET THE TASKS OF THE CARD THAT HAD THE ADD TASK BUTTON CLICKED
        taskCards.forEach((taskCard) => {
            if (taskCard.id === cardId) {
                updatedTasks = taskCard.tasks;
            }
        });

        //CREATE A DEFAULT 0 ID
        let newId = 0;

        //IF THERE ARE NO TASKS USE THE DEFAULT 0, OTHERWISE GET THE LAST TASK'S ID AND ADD 1
        if (updatedTasks.length > 0) {
            newId = updatedTasks[updatedTasks.length-1].id + 1;
        }
        
        //PUSH THE NEW TASK INTO THE LIST OF TASKS
        updatedTasks.push({id: newId, value: "New Task", isComplete: false});

        //SET THE STATE AND UPDATE LOCAL STORAGE
        this.setState({ taskCards: taskCards }, () => this.updateLocalStorage());
    }


    //HANDLE REMOVING A TASK
    handleRemoveTask = (cardId, taskId) => {
        let taskCards = [...this.state.taskCards];
        let card;
        let updatedTasks = [];

        //GET THE CARD THAT HAD THE DELETE TASK BUTTON CLICKED
        taskCards.forEach((taskCard) => {
            if (taskCard.id === cardId) {
                card = taskCard;
            }
        });

        //GET THE NEW ARRAY OF TASKS THAT HAS THE TASK TO BE DELETED REMOVED
        updatedTasks = [...card.tasks];
        let updatedTasksFiltered = updatedTasks.filter(task => task.id !== taskId);
        
        //SET THE CARD'S TASKS TO THE NEW FILTERED ARRAY
        card.tasks = updatedTasksFiltered;

        //SET THE STATE AND UPDATE LOCAL STORAGE
        this.setState({ taskCards: taskCards }, () => {
            this.updateCompletedTasksCount(cardId);
            this.updateLocalStorage();
        });
    }


    //HANDLE CLICKING THE CHECKBOX
    handleCheckboxClick = (cardId, taskId) => {
        let taskCards = [...this.state.taskCards];
        let card;
        let updatedTasks = [];

        //GET THE CARD THAT HAD THE COMPLETE TASK CHECKBOX CLICKED
        taskCards.forEach((taskCard) => {
            if (taskCard.id === cardId) {
                card = taskCard;
            }
        });

        //GET THE INDEX OF THE TASK WHOSE CHECKBOX WAS CLICKED
        updatedTasks = [...card.tasks];
        let taskToComplete = this.getTaskById(cardId, taskId);
        let index = updatedTasks.indexOf(taskToComplete);

        //UPDATE THE VALUE
        updatedTasks[index].isComplete = !updatedTasks[index].isComplete;

        //UPDATE THE TASKS WITH THE NEW VALUE
        card.tasks = updatedTasks;

        //SET THE STATE AND UPDATE LOCAL STORAGE
        this.setState({ taskCards: taskCards }, () => {
            this.updateCompletedTasksCount(cardId);
            this.updateLocalStorage();
        });
    }


    //UPDATE THE COUNT OF COMPLETED TASKS
    updateCompletedTasksCount = (cardId) => {
        let taskCards = [...this.state.taskCards];
        let card;

        //GET THE CARD
        taskCards.forEach((taskCard) => {
            if (taskCard.id === cardId) {
                card = taskCard;
            }
        });

        //INITIALIZE THE TOTAL
        let total = 0;

        //ADD UP THE TASKS THAT ARE COMPLETE
        card.tasks.forEach((task) => {    
            if (task.isComplete) {
                total++;
            }
        });

        //SET THE CARD'S COMPLETED TASKS TO THE NEW TOTAL
        card.completedTasks = total;

        //SET THE STATE
        this.setState({ taskCards: taskCards })
    }


    //GET THE TASK BASED ON AN ID
    getTaskById = (cardId, taskId) => {
        let taskCards = [...this.state.taskCards];
        let tasks = [];
        let taskToGet = [];

        //GET THE TASKS OF THE CARD
        taskCards.forEach((taskCard) => {
            if (taskCard.id === cardId) {
                tasks = [...taskCard.tasks];
            }
        });
        
        //GET THE SPECIFIC TASK
        tasks.forEach((task) => {
            if (task.id === taskId) {
                taskToGet = task;
            }
        });

        return taskToGet;
    }


    //UPDATE THE LOCAL STORAGE
    updateLocalStorage() {
        if (!localStorage.taskCards) {
            localStorage.setItem("taskCards", JSON.stringify(this.state.taskCards));
        }
        else {
            localStorage.taskCards = JSON.stringify(this.state.taskCards);
        }
    }

}
 
export default MainArea;