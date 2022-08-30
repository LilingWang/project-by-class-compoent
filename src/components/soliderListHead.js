import React, {Component} from "react";
import {Link} from 'react-router-dom';

class SoliderListHead extends Component {
    constructor(props){
        super(props)
    }

    handleInputChange = event => {
        this.props.onInputChange(event.target.value);
    }

    render(){
        return(
            <div style={{ display: 'inline-flex' }}>
                        <input type="text" placeholder="Search" onChange={this.handleInputChange} value={this.props.inputVal}></input>
                        <div style={{ marginLeft: "800px" }}>
                            <button onClick={this.props.getSolidersList}>Reset</button>
                            <button><Link to = {"/addNewSolider/"+"add"}>New Solidier</Link></button>
    
                        </div>
                    </div>
        )
    }
    
}

export default SoliderListHead;