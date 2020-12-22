# Overview
A headless content management system for future Web Dev Carolina client projects built on the MERN stack.

# Setup
Steps for running this app in a local environment:\
1. Enter `api` directory and run `npm start`
2. Enter `cms-app` directory and run `npm start`

# Features
All features implemented at the moment.

# API Usage
Full endpoint documentation along with examples will be added here.
### Testimonials
#### POST
Adds a testimonial object.\
Returns a complete list of testimonial objects.\
Data:
```
{ 
    "text": "testimonial text",
    "author": "testimonial author" 
}
```

Example:
```
curl -X POST -H "Content-Type: application/json" --data '{"text":"This is a sample testimonial written in CURL", "author":"Mac Carlton"}' http://localhost:9000/testimonials
````
OR
```
await Axios.post("http://localhost:9000/testimonials", testimonialData);
```

#### GET 
Gets all testimonials.\
Returns a complete list of testimonial objects.\
Example:
```
curl http://localhost:9000/testimonials
````
OR
```
await Axios.get("http://localhost:9000/testimonials");
```

#### PUT
Updates an existing testimonial.\
Returns the updated testimonial if successful.\
Data:
```
{ 
    "text": "testimonial text",
    "author": "testimonial author" 
}
```
Example:
```
curl -X PUT -H "Content-Type: application/json" -d '{"text":"new testimonial body", "author":"new testimonial author"}' http://localhost:9000/testimonials/{id}
```
OR
```
await axios.put("http://localhost:9000/testimonials", testimonialData);
```
#### DELETE
Deletes a testimonial by document id.\
Returns an updated list of testimonial objects if successful.\

Example:
```
curl -X DELETE http://localhost:9000/testimonials/5fe11afb6cb65ca7dd63cd2d
```
OR
```
await axios.delete("http://localhost:9000/testimonials", testimonialID);
```
# Compatible Templates
Links to custom designed templates for API integration will be added here over time.

# Contributors 
Rushil Shah\
Mac Carlton
