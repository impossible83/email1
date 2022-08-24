import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

function StopWatch() {
    // console.log(4000 % 3600);
    // console.log(Math.floor(4000 / 3600));
    // console.log(400 % 60);
    // console.log(Math.floor(400 / 60));
    console.log(60 + (7 - 53));
    

    let [pausedTime, setPausedTime] = useState([])
    let [resumedTime, setResumedTime] = useState([])
    let [notes, setNotes] = useState('')
    let [note, setNote] = useState('')

    const [task, setTask] = useState('')
    const [isTaskStarted, setIsTaskStarted] = useState(false)

   

    let [second, setSeconds] = useState(0)
    let [minute, setMinutes] = useState(0)
    let [hour, setHours] = useState(0)

    const [inputVisibility, setInputVisibility] = useState(true)
    const [startTime, setStartTime] = useState('')
    const [finishedTime, setFinishedTime] = useState('')
    const [nDuration, setNDuration] = useState('')
    const [dDuration, setDDuration] = useState('')

    const [isActive, setIsActive] = useState(false)

    console.log(nDuration.split(":"));


    if (second === 60) {
        setSeconds(0)
        setMinutes(minute => minute + 1)
    }

    if (minute === 60) {
        setMinutes(0)
        setHours(hour => hour + 1)
    }
    const getTime = () =>{
        var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var secs = date.getSeconds();
    var currentTime = hours + ':' + minutes + ':' + secs;
    return currentTime
    }

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
                setSeconds((second) => second + 1)
            }, 1000)
        }
        else if (!isActive) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isActive])

    const onChange = (e) => {
        setTask(e.target.value)
    }
    const StartTask = () => {
        setIsActive(true)
        setInputVisibility(false)
        setIsTaskStarted(true)
        setStartTime(getTime())
        setNotes(note)
    }

    const reset = () => {
        setSeconds(0)
        setMinutes(0)
        setHours(0)
    }

    const breakTime = () =>{
        const defaultS  = 60
        var x = pausedTime
        var y = resumedTime
        var z = []
        var sumM
        var sumS
        var sumH
        var pausedTimeCount = x.length - 1
        var resumedTimeCount = y.length - 1
        if(pausedTimeCount !== resumedTimeCount){
            y.push(getTime())
        }
        
        for(var i = 0; i <= pausedTimeCount; i++){

            var x2 = x[i].split(":")
            var y2 = y[i].split(":")
            sumH = y2[0] - x2[0]
            if(y2[1] < x2[1]){
                 sumM = defaultS + (y2[1] - x2[1])
                 
                 sumH = sumH - 1
            }else{
                 sumM = y2[1] - x2[1]
            }
            if(y2[2] < x2[2]){
                console.log("y2[2] and x2[2]", y2[2] + ":" + x2[2]);
                sumM = sumM - 1
                sumS = defaultS + (y2[2] - x2[2])
                
                
            }else{
                sumS = y2[2] - x2[2]
            }
            
            var sum = sumH + ":" + sumM + ":" + sumS
            z.push(sum)
            

        }
        
        
        console.log("x2 and y2", z);
        console.log("Sum" , sum);
        console.log("sumHh ", sumH);
        return z
    }

    const taskDuration = (st, ft) =>{
        
        var durationM = 0
        var durationS = 0
        var stArray = st.split(":")
        var ftArray = ft.split(":")
        var durationH = ftArray[0] - stArray[0]
        if(ftArray[1] < stArray[1]){
            durationH = durationH - 1
            durationM = 60 + (ftArray[1] - stArray[1])
        }else{
            durationM = ftArray[1] - stArray[1]
        }

        if(ftArray[2] < stArray[2]){
            durationM = durationM - 1
            durationS = 60 + (ftArray[2] - stArray[2])
        }else{
            durationS = ftArray[2] - stArray[2]
        }
        return durationH + ":" + durationM + ":" + durationS
    }

    const StopTask = () => {
        var fhSum = 0
        var fmSum = 0
        var fsSum = 0
        setIsActive(false)
        setInputVisibility(false)
        setIsTaskStarted(false)
        
        setFinishedTime(getTime())
        setTimeout(reset(), 1)
        var breakTimes = breakTime()
        console.log("break Times ", breakTimes);
        var breakTimesCount = breakTimes.length
        for(var i = 0; i <= breakTimesCount - 1; i++){
            var f = breakTimes[i].split(":")
            fhSum = fhSum + parseInt(f[0])
            fmSum = fmSum + parseInt(f[1])
            fsSum = fsSum + parseInt(f[2])
            console.log("Test 1", f[2]);
            console.log("fhSum ", fsSum);
        }
        
        var l = taskDuration(startTime, getTime()).split(":")
        var lhNum = parseInt(l[0])
        var lmNum = parseInt(l[1])
        var lsNum = parseInt(l[2])
        fhSum = lhNum - fhSum
        fmSum = lmNum - fmSum
        fsSum = lsNum - fsSum
        var actualDuration = fhSum + ":" + fmSum + ":" + fsSum
        console.log("h:" + fhSum + "m:" + fmSum + "s:" + fsSum);
        
        setNDuration(actualDuration)
        setNotes(note)

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

                <table 
                ref={tableRef} style={{
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
                        <tr>
                            <td style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            bordercolor: 'black',
                                            borderwidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>Notes</td>
                                        <td
                                style={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    borderColor: 'green',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                    width: '150px', 
                                    height: '100px'
                                }}><textarea 
                                name="note" 
                                value={note} 
                                rows="7" 
                                cols="40" 
                                onChange={(e)=> setNote(e.target.value)}>
                                    </textarea></td>
                                        
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    style={{ display: inputVisibility ? 'block' : 'none' }}
                                    type='text'
                                    placeholder='Enter task name'
                                    name='task' value={task}
                                    onChange={onChange} /> </td>
                                    
                                    <th>{hour >= 10 ? hour : '0' + hour}:</th>
                            <th>{minute >= 10 ? minute : '0' + minute}:</th>
                            <th>{second >= 10 ? second : '0' + second}</th>
                           
                            <th><button style={{ display: second !== 0 || minute !== 0 || hour !== 0 || finishedTime !== '' ? 'none' : 'block' }} onClick={StartTask}>Start Task</button></th>
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
                                    display: isTaskStarted || isActive? 'block' : 'none',
                                    backgroundColor: 'red',
                                    borderColor: 'black',
                                    borderWidth: '2px',
                                    color: 'white',
                                    padding: '5px',
                                    width: '100px'
                                }}
                                onClick={StopTask}>Finish!</button></th>
                        </tr>
                         <tr>
                        <td></td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default StopWatch
