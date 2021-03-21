# Headless CMS API
Once it is hosted, the API will likely have its own URL. All of the example cURL requests here use a localhost server, but in implementation on a template, keep a single global variable that represents the base API URL so it is easily changeable between development and deployment.

All of the routes except ```/info``` contain only CRUD routes to keep things simple and standardized. All request URLs that contain ```/:id``` require an actual MongoDB ObjectID as a string in the request. These operations are unlikely to be necessary for most projects.

All documents in MongoDB are stored with an ```_id``` key that we aren't showing in the schema below. This can be used as a unique key in lists on implementations. Doing so or otherwise storing the ```_id``` in the frontend may make future updates to the CMS easier.

## High-Level Endpoints (/info)
These endpoints describe the data available for a given project.

### POST /info/projectsConnect
Initializes connections to all the relevant content databases. Either throws an error or returns with a code of 200 (OK).

Example:
```
  $ curl -X POST -H "Content-Type: application/json" -d '{"project":"projectName"}' http://localhost:9000/info/projectsConnect
```

### GET /info
Returns a list of all the collections. For a project that only contains  Text and Announcements, it will return ```[text, announcements]```.

Example:
```
  $ curl http://localhost:9000/info
```

## People (/people)

### Model Scheme
This is a work in progress. We plan to add images to the scheme.
```
{
    fname: String,
    lname: String,
    pos: String,
    bio: String
}
```

### POST /people
Creates a new entry in the collection. Returns an updated list of all documents in the collection. Creating a new document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X POST -H "Content-Type: application/json" -d '{"fname":"John", "lname":"Doe", "pos":"King", "bio":"Absolute champion"}' http://localhost:9000/people
```

### GET /people
Returns a list of all documents in the collection.

Example:
```
  $ curl http://localhost:9000/people
```

### PUT /people/:id
Updates a single document, searched by the ID in the request URL. Returns an updated list of all documents in the collection. Updating a document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X PUT -H "Content-Type: application/json" -d '{"fname":"new fname", "lname":"new lname", "pos":"new pos", "bio":"new bio"}' http://localhost:9000/people/:id
```

### DELETE /people/:id
Deletes a single document, searched for by the ID. Returns an updated list of all documents in the collection. Deleting a document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X DELETE http://localhost:9000/people/:id
```

## Testimonials (/testimonials)

### Model Scheme
This is a work in progress. We may add a date key.
```
{
    text: String,
    author: String
}
```

### POST /testimonials
Creates a new entry in the collection. Returns an updated list of all documents in the collection. Creating a new document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X POST -H "Content-Type: application/json" -d '{"text":"testimonial body", "author":"testimonial author"}' http://localhost:9000/testimonials
```

### GET /testimonials
Returns a list of all documents in the collection.

Example:
```
  $ curl http://localhost:9000/testimonials
```

### PUT /testimonials/:id
Updates a single document, searched by the ID in the request URL. Returns an updated list of all documents in the collection. Updating a document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X PUT -H "Content-Type: application/json" -d '{"text":"testimonial body", "author":"testimonial author"}' http://localhost:9000/testimonials/:id
```

### DELETE /testimonials/:id
Deletes a single document, searched for by the ID. Returns an updated list of all documents in the collection. Deleting a document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X DELETE http://localhost:9000/testimonials/:id
```

## Text (/textContent)

### Model Scheme
This is a work in progress. We may add a date key.
```
{
    content: HTML (as String),
    section: String,
    desc: String
}
```

### POST /textContent
Creates a new entry in the collection. Returns an updated list of all documents in the collection. Creating a new document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X POST -H "Content-Type: application/json" -d '{"content":"some content", "section":"the relevant section of the page", "desc":"short description of where the text is to easily locate it"}' http://localhost:9000/textContent
```

### GET /textSections
Returns a list of all text sections in the project.

Example:
```
  $ curl http://localhost:9000/textSections
```

### GET /textContent
Returns a list of all documents in the collection.

Example:
```
  $ curl http://localhost:9000/textContent
```

### PUT /textContent/:id
Updates a single document, searched by the ID in the request URL. Returns an updated list of all documents in the collection. Updating a document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X PUT -H "Content-Type: application/json" -d '{}' http://localhost:9000/textContent/:id
```

### DELETE /textContent/:id
Deletes a single document, searched for by the ID. Returns an updated list of all documents in the collection. Deleting a document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X DELETE http://localhost:9000/textContent/:id
```

## Articles (/articles)

### Model Scheme
This is a work in progress. We plan to add images to the scheme.
```
{
    title: String,
    body: HTML (as String),
    date: String,
    author: String
}
```

### POST /articles
Creates a new entry in the collection. Returns an updated list of all documents in the collection. Creating a new document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:9000/articles
```

### GET /articles
Returns a list of all documents in the collection.

Example:
```
  $ curl http://localhost:9000/articles
```

### PUT /articles/:id
Updates a single document, searched by the ID in the request URL. Returns an updated list of all documents in the collection. Updating a document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:9000/articles
```

### DELETE /articles/:id
Deletes a single document, searched for by the ID. Returns an updated list of all documents in the collection. Deleting a document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X DELETE http://localhost:9000/articles/:id
```

## Announcements (/announcements)

### Model Scheme
This is a work in progress. We plan to add images to the scheme.
```
{
    title: String,
    info: String,
    date: String,
    link: String
}
```

### POST /announcements
Creates a new entry in the collection. Returns an updated list of all documents in the collection. Creating a new document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:9000/announcements
```

### GET /announcements
Returns a list of all documents in the collection.

Example:
```
  $ curl http://localhost:9000/announcements
```

### PUT /announcements/:id
Updates a single document, searched by the ID in the request URL. Returns an updated list of all documents in the collection. Updating a document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:9000/announcements
```

### DELETE /announcements/:id
Deletes a single document, searched for by the ID. Returns an updated list of all documents in the collection. Deleting a document will not be a necessary implementation in most project cases.

Example:
```
  $ curl -X DELETE http://localhost:9000/announcements/:id
```

## Users (/users)
This is only for login functionality on the CMS. This may be necessary for subdomain CMS implementations on certain projects, but will not be necessary for most. Reach out to club leadership if you need this information.