import MainScreen from "../../components/MainScreen";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useHistory } from "react-router-dom";

const MyNotes = ({ search }) => {
  // const [notes, setNotes] = useState([]);
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  // const fetchNotes = async () => {
  //   const { data } = await axios.get("api/notes");
  //   setNotes(data);
  // };

  const history = useHistory();

  useEffect(() => {
    // fetchNotes();
    dispatch(listNotes());
  }, [dispatch, successCreate, history, successUpdate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you Sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back you..`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Currency
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {notes?.map((note) => (
        <Accordion key={note._id}>
          <Card style={{ margin: 10 }} key={note._id}>
            <Card.Header style={{ display: "flex" }}>
              <span
                // onClick={() => ModelShow(note)}
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                  {note.name}
                </Accordion.Toggle>
              </span>

              <div>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h4>
                  <Badge variant="success">
                    Pais de origen - {note.country}
                  </Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>Valor en USD dollars: {note.valueUsd}</p>
                  <img
                    src={note.img}
                    height={200}
                    width={200}
                    alt="no disponible"
                  />
                  <h4>
                    Estado{" "}
                    {note.isAvaliable === true ? (
                      <Badge variant="success">En circulacion</Badge>
                    ) : (
                      <Badge variant="warning">Fuera de circulacion</Badge>
                    )}
                  </h4>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
