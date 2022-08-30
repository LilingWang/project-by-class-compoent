import React from "react";
import {Link} from 'react-router-dom';
//import {Linking} from 'react-native'


const TableRow = ({key, id, Avatar, Name, NumberOfDS, Phone, Rank, Sex, StartDate,Email, Superior, getSuperiorInfo, deleteSolider})=>{
    
    const newOne = {
        NumberOfDS:NumberOfDS,
    }

    const superiInfo ={ 
        SuperiorId:Superior[1],
    }
    
    return (
        <tr key={key}>
            <td><img src={Avatar} alt="img" width="50px" height="50px"></img></td>
            <td>{Name}</td>
            <td>{Sex}</td>
            <td>{Rank}</td>                                                                                                                                                                                                                                                                                                                                                                                                               
            <td>{StartDate.slice(0,10)}</td>
            <td><a href={`tel:${Phone}`}>{Phone}</a></td>
            <td><a href={"mailto:" + {Email}}>{Email}</a></td>
            <td>{Superior.length <= 1 || Superior[0] == null? "" : (<button onClick={() => getSuperiorInfo([Superior[1]])}>{Superior[0] }</button>)}</td>
            <td>{NumberOfDS.length === 0? " ": (<button onClick={() => getSuperiorInfo(NumberOfDS)}>{NumberOfDS.length}</button>)}</td>
            <td><button><Link to = {"/addNewSolider/"+ id}>Edit</Link></button></td>
            <td><button onClick={() => deleteSolider(id, newOne, Superior[1])}>Delete</button></td>
        </tr>
    )

}

export default TableRow;