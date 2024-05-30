<h1 align="center"> express-templating </h1>
<p align="center">
  <b>Simplify your API implementation process by generating the default files structure</b>
</p>

<br>

# Description

Utility that contains commands to accelerate building express APIs by generating the different directories and files for a standard set of files when creating an endpoint:
  - Files:
    - /routes
      - /routes/resourceNameRoutes.ts
    - /services
      - /services/resourceNameService.ts
    - /repositories
      - /repositories/resourceNameRepository.ts

In the files above ***resourceName*** will be replaced with the resource name passed as argument when executing the command in the command line.
The commands included in this utility are thought considering a project that uses:
  - [Express](https://expressjs.com/)
  - [Typeorm](https://typeorm.io/)

# Installation
  ### NPM
  `npm i -D @javierbonet/express-templating`
  ### Yarn
  `yarn add --dev @javierbonet/express-templating`

# Commands

  ## Resource generation
  `npx @javierbonet/express-templating generate-resource user  field1:number field2:string`

  This command will generate the following structure:

  ```
  ├── database
  │   ├── entities
  │   │   └── User.ts
  │   └── data-source.ts
  ├── src
        ├── routes
        │   └── userRoutes.ts
        ├── services
        │   └── userService.ts
        ├── repositories
            └── userRepository.ts
  ``` 
  ### Parameters
  - name: to be used when defining the files for the resource.
  - properties list to be used as field for the entity to create: format *propertyName:type*
  
  ### Options
  - dbEngine: database engine to be used in the data source configuration file
    - default: **mysql**
  - dbPort: database port to be used in the data source configuration file
    - default: **3306**
  - dbDirectory: name of the directory where the data source and entities will be placed
    - default: **database**
  - srcDirectory: name of the directory where the routes, service and repository files will be placed
    - default: **src**

  ### userRoutes.ts
  Sets express routes to enable the following actions:
  - GET /: to retrieve all resource instances
  - GET /**:id**: to retrieve an specific resource instances
  - POST /: to create a new resource instances
  - PUT /**:id**: to update an specific resource instances
  - DELETE /**:id**: delete an specific resource instances

  ### userService.ts
  The service use the repository to access the database. Contains the following methods.
  - getAll(): retrieves all the users stored in the database
  - getById(**id**: number): retrieves the specific user from the database
  - create(**user**: *userProperties*): creates a user in the database
  - update(**id**: number, *userProperties*): updates a user in the database
  - delete(**id**: number): deletes a user from the database
  
  ### userRepository.ts
  Contains the following methods:
  - getAll(): retrieves all the users stored in the database
  - getById(**id**: number): retrieves the specific user from the database
  - create(**user**: *userProperties*): creates a user in the database
  - update(**id**: number, *userProperties*): updates a user in the database
  - remove(**id**: number): deletes a user from the database

# Special mentions

  Thanks to [Simone Scigliuzzi](https://medium.com/@simonescigliuzzi). I borrowed his pretty printing class explained [here](https://medium.com/@simonescigliuzzi/creating-a-pretty-console-for-your-nodejs-applications-81a713353554).

