// Import modules and components
import "./App.css";
import Navigation from "./components/Navigation";

function App() {
    // Render the component
    return (
        <div className="App">
            <div class="pageBody">
                <Navigation></Navigation>
            </div>
            <footer>
                <hr></hr>
                <p>Designed & Developed by Dylan Neilson</p>
            </footer>
        </div>
    );
}

export default App;
