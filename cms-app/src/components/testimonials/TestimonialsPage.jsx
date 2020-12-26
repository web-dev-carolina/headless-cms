import React, { useState, useContext, useEffect} from "react";
import { Form, Container, Button, Row } from "react-bootstrap";
import Axios from "axios";
import {useHistory} from "react-router-dom";
import TestimonialsContainer from './TestimonialsContainer.jsx';
const TestimonialsPage = () => {
    const history = useHistory();
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await Axios.get(process.env.REACT_APP_API_URL+"/testimonials");
            const data = result.data;
            setTestimonials(data);
            console.log('data from request:');
            console.log(data);
        }
        fetchData();
    }, []);

    return (
        <Container className="home pt-3">
            <h3 className="text-center">Testimonials Collection:</h3>
            <TestimonialsContainer testimonies={testimonials} />
        </Container>

    )
}

export default TestimonialsPage;