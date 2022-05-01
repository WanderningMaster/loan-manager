# loan-manager(React+Redux+Express+Mongodb)

App for managing loans

Technologies that have been used:
 - Nodejs+Typescript
 - Express+mongoose

# Setup guide:

Clone repo: ```git clone```

## Backend setup
* Move to the backend folder: ```cd loan-manager/backend```

* Install dependecies: ```npm i```

* Build docker container with mongodb image: ```docker-compose up -d```

* Now you need to fill ```.env``` file. You can take ```.env.template```(located in root of ```/src``` folder) file as sample or create your own.

**Important** db password and username should match in ```docker-compose.yaml``` and ```.env``` files

* Build app: ```npm run build```

* Start app: ```npm run start```










