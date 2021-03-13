import React, { Component } from 'react';
import './taskCard.css'

class TaskCard extends Component {
    state = { 
        title: "Title"
    }


    render() { 
        return ( 
            <div className="taskCard">
                <input className="title" defaultValue={this.state.title}></input>
                <div className="body"></div>
            </div>
        );
    }
}
 
export default TaskCard;