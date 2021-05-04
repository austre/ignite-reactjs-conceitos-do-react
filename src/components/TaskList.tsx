import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle.trim()){
      return;
    }else{
      const newTask={
        id:Math.random(),
        title:newTaskTitle,
        isComplete:false
      };

      setTasks([...tasks,newTask]);

      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    /*Este código foi baseado no vídeo de solução do desafio, tendo em vista que o criado por mim colocava
      a Task Completed para o fim da listagem.*/
    const newTasks=tasks.map(task=>task.id==id?{
      ...task,
      isComplete:!task.isComplete
    }:task);

    setTasks(newTasks);

    /*Código original criado e que coloca a Task Completed no final da listagem.*/
    /*const [taskToChange]=tasks.filter(obj => {
      return obj.id === id
    });

    const tasksList=tasks.filter(obj => {
      return obj.id !== id
    });

    const newTask={
      id:taskToChange.id,
      title:taskToChange.title,
      isComplete:taskToChange.isComplete ? false:true,
    };

    setTasks([...tasksList,newTask]);*/
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const newTasksList=tasks.filter(obj => {
      return obj.id !== id
    });

    setTasks(newTasksList);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>My Tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="New Task" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}