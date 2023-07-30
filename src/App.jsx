import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

const App = () => {
  const userEmail = "saifashrafhelmy@gmail.com";
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      let response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      response = await response.json();
      setTasks(response);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(tasks);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  console.log(sortedTasks);

  useEffect(() => getData, []);
  return (
    <div className="app">
      <ListHeader listName={" 🤗 The Happy List!"} />
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default App;
