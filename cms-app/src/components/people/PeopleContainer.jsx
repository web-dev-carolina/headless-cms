import React from 'react';
import People from './People';

const PeopleContainer = (props) => {
    // Here we recieve all the testimonial data from props
    return (
        <>
        <div className="row" key="testimonials">
            {   // Since testimonials is a JSON array, we can use the map function to assign each object to a Testimonial component
                props.peoples.map(people => <People people={people}/>) 
                // make sure you pass in the JSON object (in this case testimonial) as a prop to the next component
            }
        </div>
        </>
    )
}

export default PeopleContainer;