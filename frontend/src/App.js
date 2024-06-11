import "./App.css";
import Footer from "./components/Footer/Footer";
import MyNotes from "./screens/MyNotes/MyNotes";
import { BrowserRouter, Route } from "react-router-dom";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Route path="/" exact component={() => <MyNotes />} /> />
        <Route path="/createnote" component={CreateNote} />
        <Route path="/note/:id" component={SingleNote} />
        <Route path="/mynotes" component={() => <MyNotes />} />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
