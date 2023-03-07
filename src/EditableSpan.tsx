import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanType = {
    title: string
    changeTitleHandler: (title: string) => void
    spanClasses?: string
    inputClasses?: string
}
export const EditableSpan: FC<EditableSpanType> = (
    {
        title,
        spanClasses,
        changeTitleHandler,
    }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [localtitle, setLocaltitle] = useState<string>(title);

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setLocaltitle(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitleHandler(localtitle)
    }

    return (
        editMode
            ? <input
                value={localtitle}
                onChange={changeLocalTitle}
                autoFocus={true}
                onBlur={offEditMode}
            />
            : <span
                className={spanClasses}
                onDoubleClick={onEditMode}
            >{title}</span>
    );
};

