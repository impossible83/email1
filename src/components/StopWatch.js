import { useState, useEffect } from 'react';
import React from 'react';



function StopWatch() {


    let tasks = {
        taskId: 0,
        taskName: '',
        taskStarted: '',
        taskFinished: '',
        isStarted: false,
        isPaused: false,
        isResumed: false,
        isFinished: false,
        pausedAtList: [],
        resumedAtList: []
    }

    //let taskArray = []


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

    }

    const StartTask = () => {

        setIsActive(true)
        setInputVisibility(false)
        setIsTaskStarted(true)
        setStartTime(getTime())

    }

    const reset = () => {

        setSeconds(0)
        setMinutes(0)
        setHours(0)

    }

    const StopTask = () => {

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

    }

    return (
        <div>


            <br /><br /> <br /> <br />
            <div style={{
                display: 'block',
                margin: 'auto',
                width: '95%',
                bordercolor: 'black',
                borderRadius: '10px',
                borderwidth: '2px',
                borderStyle: 'solid'
            }}>
                <div
                    style={{
                        display: task === '' ? 'none' : 'block',
                        margin: 'auto',
                        textAlign: 'center',
                        fontSize: '29px',
                        color: 'white',
                        width: '50%'
                    }}>{task}</div>
                <table>
                    <tbody>

                        <tr>
                            <th>
                                <tr>
                                    <th
                                        style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            bordercolor: 'black',
                                            borderwidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>Paused</th>
                                </tr>
                                <tr>
                                    <th
                                        style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            bordercolor: 'black',
                                            borderwidth: '2px',
                                            borderStyle: 'solid',
                                            width: '90px'
                                        }}>Resumed</th>
                                </tr>
                            </th>
                            <th>
                                <tr>
                                    {pausedTime.map((items, i) =>

                                        <th style={{ bordercolor: 'white', borderwidth: '1px', borderStyle: 'solid', width: '90px' }} key={i}>{items}</th>
                                    )}
                                </tr>
                                <tr>
                                    {resumedTime.map((items, i) =>

                                        <th style={{ bordercolor: 'white', borderwidth: '1px', borderStyle: 'solid', width: '90px' }} key={i}>{items}</th>
                                    )}
                                </tr>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    bordercolor: 'black',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>Started</th>
                            <th
                                style={{
                                    backgroundColor: 'yellow',
                                    color: 'black',
                                    bordercolor: 'green',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>{startTime === '' ? 'Not started' : startTime}</th>
                            <th
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    bordercolor: 'black',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>Duration normal</th>
                            <th
                                style={{
                                    backgroundColor: 'yellow',
                                    color: 'black',
                                    bordercolor: 'green',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>{nDuration}</th>
                        </tr>
                        <tr>
                            <th
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    bordercolor: 'black',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>Finished</th>
                            <th
                                style={{
                                    backgroundColor: 'yellow',
                                    color: 'black',
                                    bordercolor: 'green',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>{finishedTime === '' ? 'Not finished' : finishedTime}</th>
                            <th
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    bordercolor: 'black',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>Duration decimal</th>
                            <th
                                style={{
                                    backgroundColor: 'yellow',
                                    color: 'black',
                                    bordercolor: 'green',
                                    borderwidth: '2px',
                                    borderStyle: 'solid',
                                    width: '90px'
                                }}>{dDuration}</th>
                        </tr>

                    </tbody>
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
                </table>
            </div>
        </div>
    );

}

export default StopWatch
