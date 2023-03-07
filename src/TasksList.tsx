import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "./TodoList";
import {EditableSpan} from './EditableSpan';

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
        ? props.tasks.map((task) => {
            const taskClasses = task.isDone ? "task task-done" : "task"
            const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                const changeTaskTitleHandler = (title: string) => {
                    props.changeTaskTitle(task.id, title, props.todoListId)
                }
            return (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}
                    />
                    <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler}/>
                    <button onClick={removeTaskHandler}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>
    return (
        <ul>
            {tasksItems}
        </ul>
    );
};

export default TasksList;