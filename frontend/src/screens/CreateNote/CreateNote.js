import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkDown from "react-markdown";

function CreateNote({ history }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [valueUsd, setValueUsd] = useState("");
  const [isAvaliable, setIsAvailable] = useState(true);
  const [img, setImg] = useState("");

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  console.log(note);

  const resetHandler = (handler) => {
    setName("");
    setCountry("");
    setAbbreviation("");
    setValueUsd("");
    setIsAvailable(true);
    setImg("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createNoteAction(name, country, abbreviation, valueUsd, isAvaliable, img)
    );
    resetHandler();
    history.push("/mynotes");
  };

  return (
    <MainScreen title="Create a Note">
      <Card>
        <Card.Header>Create a New Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="name">
              <Form.Label>Currency name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter the currency name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country of origin</Form.Label>
              <Form.Control
                as="textarea"
                value={country}
                placeholder="Enter the Country of origin"
                rows={2}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="abbreviation">
              <Form.Label>Abbreviation</Form.Label>
              <Form.Control
                type="text"
                value={abbreviation}
                placeholder="Enter the abbreviation"
                onChange={(e) => setAbbreviation(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="valueUsd">
              <Form.Label>Valor en dolares</Form.Label>
              <Form.Control
                type="text"
                value={valueUsd}
                placeholder="Enter the valueUsd"
                onChange={(e) => setValueUsd(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="isAvaliable">
              <Form.Label>Esta en uso ?</Form.Label>
              <Form.Check
                type="switch"
                id="isAvaliable"
                value={isAvaliable}
                onChange={(e) => {
                  console.log(e.target.checked);
                  setIsAvailable(e.target.checked);
                }}
              />
            </Form.Group>
            <Form.Group controlId="img">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={img}
                placeholder="Enter the Image URL"
                onChange={(e) => setImg(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Fields
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
