import { useState } from 'react';

function TaskItem({ task , handleUpdateTask}) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedText, setUpdatedText] = useState(task.text);

    const handleTextChange = (e) => {
        setUpdatedText(e.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setUpdatedText(task.text); 
    };

    const handleConfirmClick = () => {
        handleUpdateTask(task._id, updatedText);
        setIsEditing(false);
    };

    return (
        <div className="d-flex align-items-center" style={{ width: '85%' }}>
            {!isEditing ? (
                <>
                    <div className="form-control">{task.text}</div>
                    <button
                        className="btn btn-primary m-2 "
                        onClick={handleEditClick}
                        style={{ backgroundColor: '#C40C0C', borderColor: '#C40C0C' }}
                    >
                        Edit
                    </button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        value={updatedText}
                        onChange={handleTextChange}
                        className="form-control"
                    />
                    <button
                        className="btn btn-primary m-2"
                        onClick={handleConfirmClick}
                        style={{ backgroundColor: '#CE5A67', borderColor: '#CE5A67' }}
                    >
                        Save
                    </button>
                    <button
                        className="btn m-2"
                        onClick={handleCancelClick}
                        style={{ backgroundColor: '#ffffff', borderColor: '#1F1717' }}
                    >
                        Cancel
                    </button>
                </>
            )}
        </div>
    );
}

export default TaskItem;
