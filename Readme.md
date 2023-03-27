# Book Management application is simple app contains CRUD APIs to GET, PUT, POST and DELETE the book

## Running the application locally using following commands.

Before running it locally make you have set the content of `.env` file, please `env.sample` file for properties.

- To Run this app use the following command.

  ```
  npm run start
  ```

- To Run this app in the development mode, using nodemon use the following command.
  ```
  npm run serve
  ```

## In the application there CRUD api's please use the below CURLs to access those.

Note: Change localhost to server ip if access from server

- Get All books

```
curl --location --request GET 'http://localhost:5000/book?pageNo=1' | json_pp
```

- Get book by id

```
curl --location --request GET 'http://localhost:5000/book/3'
```

- Create Book

```
curl --location --request POST 'http://localhost:5000/book' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Harry Potter",
    "author":"J.K.Rowling",
    "language":"English"
}'
```

- Update Book

```
curl --location --request PUT 'http://localhost:5000/book/5' \
--header 'Content-Type: application/json' \
--data-raw '{
    "language":"English"
}'
```

- Delete Book

```
curl --location --request DELETE 'http://localhost:5000/book/3'
```

If you want to import to the POSTMAN rest client plase use this [postman.json](postman_file/bookmanagement.postman_collection.json)

# Creating Image pushing it to the docker hub

### To Create image from docker compose file, run following command

```
docker-compose build
```

### To push the image on the docker hub use the following commands

```
docker login --username=<username> --email=<email>
Password:

---------------------------------------------------------------------------------------------------------------

docker push <username>/books_management_service:gke-mysql
```

### To run the newly created image locally use the follwing command

```
docker run -d -p 5000:5000 --name books_management_service niranjang2/books_management_service:gke-mysq
```
