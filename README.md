# Overview
A headless content management system for future Web Dev Carolina client projects built on the MERN stack.

# Setup
Steps for running this app in a local environment will be found here.

# Features
All features implemented at the moment.

# API Usage
Full endpoint documentation along with examples will be added here.
### Testimonials
#### POST
Adds a testimonial object.

Returns a list of testimonial objects.

Data:
```
{ 
    "text": "testimonial text",
    "author": "testimonial author" 
}
```
  
Example:
```
curl -X POST -H "Content-Type: application/json" --data '{"text":"This is a sample testimonial written in CURL", "author":"Mac Carlton"}'  http://localhost:9000/testimonials
````
OR
```
await Axios.post("http://localhost:9000/testimonials", testimonialData);
```
    
#### GET 
#### PUT
#### DELETE
# Compatible Templates
Links to custom designed templates for API integration will be added here over time.

# Contributors 
Rushil Shah
Mac Carlton
