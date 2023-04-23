import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import NavBarHead from "../../Navbar/NavBarHead";
import Sidebar from "../../Navbar/Sidebar";
import {Button, Col, Dropdown, DropdownButton, Form, ListGroup, Row, Tab, Tabs} from "react-bootstrap";
import {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import "./Diagram.css"
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar, Cell,
} from "recharts";
import {connect, useSelector} from "react-redux";
import axios from "axios";
import {Navigate} from "react-router-dom";

const Diagram = (props) => {
    const {user: currentUser} = useSelector((state) => state.auth);

    var bar = 'bar';
    var pie = 'pie'
    const [mondayHour, setmondayHour] = useState();
    const [tuesdayHour, settuesdayHour] = useState();
    const [wednesdayHour, setwednesdayHour] = useState();
    const [thursdayHour, setthursdayHour] = useState();
    const [fridayHour, setfridayHour] = useState();
    const [saturdayHour, setsaturdayHour] = useState();
    const [sundayHour, setsundayHour] = useState();

    const [mondayHourPie, setmondayHourPie] = useState();
    const [tuesdayHourPie, settuesdayHourPie] = useState();
    const [wednesdayHourPie, setwednesdayHourPie] = useState();
    const [thursdayHourPie, setthursdayHourPie] = useState();
    const [fridayHourPie, setfridayHourPie] = useState();
    const [saturdayHourPie, setsaturdayHourPie] = useState();
    const [sundayHourPie, setsundayHourPie] = useState();
    const [allDiagram, setallDiagram] = useState([]);

    const [update, setupdate] = useState(false);
    const [showPieChart, setshowPieChart] = useState(false);
    const [showBarChart, setshowBarChart] = useState(false);

    React.useEffect(() => {
        if (currentUser) {
            const config = {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                    userEmail: currentUser.email
                }
            }
            axios.get("https://localhost:8080/getAllWeekplans", config)

                .then(res => {
                    setallDiagram(res.data);
                    console.log(res.data)
                })
        }

    }, [update])

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    const pieData = [
        {"name": "Mon", "value": parseInt(mondayHourPie)},
        {"name": "Tue", "value": parseInt(tuesdayHourPie)},
        {"name": "Wed", "value": parseInt(wednesdayHourPie)},
        {"name": "Thu", "value": parseInt(thursdayHourPie)},
        {"name": "Fri", "value": parseInt(fridayHourPie)},
        {"name": "Sat", "value": parseInt(saturdayHourPie)},
        {"name": "Sunday", "value": parseInt(sundayHourPie)},
    ];

    const barData = [
        {name: "Mon", TrainingHours: mondayHour},
        {name: "Tue", TrainingHours: tuesdayHour},
        {name: "Wed", TrainingHours: wednesdayHour},
        {name: "Thu", TrainingHours: thursdayHour},
        {name: "Fri", TrainingHours: fridayHour},
        {name: "Sat", TrainingHours: saturdayHour},
        {name: "Sun", TrainingHours: sundayHour}
    ];

    function addDiagram(valueChart) {
        const config = {
            headers: {
                Authorization: `Bearer ${currentUser.token}`,
                userEmail: currentUser.email
            }
        }
        if(currentUser){
            if (valueChart.localeCompare("bar")) {
                const newDiagramPost = {
                    "chart": 'BAR',
                    "userEmail": currentUser.email,
                    "currentTime": Date.now(),
                    "monday": mondayHour,
                    "tuesday": tuesdayHour,
                    "wednesday": wednesdayHour,
                    "thursday": thursdayHour,
                    "friday": fridayHour,
                    "saturday": saturdayHour,
                    "sunday": sundayHour,
                };

                axios.post("https://localhost:8080/addWeekplan", newDiagramPost, config).then(res => console.log(res.data))
                setupdate(true);
                setshowPieChart(false);
                setshowBarChart(false);
            } else {
                const newDiagramPost = {
                    "chart": 'PIE',
                    "userEmail": currentUser.email,
                    "currentTime": Date.now(),
                    "monday": mondayHourPie,
                    "tuesday": tuesdayHourPie,
                    "wednesday": wednesdayHourPie,
                    "thursday": thursdayHourPie,
                    "friday": fridayHourPie,
                    "saturday": saturdayHourPie,
                    "sunday": sundayHourPie,
                };

                axios.post("https://localhost:8080/addWeekplan", newDiagramPost, config).then(res => console.log(res.data))
                setupdate(true);
                setshowPieChart(false);
                setshowBarChart(false);
            }
        }
    }

    if (!currentUser) {
        return <Navigate to="/"/>;
    }
    return (
        <div>
            <NavBarHead/>
            <Sidebar/>
            <div className="container" style={{paddingTop: '15vh', paddingBottom: '15vh', height: '100vh'}}>
                <div className="row justify-content-md-center">
                    <div className="col-md-10">
                        <h1 className="animatedLine">Diagram</h1>
                        <Row>
                            <div className='col-2'><Button size={"lg"} onClick={e => {
                                setshowBarChart(true)
                                setshowPieChart(false)
                                setupdate(false)
                            }}>Create a BarChart</Button>
                            </div>
                            <div className='col-8'></div>
                            <div className='col-2'><Button size={"lg"} onClick={e => {
                                setshowPieChart(true)
                                setshowBarChart(false)
                                setupdate(false)
                            }}>Create a PieChart</Button>
                            </div>
                        </Row>
                        <Card className="posts" hidden={!showBarChart}>
                            <Card.Header className="text-center">
                                <Card.Title className="text-primary ">Make a summary of the previous week with a
                                    BAR Chart</Card.Title>
                            </Card.Header>

                            <Form className="text-dark" style={{
                                padding: '2vh',
                                display: "inline-block",
                                placeItems: 'center',
                                alignContent: 'center'
                            }}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Monday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             setmondayHour(event.target.value)
                                                         }}>
                                                <option value="0">Hours</option>
                                                <option value="0">0 hour</option>
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Tuesday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             settuesdayHour(event.target.value)
                                                         }}>
                                                <option value="0">Hours</option>
                                                <option value="0">0 hour</option>
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Wednesday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             setwednesdayHour(event.target.value)
                                                         }}>
                                                <option value="0">Hours</option>
                                                <option value="0">0 hour</option>
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Thursday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             setthursdayHour(event.target.value)
                                                         }}>
                                                <option value="0">Hours</option>
                                                <option value="0">0 hour</option>
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Friday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             setfridayHour(event.target.value)
                                                         }}>
                                                <option value="0">Hour</option>
                                                <option value="0">0 hour</option>
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Saturday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             setsaturdayHour(event.target.value)
                                                         }}>
                                                <option value="0">Hours</option>
                                                <option value="0">0 hour</option>
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Sunday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             setsundayHour(event.target.value)
                                                         }}>
                                                <option value="0">Hours</option>
                                                <option value="0">0 hour</option>
                                                >
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>

                                    </Col>
                                </Row>
                                <Row>

                                    <Col style={{
                                        placeItems: 'center',
                                        alignContent: 'center',
                                        display: 'grid'
                                    }}>
                                        <BarChart
                                            width={500}
                                            height={300}
                                            data={barData}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 0,
                                                bottom: 5,
                                            }}
                                            barSize={20}
                                        >
                                            <XAxis
                                                dataKey="name"
                                                scale="point"
                                                padding={{left: 10, right: 10}}
                                            />
                                            <YAxis/>
                                            <Tooltip/>
                                            <Legend/>
                                            <Bar dataKey="TrainingHours" fill="#8884d8" background={{fill: "#eee"}}/>
                                        </BarChart>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg='2'>
                                        <Button
                                            size="lg"
                                            className="btn btn-danger"
                                            onClick={event => {
                                                setshowBarChart(false)
                                            }}>Close
                                        </Button>
                                    </Col>
                                    <Col lg='8'></Col>
                                    <Col lg='2'>
                                        <Button
                                            size="lg"
                                            onClick={event => {
                                                addDiagram(pie)
                                            }}>Post diagram
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        <Card className="posts" hidden={!showPieChart}>
                            <Card.Header className="text-center">
                                <Card.Title className="text-primary ">Make a summary of the previous week with a
                                    PIE Chart</Card.Title>
                            </Card.Header>

                            <Form className="text-dark" style={{
                                padding: '2vh',
                                display: "inline-block",
                                placeItems: 'center',
                                alignContent: 'center'
                            }}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Monday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             setmondayHourPie(event.target.value)
                                                         }}>
                                                <option value="0">Hours</option>
                                                <option value="0">0 hour</option>
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Tuesday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             settuesdayHourPie(event.target.value)
                                                         }}>
                                                <option value="0">Hours</option>
                                                <option value="0">0 hour</option>
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Wednesday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             setwednesdayHourPie(event.target.value)
                                                         }}>
                                                <option value="0">Hours</option>
                                                <option value="0">0 hour</option>
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Thursday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             setthursdayHourPie(event.target.value)
                                                         }}>
                                                <option value="0">Hours</option>
                                                <option value="0">0 hour</option>
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Friday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             setfridayHourPie(event.target.value)
                                                         }}>
                                                <option value="0">Hour</option>
                                                <option value="0">0 hour</option>
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Saturday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             setsaturdayHourPie(event.target.value)
                                                         }}>
                                                <option value="0">Hours</option>
                                                <option value="0">0 hour</option>
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <label className="form-label"
                                                   htmlFor="Default select example">Sunday</label>
                                            <Form.Select aria-label="Default select example" style={{width: '120px'}}
                                                         onChange={event => {
                                                             setsundayHourPie(event.target.value)
                                                         }}>
                                                <option value="0">Hours</option>
                                                <option value="0">0 hour</option>
                                                >
                                                <option value="1">1 hour</option>
                                                <option value="2">2 hour</option>
                                                <option value="3">3 hour</option>
                                                <option value="4">4 hour</option>
                                                <option value="5">5 hour</option>
                                                <option value="6">6 hour</option>
                                                <option value="7">7 hour</option>
                                                <option value="8">8 hour</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col style={{
                                        placeItems: 'center',
                                        alignContent: 'center',
                                        display: 'grid'
                                    }}>
                                        <PieChart width={730} height={300}>
                                            <Pie data={pieData} color="#000000" dataKey="value" nameKey="name" cx="50%"
                                                 cy="50%"
                                                 fill="#8884d8">
                                                {
                                                    pieData.map((entry, index) => <Cell key={`cell-${index}`}
                                                                                        fill={COLORS[index % COLORS.length]}/>)
                                                }
                                            </Pie>
                                            <Tooltip/>
                                            <Legend/>
                                        </PieChart>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg='2'>
                                        <Button
                                            size="lg"
                                            className="btn btn-danger"
                                            onClick={event => {
                                                setshowPieChart(false)
                                            }}>Close
                                        </Button>
                                    </Col>
                                    <Col lg='8'></Col>
                                    <Col lg='2'>
                                        <Button
                                            size="lg"
                                            onClick={event => {
                                                addDiagram(bar)
                                            }}>Post diagram
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        <div>
                            {
                                allDiagram.map(diagram => {
                                        if (diagram.chart.localeCompare("BAR") === 0) {
                                            return <Card className="posts" style={{marginBottom: '5vh'}}>
                                                <Card.Header>
                                                    <Card.Title>{diagram.userEmail}</Card.Title>
                                                </Card.Header>
                                                <Card.Body style={{
                                                    background: '#242424',
                                                    placeItems: 'center',
                                                    alignContent: 'center',
                                                    display: 'grid',
                                                    transparent: '0'
                                                }} className="text-white">

                                                    <BarChart
                                                        width={500}
                                                        height={300}
                                                        data={
                                                            [
                                                                {name: "Mon", TrainingHours: diagram.monday},
                                                                {name: "Tue", TrainingHours: diagram.tuesday},
                                                                {name: "Wed", TrainingHours: diagram.wednesday},
                                                                {name: "Thu", TrainingHours: diagram.thursday},
                                                                {name: "Fri", TrainingHours: diagram.friday},
                                                                {name: "Sat", TrainingHours: diagram.saturday},
                                                                {name: "Sun", TrainingHours: diagram.sunday}
                                                            ]}
                                                        margin={{
                                                            top: 5,
                                                            right: 30,
                                                            left: 0,
                                                            bottom: 5,
                                                        }}
                                                        barSize={20}
                                                    >
                                                        <XAxis
                                                            dataKey="name"
                                                            scale="point"
                                                            padding={{left: 10, right: 10}}
                                                        />
                                                        <YAxis/>
                                                        <Tooltip/>
                                                        <Legend/>
                                                        <Bar dataKey="TrainingHours" fill="#8884d8"
                                                             background={{fill: "#eee"}}/>
                                                    </BarChart>
                                                </Card.Body>
                                                <ListGroup>

                                                    <ListGroup.Item>Date: {date(diagram.currentTime)}</ListGroup.Item>
                                                </ListGroup>
                                            </Card>
                                        } else return <Card className="posts" style={{marginBottom: '5vh'}}>
                                            <Card.Header>
                                                <Card.Title>{diagram.userEmail}</Card.Title>
                                            </Card.Header>
                                            <Card.Body style={{
                                                background: '#242424',
                                                placeItems: 'center',
                                                alignContent: 'center',
                                                display: 'grid',
                                                transparent: '0'
                                            }} className="text-white">

                                                <PieChart width={730} height={300}>
                                                    <Pie data={
                                                        [
                                                            {"name": "Mon", "value": parseInt(diagram.monday)},
                                                            {"name": "Tue", "value": parseInt(diagram.tuesday)},
                                                            {"name": "Wed", "value": parseInt(diagram.wednesday)},
                                                            {"name": "Thu", "value": parseInt(diagram.thursday)},
                                                            {"name": "Fri", "value": parseInt(diagram.friday)},
                                                            {"name": "Sat", "value": parseInt(diagram.saturday)},
                                                            {"name": "Sunday", "value": parseInt(diagram.sunday)}
                                                        ]
                                                    } color="#000000" dataKey="value" nameKey="name" cx="50%"
                                                         cy="50%"
                                                         fill="#8884d8">
                                                        {
                                                            pieData.map((entry, index) => <Cell key={`cell-${index}`}
                                                                                                fill={COLORS[index % COLORS.length]}/>)
                                                        }
                                                    </Pie>
                                                    <Tooltip/>
                                                    <Legend/>
                                                </PieChart>
                                            </Card.Body>
                                            <ListGroup>

                                                <ListGroup.Item>Date: {date(diagram.currentTime)}</ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    }
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


function date(time) {
    var d = new Date(Number(time));
    return d.toLocaleString();
}

export default Diagram;