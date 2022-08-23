import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { downloadExcel } from 'react-export-table-to-excel';
import { useDownloadExcel } from 'react-export-table-to-excel';



function StopWatch() {

    


    

   const tasks ={taskname: '', taskStared: '', taskFinished: '', taskPaused: [], taskResumed: []}
   var tasksList = []

   

    let [pausedTime, setPausedTime] = useState([])
    let [resumedTime, setResumedTime] = useState([])
    let [s, setS] = useState('')
    //const [item, setItem] = useState(tasks)

    const [task, setTask] = useState('')
    const [isTaskStarted, setIsTaskStarted] = useState(false)

    const [second2, setSecond2] = useState(0)
    const [minute2, setMinutes2] = useState(0)
    const [hour2, setHours2] = useState(0)

    const [second, setSeconds] = useState(0)
    const [minute, setMinutes] = useState(0)
    const [hour, setHours] = useState(0)
    const [inputVisibility, setInputVisibility] = useState(true)
    const [startTime, setStartTime] = useState('')
    const [startTime2, setStartTime2] = useState('')
    const [finishedTime, setFinishedTime] = useState('')
    const [nDuration, setNDuration] = useState('')
    const [dDuration, setDDuration] = useState('')

    const [isActive, setIsActive] = useState(false)

    


    if (second === 60) {
        setSeconds(0)
        setMinutes(minute => minute + 1)
    }

    if (minute === 60) {
        setMinutes(0)
        setHours(hour => hour + 1)
    }



    if (second2 === 60) {
        setSecond2(0)
        setMinutes2(minute2 => minute2 + 1)
    }

    if (minute2 === 60) {
        setMinutes2(0)
        setHours2(hour2 => hour2 + 1)
    }


    const getTime = () =>{
        var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var secs = date.getSeconds();
    var milisecnds = date.getMilliseconds();
    var currentTime = hours + ':' + minutes + ':' + secs + '.' + milisecnds;
    return currentTime
    }
    const getTime2 = () =>{
        var date1 = new Date();
    var hours1 = date1.getHours();
    var minutes1 = date1.getMinutes();
    var secs1 = date1.getSeconds();
    var currentTime1 = hours1 + ':' + minutes1 + ':' + secs1 ;
    return currentTime1
    }
   /*  var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var secs = date.getSeconds();
    var milisecnds = date.getMilliseconds();
    var currentTime = hours + ':' + minutes + ':' + secs + '.' + milisecnds; */
    const betterTime2 = () => {
        var splitStartTime = startTime2.split(':')
        var currentTimeSplit = getTime2().split(':')
        var h = currentTimeSplit[0] - splitStartTime[0]
        var m = currentTimeSplit[1] - splitStartTime[1]
        var ss = currentTimeSplit[2] 
       
      
            return h + ':' + m + ':'+ ss
       
        
    }
    const betterTime3 = () => {
        var splitStartTime = startTime2.split(':')
        var currentTimeSplit = getTime2().split(':')

        var totalCurrentS = currentTimeSplit[2]
        var totalCurrentM = currentTimeSplit[1] * 60
        var totalCurrentH = currentTimeSplit[0] * 60 * 60
        var totalCurrentT = totalCurrentM + totalCurrentH

        var totalStartS = splitStartTime[2]
        var totalStartM = splitStartTime[1] * 60
        var totalStartH = splitStartTime[0] * 60 * 60
        var totalStartT = totalStartM + totalStartH

        
        var shows = (currentTimeSplit[0] * 60 * 60 ) + (currentTimeSplit[1] * 60)
        var start = (splitStartTime[0] * 60 * 60) +  (splitStartTime[1] * 60)
        var hh = Math.floor(((shows - start) / 60) / 60)
        return  hh + ' : ' + (shows - start) / 60 + ' : ' + totalCurrentS
    }

    //console.log(betterTime3());
    const pause = () => {

var timeIs = getTime()
        setIsActive(!isActive)
        if (!isActive) {
            
            setResumedTime(oldInputs => [...oldInputs, timeIs])
            
            
        }
        if (isActive) {
            setS(betterTime2())
            setPausedTime(oldInputs => [...oldInputs, timeIs])
            
            
        }

    }

    useEffect(() => {
        var interval = null;

        if (isActive) {

            interval = setInterval(() => {
                setSeconds(second => second + 1);
            }, 1000)
        }
        else if (!isActive && second !== 0) {
            clearInterval(interval)

        }



        return () => clearInterval(interval)

    }, [isActive, second])

    useEffect(()=>{
        var interval2 = null;

        interval2 = setInterval(()=>{
            setSecond2(second2 => second2 + 1);
        }, 1000)

        return () => clearInterval(interval2)
    },[second2])



    const onChange = (e) => {
        setTask(e.target.value)
        tasks.taskname = e.target.value

    }
    


    
    const StartTask = () => {

        setIsActive(true)
        setInputVisibility(false)
        setIsTaskStarted(true)
        setStartTime2(getTime2())
        setStartTime(getTime())
        
        tasks.taskStared = getTime()
        
       

    }

    const reset = () => {

        setSeconds(0)
        setMinutes(0)
        setHours(0)

    }

    const StopTask = () => {

        tasks.taskFinished = getTime()

        const normalDuration = hour2 + ':' + minute2 + ':' + second2
        const decimalDuration = hour2 + '.' + minute2 / 60
        console.log(hour + ':' + minute + ':' + second)
        setNDuration(normalDuration)
        setDDuration(decimalDuration)

        setIsActive(false)
        setInputVisibility(true)
        setIsTaskStarted(false)


        setFinishedTime(getTime())
        setTimeout(reset(), 1)
        const newTask ={
            taskName: task,
            taskStared: startTime,
            taskFinished: finishedTime,
            taskPaused: pausedTime,
            taskResumed: resumedTime
        }
        tasksList.push(newTask)
        

       

       
       
        console.log(tasksList)
    }
    const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table555',
        sheet: 'Users'
    })


