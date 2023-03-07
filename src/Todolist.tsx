import React, {FC} from 'react';
import TasksList from './TasksList';
import {FilterValuesType, TodoListType} from './App';
import {AddItemForm} from './AddItemForm';
import { v1 } from 'uuid';
import {EditableSpan} from './EditableSpan';

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]

    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void

    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todolistID: string) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {

    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    // console.log(addTaskInput)
    // const addTask = () => {
    //     if(addTaskInput.current){
    //         props.addTask(addTaskInput.current.value)
    //         addTaskInput.current.value = ""
    //     }
    //
    // }

    const addTask = (title:string) => {
            props.addTask(title, props.todoListId)
    }

    const handlerCreator = (filter: FilterValuesType) => () =>  props.changeTodoListFilter(filter, props.todoListId);   // новый синтаксис вызова функции для создания функций с
    const removeTodoList = () => {
        props.removeTodoList(props.todoListId);
    };
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId);

    return (
        <div className={"todolist"}>
            <h3>
                <EditableSpan title={props.title} changeTitleHandler={changeTodoListTitle}/>
            <button onClick={removeTodoList}>X</button>
            </h3>
            <div>
           <AddItemForm maxLengthUserMessage={15} addNewItem={addTask}/>
            </div>
            <TasksList
                todoListId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
            />
            <div className="filter-btn-container">
                <button
                    className={props.filter ==="all" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("all")}
                >All</button>
                <button
                    className={props.filter ==="active" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("active")}
                >Active</button>
                <button
                    className={props.filter ==="completed" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("completed")}
                >Completed</button>
            </div>
        </div>
    );
};

export default TodoList;