# TDD

## Install PostgreSQL
https://www.pgadmin.org/download/pgadmin-4-apt/

### Reset Password

#### open editor
```angular2html
sudo -u postgres psql
```
#### reset password
```angular2html
\password postgres
\q
```

## Install Package
```angular2html
npm i
```

## Create Database 
You should create manually database with name "aluguel".
## Migrations

### Execute migrate
```angular2html
 knex migrate:latest --env test
```

### Create Table
If you need create new migration.
```angular2html
 knex migrate:make create_table_test --env test
```
