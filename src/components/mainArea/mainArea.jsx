import React, { Component } from 'react';
import TaskCard from './../taskCard/taskCard'
import './mainArea.css'

class MainArea extends Component {
    state = { 
        ids: [
            1,
            2,
            3,
            4
        ]
     }

    
    render() { 
        return (
            <div className="mainArea">
                {this.state.ids.map(id =>
                <TaskCard key={id} id={id} onDelete={this.handleDelete}/>)}
            </div>
            
         );
    }


    //HANDLE DELETE
    handleDelete = (id) => {
        const taskCards = this.state.ids.filter(taskCardId => taskCardId !== id);
        this.setState({ids: taskCards});
    }

}
 
export default MainArea;