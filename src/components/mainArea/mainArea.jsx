import React, { Component } from 'react';
import TaskCard from './../taskCard/taskCard'
import './mainArea.css'

class MainArea extends Component {
    state = { 
        ids: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17
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
        const taskCards = this.state.ids.filter(arrayId => arrayId !== id);
        this.setState({ids: taskCards});
    }

}
 
export default MainArea;