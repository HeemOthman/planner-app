import React, { Component } from 'react';
import './taskCard.css'

class TaskCard extends Component {
    state = { 
        title: "Title",
        id: this.props.id
    }


    render() { 
        return ( 
            <div className="taskCard">
                <input id="title"
                       className="title"
                       defaultValue={this.state.title}
                       onKeyDown={this.handleKeyDown}>
                </input>
                <div className="removeCard" onClick={() => this.props.onDelete(this.props.id)}>X</div>
                
                <div className="body"></div>
            </div>
        );
    }

    //HANDLE PRESSING ENTER WHEN TYPING A NEW TITLE
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
           const newTitle = document.getElementById("title").value;
           this.setState({title: newTitle});
        }
    }


}
 
export default TaskCard;