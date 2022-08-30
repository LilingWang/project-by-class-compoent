import React, { Component } from "react";
import TableRow from "./tableRow";

class TableBody extends Component {

    constructor(props) {
        super(props);
        console.log('test table body', this.props.solider)
       // console.log('test', this.props)
    }

   /* handleSuperior (id) {

        console.log("test....", id)
        //return this.props.reducer_getSoliders
        this.props.getSuperiorInfo1(id);


    }*/

    render() {
         console.log('test', this.props)
        return (
              <React.Fragment>
                {this.props.solider.map(item => <TableRow
                    key={item._id}
                    id={item._id}
                    Avatar={item.Avatar}
                    Name={item.Name}
                    NumberOfDS={item.NumberOfDS}
                    Phone={item.Phone}
                    Rank={item.Rank}
                    Sex={item.Sex}
                    StartDate={item.StartDate}
                    Email={item.Email}
                    Superior={item.Superior}
                    getSuperiorInfo={this.props.getSuperiorInfo}
                    deleteSolider={this.props.deleteSolider}
                   
                />
                )}
                </React.Fragment>
            

        )
    }
}
export default TableBody;