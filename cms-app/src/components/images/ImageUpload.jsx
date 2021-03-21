import React, { Component, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";


const ImageUpload = () => {
    const [show, setShow] = useState(false);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("picture", image, image.name);
            formData.append("desc", description);

            let res = await axios.post(process.env.REACT_APP_API_URL + "/images/upload", formData);
            setError(false);
            handleClose();
        } catch (error) {
            setError(true);
            console.error(error);
        }
    };

    const fileData = () => {
        if (image)
            return (
                <h5>
                    {" "}
                    <em> {image.name} </em>{" "}
                </h5>
            );

        return null;
    };

    return (
        <>
            <button className="btn btn-primary m-2" onClick={handleShow}>
                {" "}
        Upload
      </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="desc">description</label>
                            <input
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                value={description}
                                className="form-control"
                                required
                                id="desc"
                            />
                        </div>

                        <div className="form-group">
                            <div className="custom-file">
                                <input
                                    type="file"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="custom-file-input"
                                    id="image"
                                />

                                <label className="custom-file-label" htmlFor="image">
                                    {image ? fileData() : "Choose File"}
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
            </button>

                        {error ? (
                            <div className="text-danger">
                                {" "}
                Some error occured uploading the file{" "}
                            </div>
                        ) : null}
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ImageUpload;