# Project: Trekit API

Trekit API is a very simple RESTful API built to support the Trekit-App, a web app designed to let users log their trips around the world on a map. The API supports CRUD operations on the trips stored in a mongoDB database as well as user authentication and authorization and some routes for managing the user account.

# 📁 Collection: Trips

Has protected routes that allow an user to read its trips, write new ones or perform updating and deleting.

## End-point: Add New Trip

All fields are required, besides 'description'

### Method: POST

> ```
> {{URL}}/api/v1/trips
> ```

### Body (**raw**)

```json
{
  "city": "Madrid",
  "country": "Spain",
  "startDate": "2021-08-21",
  "endDate": "2021-09-01",
  "image": "https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.mihaib.ro%2Fwp-content%2Fuploads%2F2022%2F04%2Fmadrid-obiective-turistice.jpg&imgrefurl=http%3A%2F%2Fwww.mihaib.ro%2Fobiective-turistice-madrid%2F&tbnid=FkogM5gh3exytM&vet=12ahUKEwivy4LMv5D8AhXCQOUKHUFSBqUQMygHegUIARDUAQ..i&docid=429iSc6FBKZKBM&w=800&h=450&q=madrid&ved=2ahUKEwivy4LMv5D8AhXCQOUKHUFSBqUQMygHegUIARDUAQ",
  "description": "A marvellous stay in this beautiful town. Loved it!",
  "coords": [40.416775, -3.70379]
}
```

### 🔑 Authentication bearer

| Param | value   | Type   |
| ----- | ------- | ------ |
| token | {{jwt}} | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get All Trips

### Method: GET

> ```
> {{URL}}/api/v1/trips
> ```

### 🔑 Authentication bearer

| Param | value   | Type   |
| ----- | ------- | ------ |
| token | {{jwt}} | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Trip By Id

### Method: GET

> ```
> {{URL}}/api/v1/trips/:id
> ```

### 🔑 Authentication bearer

| Param | value   | Type   |
| ----- | ------- | ------ |
| token | {{jwt}} | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Trip

### Method: PATCH

> ```
> {{URL}}/api/v1/trips/:id
> ```

### Body (**raw**)

```json
{
  "coords": [40.416775, -3.70379]
}
```

### 🔑 Authentication bearer

| Param | value   | Type   |
| ----- | ------- | ------ |
| token | {{jwt}} | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Trip

### Method: DELETE

> ```
> {{URL}}/api/v1/trips/:id
> ```

### 🔑 Authentication bearer

| Param | value   | Type   |
| ----- | ------- | ------ |
| token | {{jwt}} | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Users

Has routes for getting and updating user data as well as deactivating the account

## End-point: Get Current User

### Method: GET

> ```
> {{URL}}/api/v1/users
> ```

### 🔑 Authentication bearer

| Param | value   | Type   |
| ----- | ------- | ------ |
| token | {{jwt}} | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Current User

Allowed fileds: name,email,gender

### Method: PATCH

> ```
> {{URL}}/api/v1/users
> ```

### Body (**raw**)

```json
{
  "name": "New Name"
}
```

### 🔑 Authentication bearer

| Param | value   | Type   |
| ----- | ------- | ------ |
| token | {{jwt}} | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Current User

### Method: DELETE

> ```
> {{URL}}/api/v1/users
> ```

### Body (**raw**)

```json

```

### 🔑 Authentication bearer

| Param | value   | Type   |
| ----- | ------- | ------ |
| token | {{jwt}} | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Auth

Has the authentication routes as well as the special route for updating passwords

## End-point: Signup

All fields are required to signup

### Method: POST

> ```
> {{URL}}/api/v1/users/signup
> ```

### Body (**raw**)

```json
{
  "name": "Alexandra Simion",
  "email": "{{email}}",
  "gender": "female",
  "password": "{{password}}",
  "passwordConfirm": "{{password}}"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Login

### Method: POST

> ```
> {{URL}}/api/v1/users/login
> ```

### Body (**raw**)

```json
{
  "email": "{{email}}",
  "password": "{{password}}"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Password

### Method: POST

> ```
> {{URL}}/api/v1/users/updatePassword
> ```

### Body (**raw**)

```json
{
  "oldPassword": "{{oldPassword}}",
  "newPassword": "{{password}}",
  "newPasswordConfirm": "{{password}}"
}
```

### 🔑 Authentication bearer

| Param | value   | Type   |
| ----- | ------- | ------ |
| token | {{jwt}} | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Route not found

### Method: GET

> ```
> {{URL}}/api/v1
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---

Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
