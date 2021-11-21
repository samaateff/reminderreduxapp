import React , {Component} from "react";
import {connect} from 'react-redux'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from './reminders.png';
import {add_Reminder , clear_Reminder, remove_Reminder} from '../actions'
class App extends Component {
    state = {
        text: '',
        date: new Date()
    }

    render_Reminders = () => {
        const {reminders} = this.props;
        return(
         <ul className ="list-group">
             {
                 reminders.map(reminder=>{
                     return(
                         <li key={reminder.id} className='list-group-item'>
                             <div>{reminder.text}</div>
                             <div>{moment(new Date(reminder.date)).fromNow()}</div>
                             <div className="closeIcon btn btn-danger" onClick={()=> this.props.remove_Reminder(reminder.id)}>x</div>
                         </li>
                     )
                 })
             }
         </ul>
        )
    }
    render() {
        return (
            <div className="App">
               <img src={logo}/>
               <div className="reminderTitle">
                   <h2>what should u do ?</h2>
               </div>
               <input
               className="form-control"
               type="text"
               value={this.state.text}
               placeholder="enter what u think"
               onChange={(e)=> this.setState({text: e.target.value})}
              />
              
               <DatePicker
               className="form-control"
               value={this.state.date}
               placeholderText="Enter date"
               selected={this.state.date}
                  onChange={(date)=>{this.setState({date})}}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeCaption="time"
               />
               <button
                 onClick={()=> {
                this.props.add_Reminder(this.state.text,this.state.date)
                this.setState({text:'', date: ''})
                }}
                 className="btn btn-primary btn-lg btn-block"
               >
                   add reminder
               </button>
               {this.render_Reminders()}
               <button
                onClick={()=> this.props.clear_Reminder()}
                className="btn btn-danger btn-lg btn-block"
               >
                   clear reminders
               </button>
            </div>
        )
    }
}

/*function mapDispatchToProps(dispatch){
    return{
        add_Reminder : () => dispatch(add_Reminder())
    }
}*/

/*function mapStateToProps(state){
    return{
        reminders : state
    }
}*/

export default connect(state => {
    return{
        reminders: state
    }
},{
    add_Reminder,
    remove_Reminder,
    clear_Reminder
}) (App);