## RUN

- npm run build-prod
- npm run start
  

- Select any future Start Date
- Select any future end Date
- Enter city: Toronto
- Enter Country: CA

## Questions
- [ ] How the hell do I create modules in server folder? Are their module naming conventions I should look at?


- [ ] Why I am I getting duplicate results for the first form submission?


- [ ] How do I set up the service worker at the end of my index.html page to cache trips for offline use? Why are they suggesting I do this?


## TODO

- [ ] Figure out how to shit out form/api call errors

- [ ] Set up service works for offline usage
  https://developers.google.com/codelabs/pwa-training/pwa03--going-offline#2

>Stage 5 - Service Workers
>The project must have set up service workers in webpack.
>
> to allow offline access, what the service workers actually do is create a cached version of your website that they can supply if the server can’t be reached.


## Project Goals
The goal of this project is to give you practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

> Quotation example insert paragraph here

### APIS Used for project

- https://www.geonames.org/
- https://www.weatherbit.io/api/climate-normals
- https://www.weatherbit.io/api/weather-forecast-16-day
- https://pixabay.com/service/about/api/


### Environment Variables
Next we need to declare our API keys, which will look something like this:
```
// set Meaningcloud API credentias
API_KEY = "Your api key"
```

...but there's a problem with this. We are about to put our personal API keys into a file, but when we push, this file is going to be available PUBLICLY on Github. Private keys, visible publicly are never a good thing. So, we have to figure out a way to make that not happen. The way we will do that is with environment variables. Environment variables are pretty much like normal variables in that they have a name and hold a value, but these variables only belong to your system and won't be visible when you push to a different environment like Github.

- Use npm or yarn to install the dotenv package ```npm install dotenv```. This will allow us to use environment variables we set in a new file
- Create a new ```.env``` file in the root of your project
- Go to your .gitignore file and add ```.env``` - this will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys was pointless.
- Fill the .env file with your API keys like this:
```
API_KEY=**************************
```
- Add this code to the very top of your server/index.js file:
```
const dotenv = require('dotenv');
dotenv.config();
```
- Reference variables you created in the .env file by putting ```process.env``` in front of it, an example might look like this:
```
console.log(`Your API key is ${process.env.API_KEY}`);
```
...Not that you would want to do that. This means that our updated API credential settings will look like this:
```javascript
// set various API credentials in .env files like below
  const application_key = process.env.API_KEY

```

## Deploying

A great step to take with your finished project would be to deploy it! Unfortunately its a bit out of scope for me to explain too much about how to do that here, but checkout [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for some really intuitive free hosting options.


###### Project by Matthew Marie-Rhodes
