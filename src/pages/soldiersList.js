import React, { Component } from 'react';
import action_getSolidersList from '../action/action_getSolidersList';
import { connect } from 'react-redux';
import TableHead from '../components/tableHead';
import styled from '@emotion/styled';
import TableBody from '../components/tableBody';
import action_getSuperiorInfo from "../action/action_getSuperiorInfo";
import action_deleteSolider from "../action/action_deleteSolider";
import {Link} from 'react-router-dom';
import SoliderListHead from '../components/soliderListHead';

const TableContainer = styled.div`
    font-family: arial, sans-serif;
    border-collapse: collapse;
    font-size: calc(5px + 2vmin);
    td, th {
         border: 1px solid #dddddd;
         text-align: left;
         padding: 8px;
         border:none;
         width:130px
    }

    tbody {
        overflow-y: scroll;
        max-height: 400px;
        display: block;
        font-size:small;
    }
    th button {
         border:none;
         background-color:white;
         font-family: arial, sans-serif;
         font-weight:bold;
         font-size: calc(5px + 2vmin);
    }
    tr:nth-child(even) {
         background-color: #dddddd;
    }

    tr th {
         fontWeight:70px;
    }

    tr {
         border-bottom:2px solid lightgray;
    }
`;

class SoldiersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            soliders : [],
            inputVal:''
        }
    }

    componentDidMount() {

       this.props.getSolidersList1();
        console.log("test list", this.state.soliders)

    }

    componentWillReceiveProps(nextProps){
        this.setState({soliders: nextProps.reducer_getSoliders.soliders});
    }

    handleInputChange = name => {
        this.setState({inputVal: name});
        if(this.state.inputVal == " "){
            console.log("input")
            this.setState({soliders: this.props.reducer_getSoliders.soliders});
        }else {
            console.log("test input value", this.state.inputVal);
            let searchByName = [];
            this.state.soliders.forEach((item) => {
                if(item.Name.includes(this.state.inputVal)){
                    searchByName.push(item);
                }
            });
            this.setState({soliders: searchByName});
        }
       
    }

    render() {

        return (
            <div>

                <h2>US Army Personnel Registry</h2>
                <SoliderListHead
                    getSolidersList={this.props.getSolidersList1}
                    inputVal = {this.state.inputVal}
                    onInputChange={this.handleInputChange}
                />
                <TableContainer>

                    <TableHead />
                    <tbody>
                        <TableBody solider={this.state.soliders}
                            getSuperiorInfo={this.props.getSuperiorInfo1}
                            deleteSolider={this.props.deleteSolider1}
                        />
                    </tbody>

                </TableContainer>

            </div>
        )

    }


}

const mapStateToProps = state => {
    return {
        reducer_getSoliders: state.reducer_getSoliders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSolidersList1: () => dispatch(action_getSolidersList()),
        getSuperiorInfo1: id => dispatch(action_getSuperiorInfo(id)),
        deleteSolider1: (id, numOfDS, superiorid) => dispatch(action_deleteSolider(id,numOfDS, superiorid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SoldiersList);