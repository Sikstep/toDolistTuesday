import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';


// CRUD
// R - filter, sort, search

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId_1: string]: Array<TaskType>
}

function App(): JSX.Element {
    //BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to learn', filter: 'active'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'ES6 & TS', isDone: true},
            {id: v1(), title: 'REACT & REDUX', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'MILK', isDone: true},
            {id: v1(), title: 'BREAD', isDone: true},
            {id: v1(), title: 'MEAT', isDone: false},
        ]
    })


    //BLL:
    const removeTask = (taskId: string, todoListId: string) => {
        // const tasksForUpdate = tasks[todoListId];
        // const updatedTasks = tasksForUpdate.filter( t => t.id !== taskId);
        // const copyTasks = {...tasks};
        // copyTasks[todoListId] = updatedTasks;
        // setTasks(copyTasks)

        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})

    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        // const TaskForUpdate = tasks[todoListId];
        // const updatedTasks = [newTask, ...TaskForUpdate]
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)

        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})

    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        // const TaskForUpdate = tasks[todoListId]
        // const updatedTasks = TaskForUpdate.map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)

        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)})
    }

    const changeTaskTitle = (taskID: string, newTitle: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title: newTitle} : t)})
    }

    const changeTodoListTitle = (title: string, todolistID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, title:title} : tl))
    }
    
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, filter: filter} : el))
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1();
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: 'all'
        }
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({...tasks, [newTodoListID]: []})
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoListId));
        // delete tasks[todoListId]; ????????????????????!
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)     // ???????????????????????? ???????????? (?? ???????????? ???????? ???? ???? ?????????? ???? ?????????? ?????????????? ???????? ??????????)
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const todolistsComponents = todoLists.map( el => {
        const filteredTasks: TaskType[] = getFilteredTasks(tasks[el.id], el.filter)
        return (
            <TodoList
                key={el.id}
                todoListId={el.id}
                title={el.title}
                tasks={filteredTasks}
                filter={el.filter}

                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}

                changeTodoListFilter={changeTodoListFilter}
                removeTodoList={removeTodoList}
                changeTodoListTitle={changeTodoListTitle}

            />
        )
    })

    //UI:
    return (
        <div className="App">
            <AddItemForm maxLengthUserMessage={15} addNewItem={addTodoList}/>
            {todolistsComponents}
        </div>
    );
}

export default App;
