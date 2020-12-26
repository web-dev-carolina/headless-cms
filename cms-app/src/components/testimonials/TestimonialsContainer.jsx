import React from 'react';
import Testimonials from './Testimonials';

const TestimonialsContainer = (props) => {
    // Here we recieve all the testimonial data from props

    return (
        <>
        <div className="row">
            {   // Since testimonials is a JSON array, we can use the map function to assign each object to a Testimonial component
                props.testimonies.map(testimony => <Testimonials testimony={testimony}/>) 
                // make sure you pass in the JSON object (in this case testimonial) as a prop to the next component
            }
        </div>
        </>
    )
}

export default TestimonialsContainer;