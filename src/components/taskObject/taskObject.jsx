import React, { Component } from 'react';
import './taskObject.css'

class TaskObject extends Component {
    render() { 
        return ( 
            <div className="taskList">
                <input type="checkbox"
                    className="checkbox"
                    id={this.props.id}
                    onChange={() => this.props.onCheckboxClick(this.props.id)}
                    checked={this.props.isComplete}>
                </input>
                <li>
                    <input className="taskDescription"
                        id={this.props.id}
                        style={this.props.isComplete? {"textDecoration": "line-through"} : {} }
                        defaultValue={this.props.value}
                        onChange={(event) => this.props.onChangeTaskText(event, this.props.id)}>
                    </input>
                </li>
                <span className="gg-trash" onClick={() => this.props.onRemoveTask(this.props.id)}></span>
            </div>
         );
    }
}
 
export default TaskObject;