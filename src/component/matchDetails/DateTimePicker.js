import React, { useState } from 'react';  
import DatePicker from 'react-datepicker';  
import { format } from 'date-fns';
import classes from './DateTimePicker.module.css'

import "react-datepicker/dist/react-datepicker.css";  
import 'bootstrap/dist/css/bootstrap.min.css';  
import useHttp from '../../hook/use-http';
import { updateMatch } from '../../lib/Api';
    
  const DateTimePicker = (props) => {  

    const [startDate, setStartDate] = useState(new Date())

  const {
    sendRequest,
    error,
  } = useHttp(updateMatch, true);

  if (error) {
    return <p className="centered focused" style={{'textAlign': 'center'}}>{error + ' Please Try After SomeTime'}</p>;
  }

   const handleClick = () => {
    props.onCancel('');
   }    
    
   const handleChange = (date)  => {  
      setStartDate(date)  
    }  
    
   const onFormSubmit = (e) => {  
      e.preventDefault(); 
      const formatedDate = format(startDate, 'yyyy/MM/dd hh:mm:ss');

      console.log(formatedDate)
      const reqObj = {
        token: props.token,
        matchId: props.id,
        req: {time: formatedDate}
      }
      sendRequest(reqObj);
      props.onCancel('');
    }  
     
      return (  
        <form onSubmit={onFormSubmit }>  
          <div className="form-group">  
            <DatePicker  
                selected={ startDate }  
                onChange={ (date) => handleChange(date) }  
                showTimeSelect  
                timeFormat="hh:mm:ss"  
                // timeIntervals={30}  
                timeCaption="time"  
                dateFormat="yyyy/MM/dd hh:mm:ss"  
                minDate={new Date()}  
            />  
            <div className={classes.actions}>
                <button className="btn btn-primary">Save</button>  
                <button type='button' onClick={handleClick}>Cancel</button>
            </div>
            
          </div>  
        </form>  
      );  
    }  
export default DateTimePicker;