const betterTime = () => {
    var splitStartTime = startTime2.split(':')
    var currentTimeSplit = getTime2().split(':')
    var h = currentTimeSplit[0] - splitStartTime[0]
    var m = currentTimeSplit[1] - splitStartTime[1]
    var ss = currentTimeSplit[2] 
    
    
    
    if (isActive){
        return h + ':' + m + ':'+ ss
    }
    
}

    return (
        <div>
             

            <br /><br /> <br /> <br />
         
           <div>
                
           
                   <button onClick={onDownload}> Export excel </button>

                
           </div>
            <div >
                
                {/* <table ref={tableRef} style={{
                display: 'block',
                margin: 'auto',
                width: '95%',
                bordercolor: 'black',
                borderRadius: '10px',
                borderwidth: '2px',
                borderStyle: 'solid'
            }}>
                    
                        <tr><td  style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            bordercolor: 'black',
                                            borderwidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>Task name:</td>
                                        <td
                                        style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            bordercolor: 'black',
                                            borderwidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>Paused</td>
                                        <td
                                        style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            bordercolor: 'black',
                                            borderwidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>Resumed</td>
                                        <td
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    bordercolor: 'black',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>Started</td>
                                <td
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    bordercolor: 'black',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>Finished</td>
                                <td
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    bordercolor: 'black',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>Duration normal</td>
                                <td
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    bordercolor: 'black',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>Duration decimal</td>
                    
                                        </tr>

                        <tr>
                        <td style={{
                        display: task === '' ? 'none' : 'block',
                        margin: 'auto',
                        textAlign: 'center',
                        fontSize: '15px',
                        color: 'black',
                        width: '50%',
                        bordercolor: 'black',
                        borderwidth: '2px',
                        borderStyle: 'solid',
                        padding: '5px'
                    }}>{task}</td><td>
                    {pausedTime.map((items, i) =>

<tr><td style={{ bordercolor: 'white', borderwidth: '1px', borderStyle: 'solid', width: '90px' }} key={i}>{items}</td></tr>
)}</td><td>
{resumedTime.map((items, i) =>

    <tr><td style={{ bordercolor: 'white', borderwidth: '1px', borderStyle: 'solid', width: '90px' }} key={i}>{items}</td></tr>
)}</td>
<td
                                style={{
                                    backgroundColor: 'yellow',
                                    color: 'black',
                                    bordercolor: 'green',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>{startTime === '' ? 'Not started' : startTime}</td>
                                <td
                                style={{
                                    backgroundColor: 'yellow',
                                    color: 'black',
                                    bordercolor: 'green',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>{finishedTime === '' ? 'Not finished' : finishedTime}</td>
                                <td
                                style={{
                                    backgroundColor: 'yellow',
                                    color: 'black',
                                    bordercolor: 'green',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>{nDuration}</td>
                                <td
                                style={{
                                    backgroundColor: 'yellow',
                                    color: 'black',
                                    bordercolor: 'green',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>{dDuration}</td>
                            
                        </tr>
                    
                </table>
                
            </div>

            <div style={{ display: finishedTime !== '' ? 'none' : 'block' }}>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <input
                                    style={{ display: inputVisibility ? 'block' : 'none' }}
                                    type='text'
                                    placeholder='Enter task name'
                                    name='task' value={task}
                                    onChange={onChange} /> </th>
                            <th>{hour >= 10 ? hour : '0' + hour}:</th>
                            <th>{minute >= 10 ? minute : '0' + minute}:</th>
                            <th>{second >= 10 ? second : '0' + second}</th>
                            <th><button style={{ display: second !== 0 || minute !== 0 || hour !== 0 ? 'none' : 'block' }} onClick={StartTask}>Start Task</button></th>
                            <th><button
                                style={{
                                    display:
                                        second === 0 && minute === 0 && hour === 0? 'none' : 'block',
                                    backgroundColor: 'green',
                                    borderColor: 'black',
                                    borderWidth: '2px',
                                    color: 'white',
                                    padding: '5px',
                                    width: '100px'
                                }}
                                onClick={pause}>{isActive ? 'Pause' : 'Resume'}</button></th>
                            <th><button
                                style={{
                                    display: isTaskStarted ? 'block' : 'none',
                                    backgroundColor: 'red',
                                    borderColor: 'black',
                                    borderWidth: '2px',
                                    color: 'white',
                                    padding: '5px',
                                    width: '100px'
                                }}
                                onClick={StopTask}>Finish!</button></th>
                        </tr>
                    </tbody>
                </table> */}
                {/* second example */}

                <table ref={tableRef} style={{
                display: 'block',
                margin: 'auto',
                width: '95%',
                bordercolor: 'black',
                borderRadius: '10px',
                borderwidth: '2px',
                borderStyle: 'solid'
            }}>
                    <tbody>
                        <tr>
                            <td style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            bordercolor: 'black',
                                            borderwidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>Task name</td>
                            <td style={{
                                            backgroundColor: 'cyan',
                                            color: 'black',
                                            borderColor: 'black',
                                            borderWidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>{task}</td>
                        </tr>
                        <tr>
                            <td style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            bordercolor: 'black',
                                            borderwidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>Paused</td>
                                        
                    {pausedTime.map((items, i) =>

<td style={{ backgroundColor: 'cyan', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '90px' }} key={i}>{items}</td>
)}
                        </tr>
                        <tr>
                            <td style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            bordercolor: 'black',
                                            borderwidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>Resumed</td>
                                        
{resumedTime.map((items, i) =>

    <td style={{ backgroundColor: 'cyan', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '90px' }} key={i}>{items}</td>
)}
                        </tr>
                        <tr>
                            <td style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            bordercolor: 'black',
                                            borderwidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>Started</td>
                                        <td
                                style={{
                                    backgroundColor: 'yellow',
                                    color: 'black',
                                    borderColor: 'green',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>{startTime === '' ? 'Not started' : startTime}</td>
                        </tr>
                        <tr>
                            <td style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            bordercolor: 'black',
                                            borderwidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>Finished</td>
                                        <td
                                style={{
                                    backgroundColor: 'yellow',
                                    color: 'black',
                                    borderColor: 'green',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>{finishedTime === '' ? 'Not finished' : finishedTime}</td>
                        </tr>
                        <tr>
                            <td style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            bordercolor: 'black',
                                            borderwidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>Duration normal</td>
                                        <td
                                style={{
                                    backgroundColor: 'yellow',
                                    color: 'black',
                                    borderColor: 'green',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>{nDuration}</td>
                        </tr>
                        <tr>
                            <td style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            bordercolor: 'black',
                                            borderwidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>Duration decimal</td>
                                        <td
                                style={{
                                    backgroundColor: 'yellow',
                                    color: 'black',
                                    borderColor: 'green',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>{dDuration}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <input
                                    style={{ display: inputVisibility ? 'block' : 'none' }}
                                    type='text'
                                    placeholder='Enter task name'
                                    name='task' value={task}
                                    onChange={onChange} /> </th>
                                    <td>{betterTime()}</td>
                            {/* <th>{hour >= 10 ? hour : '0' + hour}:</th>
                            <th>{minute >= 10 ? minute : '0' + minute}:</th> */}
                           
                            <th><button style={{ display: second !== 0 || minute !== 0 || hour !== 0 ? 'none' : 'block' }} onClick={StartTask}>Start Task</button></th>
                            <th><button
                                style={{
                                    display:
                                        second === 0 && minute === 0 && hour === 0? 'none' : 'block',
                                    backgroundColor: 'green',
                                    borderColor: 'black',
                                    borderWidth: '2px',
                                    color: 'white',
                                    padding: '5px',
                                    width: '100px'
                                }}
                                onClick={pause}>{isActive ? 'Pause' : 'Resume'}</button></th>
                            <th><button
                                style={{
                                    display: isTaskStarted ? 'block' : 'none',
                                    backgroundColor: 'red',
                                    borderColor: 'black',
                                    borderWidth: '2px',
                                    color: 'white',
                                    padding: '5px',
                                    width: '100px'
                                }}
                                onClick={StopTask}>Finish!</button></th>
                        </tr>
                    </tbody>
                </table>
                <div>{s}</div>
            </div>
        </div>
    );

}

export default StopWatch
