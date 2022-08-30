import React, { Component } from "react";
import ImageUploader from "react-images-upload";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './styles.css';
import action_addSolider from "../action/action_addSolider";
import { connect } from 'react-redux';
import action_getSolidersList from '../action/action_getSolidersList';
import action_getSoliderInfo from '../action/action_getSoliderInfo';
import action_editSolider from '../action/action_editSolider';
import armyImg from './army_1.jpeg'

class AddNewSolider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            soliderName: '',
            sex: '',
            rank: '',
            startDate: '',
            phone: '',
            email: '',
            superiorName: '',
            superiorId: '',
            pictures: [],
            soliderNameError: '',
            sexError: '',
            rankError: '',
            startDateError: '',
            phoneError: '',
            emailError: '',
            superiorNameError:''
        }
    }

    componentDidMount() {
        this.props.getSolidersList1();
        if (this.props.match.params.index != "add") {
            this.props.getSoliderInfo1(this.props.match.params.index);
        }
    }

    handleBack = () => {
        this.props.history.push('/');
    }
    handleAddUser = e => {
        e.preventDefault();
        const newSolider = {
            Name: this.state.soliderName,
            Sex: this.state.sex,
            Rank: this.state.rank,
            Phone: this.state.phone,
            Email: this.state.email,
            Avatar: this.state.avatar[0],
            Superior: this.state.superiorName === "None" ? [] : [this.state.superiorName, this.state.superiorId],
            NumberOfDS: [],
            StartDate: this.state.startDate,
            //superiorName: this.state.superiorName,
            //superiorId:this.state.superiorId
            //const {Name, Rank, Sex, Phone, Email, Avatar,Superior, NumberOfDs,StartDate} = req.body;

        }
        const editSoliderInfo = {
            Name: this.state.soliderName,
            Sex: this.state.sex,
            Rank: this.state.rank,
            Phone: this.state.phone,
            Email: this.state.email,
            Avatar: this.state.avatar[0],
            Superior: this.state.superiorName === "None" ? [] : [this.state.superiorName, this.state.superiorId],
            StartDate: this.state.startDate,
            //superiorName: this.state.superiorName,
            //superiorId:this.state.superiorId
            //const {Name, Rank, Sex, Phone, Email, Avatar,Superior, NumberOfDs,StartDate} = req.body;

        }
        if (this.props.match.params.index === "add") {
            this.props.AddNewSolider1(newSolider, this.props.history);
        } else {
            console.log("0099test    ", this.props.match.params.index, newSolider, this.props.history, this.props.soliderInfo[0].NumberOfDS)
            this.props.editSolider1(this.props.match.params.index, editSoliderInfo, this.props.soliderInfo[0].NumberOfDS, this.props.history)
        }
    }

    onDrop = (pictureFiles, pictureDataURLs) => {
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
            avatar: pictureDataURLs
        });
    }

    handleChange = (event) => {
        this.setState({ sex: event.target.value });
    };

    verifyName = e => {
        if (e.target.value.length > 10) {
          this.setState({soliderNameError:'Too Long'})
        }
        else this.setState({soliderNameError:''})
     }

     verifyEmail = e => {
        const emailReg =
        /^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/;
        if (!emailReg.test(e) ) {
            this.setState({emailError:'Invalid Email'})
        }else {
            this.setState({emailError:''})
        }
      
     }
   
    checkValidity = () => {
        console.log(this.state.soliderNameError,this.state.sexError,this.state.rankError, this.state.startDateError,this.state.phoneError,
            this.state.emailError,this.state.superiorNameError)
        if(this.state.soliderNameError===''&& this.state.sexError==='' && this.state.rankError === ''
           && this.state.startDateError === '' && this.state.phoneError==='' && this.state.emailError ==='' 
           && this.state.superiorNameError === ''
           && this.state.soliderName !=='' && this.state.sex !=='' && this.state.rank !==''
           && this.state.phone !=='' && this.state.email !=='' && this.state.superiorName!=='') return false;
        else return true;
      }

    render() {
        return (
            <div>
                <>
                    <a href="/"><img alt="img" src={armyImg} width="90px" height="90px"></img></a>
                    { this.props.match.params.index !== "add"? (<span style={{ position: "absolute", marginLeft: "20px", marginTop: "50px", fontWeight: "bold" }}>Edit Solider</span>) : 
                    (<span style={{ position: "absolute", marginLeft: "20px", marginTop: "50px", fontWeight: "bold" }}>New Solider</span>) 
                    }
                    
                </>
                <form className="create_new_user_form" onSubmit={this.handleAddUser}>
                    <div className="btn_div">
                        <button onClick={this.handleBack}>Cancel</button>
                        <button
                            type="submit"
                            disabled = {this.checkValidity()}
                            >Save</button>
                    </div>
                    <div className="form_container">
                        <div style={{ width: '50%' }}>
                            <p>Avatar</p>
                            <ImageUploader
                                withIcon={true}
                                withPreview={true}
                                label=""
                                buttonText="Choose images"
                                onChange={this.onDrop}
                                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                maxFileSize={5242880}
                                fileSizeError="file size is too big"
                            />
                        </div>
                        <div style={{ width: '50%', marginLeft: "30px", padding: "30px" }}>
                            <div><label>Name: </label>
                                {
                                    this.props.match.params.index !== "add" ? (this.props.soliderInfo && this.props.soliderInfo.map(item => {
                                        return (<input
                                            type="text"
                                            placeholder={item.Name}
                                            value={this.state.soliderName}
                                            onChange={(e) => {this.setState({ soliderName: e.target.value })
                                                              this.verifyName(e)
                                            }}
                                        ></input>)
                                    })) : (

                                        <input
                                            type="text"
                                            value={this.state.soliderName}
                                            onChange={(e) => {this.setState({ soliderName: e.target.value })
                                                              this.verifyName(e)
                                            }}
                                            
                                        ></input>
                                        
                                    )
                                }
                                <small style={{ color: "red" }}>{this.state.soliderNameError}</small>
                            </div>
                            <div><label>Rank: </label>
                                {
                                    this.props.match.params.index !== "add" ? (this.props.soliderInfo && this.props.soliderInfo.map(item => {
                                        return (<input
                                            type="text"
                                            placeholder={item.Rank}
                                            value={this.state.rank}
                                            onChange={(e) => this.setState({ rank: e.target.value })}
                                        ></input>)
                                    })) : (

                                        <input
                                            type="text"
                                            value={this.state.rank}
                                            onChange={(e) => this.setState({ rank: e.target.value })}
                                        ></input>
                                    )
                                }
                            </div>
                            <div><label>Sex: </label>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={this.state.sex}
                                    onChange={this.handleChange}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </div>
                            <div><label>Start Date: </label>
                                {
                                    this.props.match.params.index !== "add" ? (this.props.soliderInfo && this.props.soliderInfo.map(item => {
                                        return (<input
                                            type="text"
                                            placeholder={item.StartDate}
                                            value={this.state.startDate}
                                            onChange={(e) => this.setState({ startDate: e.target.value })}
                                        ></input>)
                                    })) : (

                                        <input
                                            type="text"
                                            value={this.state.startDate}
                                            onChange={(e) => this.setState({ startDate: e.target.value })}
                                        ></input>
                                    )
                                }
                            </div>
                            <div><label>Office Phone: </label>
                                {
                                    this.props.match.params.index !== "add" ? (this.props.soliderInfo && this.props.soliderInfo.map(item => {
                                        return (<input
                                            type="text"
                                            placeholder={item.Phone}
                                            value={this.state.phone}
                                            onChange={(e) => this.setState({ phone: e.target.value })}
                                        ></input>)
                                    })) : (

                                        <input
                                            type="text"
                                            value={this.state.phone}
                                            onChange={(e) => this.setState({ phone: e.target.value })}
                                        ></input>
                                    )
                                }
                            </div>
                            <div><label>Email: </label>
                                {
                                    this.props.match.params.index !== "add" ? (this.props.soliderInfo && this.props.soliderInfo.map(item => {
                                        return (<input
                                            type="text"
                                            placeholder={item.Email}
                                            value={this.state.email}
                                            onChange={(e) => {this.setState({ email: e.target.value })
                                                              this.verifyEmail(e.target.value)
                                            }}
                                        ></input>)
                                    })) : (

                                        <input
                                            type="text"
                                            value={this.state.email}
                                            onChange={(e) => {this.setState({ email: e.target.value })
                                                              this.verifyEmail(e.target.value)
                                            }}
                                        ></input>
                                    )
                                }
                                <small style={{ color: "red" }}>{this.state.emailError}</small>
                            </div>
                            <div><label>Superior: </label>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.superior}
                                    label=" "
                                    onChange={(e) => this.setState({ superiorName: e.target.value.Name, superiorId: e.target.value._id })}
                                ><MenuItem value="None" default>None</MenuItem>
                                    {
                                        this.props.superiorSolidersList.map(item => {
                                            return (
                                                <MenuItem key={item._id} value={item}>{item.Name}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        superiorSolidersList: state.reducer_getSoliders.soliders,
        soliderInfo: state.reducer_getSoliderInfo.soliderInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSolidersList1: () => dispatch(action_getSolidersList()),
        getSoliderInfo1: (id) => dispatch(action_getSoliderInfo(id)),
        AddNewSolider1: (newSolider, history) => dispatch(action_addSolider(newSolider, history)),
        editSolider1: (index, newSolider, NumberOfDS, history) => dispatch(action_editSolider(index, newSolider, NumberOfDS, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewSolider);
