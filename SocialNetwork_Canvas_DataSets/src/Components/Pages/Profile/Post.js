import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./Feed.css"


const post = props => {
    return (
        <Card className="posts">
            <Card.Header className="list-group-item-info">
                <Card.Title className="text-primary ">{props.title}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>{props.text}</Card.Text>
            </Card.Body>
            <ListGroup>
                <ListGroup.Item >By {props.author}</ListGroup.Item>
                <ListGroup.Item>Date : {props.date}</ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default post;
