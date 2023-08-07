import { useState } from "react";

const Modal = ({ mode, setShowModal, task, getData }) => {
    const editMode = mode === "edit" ? true : false;
    const [data, setData] = useState({
        user_email: editMode ? task.user_email : "saifashrafhelmy@gmail.com",
        title: editMode ? task.title : "",
        progress: editMode ? task.progress : 50,
        date: editMode ? task.date : new Date(),
    });

    const handleChange = (e) => {
        // console.log("Changing!");
        let { name, value } = e.target;

        setData((data) => ({
            ...data,
            [name]: value,
        }));

        // console.log(data);
    };

    const postData = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                // console.log(`Successfully added / edited the task`);
                setShowModal(false);
                getData();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const editData = async(e)=>{
        e.preventDefault();
        // console.log("changing data...")

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.status === 200) {
            // console.log(`Succesfuly added / edited the task`);
            setShowModal(false);
            getData();
        }
    }



    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-title-container">
                    <h3>{mode} a task</h3>
                    <button onClick={() => setShowModal(false)}>X</button>
                </div>

                <form action="">
                    <input
                        type="text"
                        name="title"
                        required
                        maxLength={30}
                        placeholder=" Your task goes here"
                        value={data.title}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="progressRange">
                        Drag to Select your current progress
                    </label>
                    <input
                        type="range"
                        name="progress"
                        required
                        id="progressRange"
                        min={0}
                        max={100}
                        value={data.progress}
                        onChange={handleChange}
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className={mode}
                        onClick={editMode ? editData : postData}
                    />
                </form>
            </div>
        </div>
    );
};

export default Modal;
