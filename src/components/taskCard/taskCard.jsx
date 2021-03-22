import React, { Component } from 'react';
import TaskObject from '../taskObject/taskObject';
import './taskCard.css'

class TaskCard extends Component {
    render() { 
        return (
            <div className={this.props.taskCardClass}>
                <div className="titleContainer">
                    <input id="title"
                        className="title"
                        defaultValue={this.props.title === "Enter a card title"? "New Task" : this.props.title}
                        onChange={(event) => this.props.onChangeTitleText(this.props.id, event)}>
                    </input>

                    <span className="gg-add-r" onClick={() => this.props.onAddTask(this.props.id)}></span>
                    <span className="gg-close-r" onClick={() => this.props.onDeleteCard(this.props.id)}></span>
                </div>
                
                <div className="body">
                    <ul>
                        {this.props.tasks.map((task) =>
                            <TaskObject key={task.id}
                                        id={task.id}
                                        isComplete={task.isComplete}
                                        value={task.value}
                                        onCheckboxClick={(taskId) => this.props.onCheckboxClick(this.props.id, taskId)}
                                        onChangeTaskText={(event, taskId) => this.props.onChangeTaskText(this.props.id, taskId, event)}
                                        onRemoveTask={(taskId) => this.props.onRemoveTask(this.props.id, taskId)}>
                            </TaskObject>
                        )}
                    </ul>
                </div>

                <div className="footer">
                    <div className="completedCount">
                        {this.props.completedTasks}/{this.props.tasks.length}
                    </div>
                </div>
            </div>
        );
    }


   

}
 
export default TaskCard;