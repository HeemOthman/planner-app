import React, { Component } from 'react';
import './upperArea.css'

class UpperArea extends Component {
    state = { 
    }

    
    render() { 
        return (
            <div className="upperArea">
                <input className="input_taskCardTitle"></input>
                <button className="button_addTaskCard"></button>
            </div>
            
        );
    }

}
 
export default UpperArea;