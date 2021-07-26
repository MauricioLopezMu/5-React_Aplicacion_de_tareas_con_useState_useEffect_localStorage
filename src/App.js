import React, { useState, useEffect } from 'react';
import { TaskRow } from './components/TaskRow'
import {TaskBanner} from './components/TaskBanner'
import { TaskCreator } from './components/TaskCreator'
import { VisibilityControl } from './components/VisibilityControl'

function App() {

  const [userName, setUserName] = useState('Mauri');
  const [taskItems, setTaskItems] = useState([
    {name: 'Task One', done: false},
    {name: 'Task Two', done: false},
    {name: 'Task Three', done: true},
    {name: 'Task Four', done: false}
  ])

  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    let data = localStorage.getItem('task');
    if(data != null) {
      setTaskItems(JSON.parse(data));
    } else {
      setUserName('Example')
      setTaskItems([
        {name: 'Task One Ex', done: false},
        {name: 'Task Two Ex', done: false},
        {name: 'Task Three Ex', done: true},
        {name: 'Task Four Ex', done: false}
      ])
      setShowCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = taskname => {
    if (!taskItems.find(t => t.name === taskname)){
      setTaskItems([...taskItems, {name: taskname, done: false}])
    }
  }

  const toggleTask = task => 
    setTaskItems(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done} : t)))
  

  const taskTableRows = (doneValue) => 
    taskItems
    .filter(task => task.done === doneValue)
    .map(task => (
      <TaskRow task = {task} key={task.name} toggleTask={toggleTask} />
    ))
  

  return (
    <div>
    <TaskBanner userName={userName} taskItems={taskItems}/>

    <TaskCreator callback={createNewTask}/>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>

      <div className="bg-secondary-text-white text-center p2">
        <VisibilityControl
          description="Completed Task"
          isChecked={showCompleted}
          callback={Checked => setShowCompleted(Checked)}
        />
      </div>

      {
        showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }

    </div>
  );
}

export default App;
