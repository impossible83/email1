import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { downloadExcel } from 'react-export-table-to-excel';
import { useDownloadExcel } from 'react-export-table-to-excel';



function StopWatch() {

    


    

   const tasks ={taskname: '', taskStared: '', taskFinished: '', taskPaused: [], taskResumed: []}
   var tasksList = []

   

    let [pausedTime, setPausedTime] = useState([])
    let [resumedTime, setResumedTime] = useState([])
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
   /*  var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var secs = date.getSeconds();
    var milisecnds = date.getMilliseconds();
    var currentTime = hours + ':' + minutes + ':' + secs + '.' + milisecnds; */
    const pause = () => {

var timeIs = getTime()
        setIsActive(!isActive)
        if (!isActive) {
            
            setResumedTime(oldInputs => [...oldInputs, timeIs])
            
            
        }
        if (isActive) {
           
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
                </table>
            </div>
        </div>
    );

}

export default StopWatch
