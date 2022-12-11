
# API Reference
# Check endpoints

### Create check
```http
  POST /api/check
```
#### Body
```
{
    userId: string,
    name: string,
    url: string,
    protocol: string,
    path: string,
    port: number,
    webhook: string,
    timeout: number,
    interval: number,
    threshold: number
    authentication: {
        username: string,
        password: string
    },
    httpHeaders: {
        string: string
    },
    assert: {
        statusCode: string
    },
    tags: [string],
    ignoreSSL: boolean

}
```
#### Response
```
{
    message: "URL added successfully",
    check:
    {
        _id: string,
        userId: string,
        name: string,
        url: string,
        protocol: string,
        path: string,
        port: number,
        webhook: string,
        timeout: number,
        interval: number,
        threshold: number
        authentication: {
            username: string,
            password: string
        },
        httpHeaders: {
            string: string
        },
        assert: {
            statusCode: string
        },
        tags: [string],
        ignoreSSL: boolean,
        disabled: boolean
    }
}
```
### Read all checks

```http
  GET /api/check
```
#### Response
```
{
    message: "URLs checks retrieved successfully",
    checks: 
            [
                {
                    _id: string,
                    userId: string,
                    name: string,
                    url: string,
                    protocol: string,
                    path: string,
                    port: number,
                    webhook: string,
                    timeout: number,
                    interval: number,
                    threshold: number
                    authentication: {
                        username: string,
                        password: string
                    },
                    httpHeaders: {
                        string: string
                    },
                    assert: {
                        statusCode: string
                    },
                    tags: [string],
                    ignoreSSL: boolean,
                    disabled: boolean
                },
                {
                    ...
                }
            ]
}
```
### Read check

```http
  GET /api/check/:id
```
| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of check to fetch |
#### Response
```
{
    message: "URL check retrieved successfully",
    check: 
    {
        _id: string,
        userId: string,
        name: string,
        url: string,
        protocol: string,
        path: string,
        port: number,
        webhook: string,
        timeout: number,
        interval: number,
        threshold: number
        authentication: {
            username: string,
            password: string
        },
        httpHeaders: {
            string: string
        },
        assert: {
            statusCode: string
        },
        tags: [string],
        ignoreSSL: boolean,
        disabled: boolean
    }
}
```

### Edit check
```http
  PATCH /api/check/:id
```
| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of check to edit  |

#### Body
```
{
    name: string,
    url: string,
    protocol: string,
    path: string,
    port: number,
    webhook: string,
    timeout: number,
    interval: number,
    threshold: number
    authentication: {
        username: string,
        password: string
    },
    httpHeaders: {
        string: string
    },
    assert: {
        statusCode: string
    },
    tags: [string],
    ignoreSSL: boolean
}
```
#### Response
```
{
    message: "URL check edited successfully",
    check: 
    {
        _id: string,
        userId: string,
        name: string,
        url: string,
        protocol: string,
        path: string,
        port: number,
        webhook: string,
        timeout: number,
        interval: number,
        threshold: number
        authentication: {
            username: string,
            password: string
        },
        httpHeaders: {
            string: string
        },
        assert: {
            statusCode: string
        },
        tags: [string],
        ignoreSSL: boolean,
        disabled: boolean
    }
}
```
### Delete check
```http
  DELETE /api/check/:id
```
| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. Id of check to delete |

#### Response
```
{
    message: "URL check deleted successfully"
}
```


# Report endpoints

### Read report

```http
  GET /api/report/:id
```
| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of check to fetch |
#### Response
```
{
    message: "URL report retrieved successfully",
    check: 
    {
        _id: string,
        checkId: string,
        status: string,
        avaliability: number,
        outages: number,
        downtime: number,
        uptime: number,
        responseTime: number,
        history: [string]
    }
}
```

# User endpoints

### Create user
```http
  POST /api/signup
```
#### Body
```
{
    userName: string,
    password: string,
    passwordConfirm: string,
    email: string

}
```
#### Response
```
{
    message: "User created successfully",
    user:
    {
        _id: string,
        userName: string,
        email: string,
        activated: boolean
    }
}
```

### Read user

```http
  GET /api/me
```

#### Response
```
{
    message: "User retrieved successfully",
    user: 
    {
        _id: string,
        userName: string,
        email: string,
        activated: boolean
    }
}
```

###  User login

```http
  POST /api/login
```
```
{
    userName: string,
    password: string,
}
```
#### Response
```
{
    message: "User logged in successfully",
    user: 
    {   
        _id: string,
        userName: string,
        email: string,
        activated: boolean,
        token: string
    }
}