<h1 align="center"> express-templating </h1>
<p align="center">
  <b>Simplify your API implementation process by generating the default files structure</b>
</p>

<br>

# Description

Utility that contains commands to accelerate building express APIs by generating the different directories and files for a standard set of files when creating an endpoint:
  - Directories:
    - /routes
    - /services
    - /repositories
  - Files:
    - /routes/resourceNameRoutes.ts
    - /services/resourceNameService.ts
    - /repositories/resourceNameRepository.ts

In the files above resourceName will be replaced with the resource name passed as argument when executing the command in the command line.

# Installation
  ## NPM
  `npm i -D @javierbonet/express-templating`
  ## Yarn
  `yarn add --dev @javierbonet/express-templating`

# Usage
  `npx @javierbonet/express-templating generate-resource --name resourceName`

