// import React, { useState, useContext, useEffect } from "react";
import { Form, Container, Button, Modal, Row, Col, Breadcrumb } from "react-bootstrap";
// import Axios from "axios";
import { useHistory, Link } from "react-router-dom";
import ImageUpload from './ImageUpload.jsx';
import ImageCarousel from './ImageCarousel';
const ImagesPage = () => {
    const history = useHistory();


    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{to:"/projectselect"}}>Projects</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{to:"/dashboard"}}>Collections</Breadcrumb.Item>
                <Breadcrumb.Item active>Images</Breadcrumb.Item>
            </Breadcrumb> 
            <ImageUpload></ImageUpload>
            <ImageCarousel></ImageCarousel>
        </>
    )
}

export default ImagesPage;