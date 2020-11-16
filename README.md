# Skill Finder of ScrumSourcing
 
## Project setup
 ### Ruby on Rails
Perform `bundle install` to install Ruby on Rails gem.
### ReactJS 
Run `yarn install` or `yarn` to install ReactJS frontend dependencies.

### Database
We use Postgresql database for this application.

Add your database credentials by editing `config/database.yml` file before setting up database.

Create Postgresql database by running below command.
```ruby
bundle exec rails db:create
```
Run database migration and seed rake scripts to create `posts` table and populate seed data respectively.
````ruby
bundle exec rails db:migrate db:seed
````


## How to run
 
We use foreman gem to run multiple processes. In this case, there are two processes.
- Rails Server
- Webpack server

Run the below command.
```ruby
foreman start -f Procfile.dev-server
```

Visit http://localhost:3000 to see the running website.
