# Serino Exam: Kitra
Hi this is my interpretation of the technical exam that was given to me. It was quite challenging but nevertheless a fun experience! For this project I used geolib library for a quick way to calculate distance using the latitude and longitude. I also use JWT for user authentication. There are only 3 endpoints which is for login, get user and finding the treasure. The instructions are written below. Enjoy!

## How to run the server:
- open repository and open terminal
- run `npm install`
- run `npm run start`

## Testing the endpoints:
Pre-requisite: Open postman
# Login (`http://localhost/3000/user/login`):
- Enter URL
- open body and input user details to login
- sample input```{
    "email": "u1@kitra.abc",
    "password": "123123"
}```
- sample result: ```{
    "token": "eyJhbGciOiJIUzI1NiJ9.MzAwMA.u1OJwGJJ7gWoOELuHNDLj32hrpH_GervnsdyE_8LMUY"
}```
# Get user (`http://localhost/3000/user`):
- Enter URL
- copy token from login endpoint
- go to authorization tab in postman and select "Bearer Token"
- paste token
- sample result: ```{
    "id": 3000,
    "name": "U1",
    "age": 21,
    "email": "u1@kitra.abc"
}```

# Nearby Treasure (`http://localhost/3000/treasure`):
- Enter URL
- copy token from login endpoint
- go to authorization tab in postman and select "Bearer Token"
- paste token
- open body and input details to find treasure
- sample input: ```{
    "latitude": 14.552036595352455,
    "longitude": 121.01696118771324,
    "distance": 1,
    "prizeVal": 15
}```
- sample result: ```[
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
]```
