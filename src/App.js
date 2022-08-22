import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import Navbar from './components/Navbar.js';

import { useState, useEffect } from 'react';

import StopWatch from './components/StopWatch';


/* <div className='wrapper'>
        <div className='main-body'>
          <input type="file" onChange={(e) => {

            const file = e.target.files[0];

            readExcel(file);
          }}
          />
          <br />
          <table>
            <thead>
              <tr>
                <th scope='col'>Account name</th>
                <th scope='col'>website</th>
                <th scope='col'>Industry</th>

                <th>
                  <button onClick={LookUp}>Look up</button></th>
              </tr>
            </thead>
            <tbody>
              {
                items.map((d) => (

                  <tr key={d.AccountName}>
                    <th>{d.AccountName}</th>
                    <th>{d.Website}</th>
                    <th>{d.Industry}</th>
                  </tr>

                ))
              }

            </tbody>
          </table>
        </div>

      </div> */

function App() {

  /*const LookUp = () => {

    window.open('https://www.google.com/search?q=2ndWave+Software');

  }*/

  //const [items, setItems] = useState([])

  /* const readExcel = (file) => {
 
     const promise = new Promise((resolve, reject) => {
 
       const fileReader = new FileReader();
 
       fileReader.readAsArrayBuffer(file);
 
       fileReader.onload = (e) => {
 
         const bufferArray = e.target.result
 
         const wb = XLSX.read(bufferArray, { type: 'buffer' });
 
         const wsName = wb.SheetNames[0]
 
         const ws = wb.Sheets[wsName]
 
         const data = XLSX.utils.sheet_to_json(ws)
 
         resolve(data)
 
       };
 
       fileReader.onerror = (error) => {
 
         reject(error)
       };
 
     });
 
     promise.then((d) => {
       console.log(d)
       setItems(d)
     })
   } */





  let [timers, setTimers] = useState([])
  let count = timers.length

  const addTimer = () => {
    setTimers(oldData => [...oldData, count + 1])
  }

  return (
    <div>

      <Navbar />
      <br /><br /> <br /> <br />
      <button style={{ width: '120px', bordercolor: 'blue', borderwidth: '1px', borderstyle: 'solid' }} onClick={addTimer}>New timer</button>
      {
        timers.map((item, i) => <div key={i}><StopWatch /></div>)
      }


    </div>
  );
}

export default App;
