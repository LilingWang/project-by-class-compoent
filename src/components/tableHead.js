import React, {Component} from "react";
import { MdOutlineImportExport } from "react-icons/md";


const TableHead = ({}) => {

    return(
        <>
         <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Rank</th>
                        <th>Start Date</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Superior</th>
                        <th># of D.S.</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
        </>
    )
}

export default TableHead;