import React, { Component } from 'react';
import TaskCard from './../taskCard/taskCard'

class MainArea extends Component {
    state = { 
        ids: [
            1,
            2,
            3,
            4,
            5
        ]
     }

    
    render() { 
        return (
            this.state.ids.map(id =>
                <TaskCard key={id} id={id} onDelete={this.handleDelete}/>
            )
         );
    }


    //HANDLE DELETE
    handleDelete = (id) => {
        const taskCards = this.state.ids.filter(arrayId => arrayId !== id);
        this.setState({ids: taskCards});
    }

}
 
export default MainArea;