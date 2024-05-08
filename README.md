# Serino Exam: Kitra
Hi this is my interpretation of the technical exam that was given to me. Creating a solution was quite challenging but nevertheless a fun experience! For this project I used geolib library for a quick way to calculate distance using the latitude and longitude. I also added user authentication because of how I understood the introduction specifying "Kitra Users". There are only 3 endpoints which is for login, get user and finding the treasure. I hope the instructions written below are clear. Enjoy!

## How to run the server (windows/linux):
- open repository and open terminal
- run `npm install`
- run `npm run start`
## if ran on windows first and then ran on linux(vice-versa), follow these instructions:
- delete node_modules or run `rm -rf node_modules/`
- run `npm install`

# DB seeding/migration:
- the database should be seeded upon running the server through the initDB() function which runs the database.ts script

# Testing the endpoints:
Pre-requisite: Open postman
## Login (`http://localhost/3000/user/login`):
- Enter URL
- open body and input user details to login
- sample input
```
{
    "email": "u1@kitra.abc",
    "password": "123123"
}
```
- sample result:
```
{
    "token": "eyJhbGciOiJIUzI1NiJ9.MzAwMA.u1OJwGJJ7gWoOELuHNDLj32hrpH_GervnsdyE_8LMUY"
}
```
## Get user (`http://localhost/3000/user`):
- Enter URL
- copy token from login endpoint
- go to authorization tab in postman and select "Bearer Token"
- paste token
- sample result:
```
{
    "id": 3000,
    "name": "U1",
    "age": 21,
    "email": "u1@kitra.abc"
}
```

## Nearby Treasure (`http://localhost/3000/treasure`):
- Enter URL
- copy token from login endpoint
- go to authorization tab in postman and select "Bearer Token"
- paste token
- open body and input details to find treasure
- sample input:
```
{
    "latitude": 14.552036595352455,
    "longitude": 121.01696118771324,
    "distance": 1,
    "prizeVal": 15
}
```
- sample result:
```
[
    {
        "id": 102,
        "name": "T3",
        "latitude": 14.54464357,
        "longitude": 121.0203656,
        "amount": 15,
        "distance": 0.901
    },
    {
        "id": 100,
        "name": "T1",
        "latitude": 14.54376481,
        "longitude": 121.0199117,
        "amount": 15,
        "distance": 0.974
    }
]
```
