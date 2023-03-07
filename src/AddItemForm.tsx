import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    maxLengthUserMessage: number

    addNewItem: (title: string) => void
}
export const AddItemForm: FC<AddItemFormType> = ({
    maxLengthUserMessage,
    addNewItem
                                                 }) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>)=>{
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            addNewItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>)=> e.key === "Enter" && addItem()

    const userErrorMessage = error && <div style={{color: "hotpink"}}>Title is required!</div>

    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage

    const isAddBtnDisabled = !title.length || isUserMessageToLong || error;

    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: "hotpink"}}>Task title is to long!</div>

    const inputErrorClasses = error || isUserMessageToLong ? "input-error" : ""

    return (
        <div>
            <input
                value={title}
                placeholder="Please, enter title"
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownAddTask}
                className={inputErrorClasses}
            />
            <button disabled={isAddBtnDisabled} onClick={addItem}>+</button>
            {userMaxLengthMessage}
            {userErrorMessage}
        </div>
    );
};

