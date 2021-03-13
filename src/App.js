import './App.css';
import TaskCard from './components/taskCard/taskCard'

function App() {
	return (
		<div className="wholePage">
			<TaskCard></TaskCard>
			<TaskCard></TaskCard>
			<TaskCard></TaskCard>
		</div>
	);
}

export default App;
