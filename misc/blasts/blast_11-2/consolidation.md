# React+Express: A Failed Attempt at Consolidation

Configuration and server management is trash. I wanted a way to run both React and Express at the same time, in the same project. Theoretically, it'd be simpler to run/test/debug and also easier to distribute, one server to rule them all.

Ideally, it'd be set up so that you download the project, run `npm start` and both the frontend and backend live in harmony. The problem with that is that React likes to be run on its own server, and so does Express.


Here's some guides I tried initially to reach my goal:
* [Attempt #1: Dave Ceddia's](https://daveceddia.com/create-react-app-express-backend/)
  * [Associated video](https://www.youtube.com/watch?v=8bNlffXEcC0)

* [Attempt #2: Esau Silva's](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)
* [Attempt #3: N Burgess's](https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3)

## Pivot 1

The problem with these stemmed from setting up the proxy in package.json. As soon as I'd add the field, I'd get "Invalid Host Header" errors on the client side.

I figured from StackOverflow that the issue was caused by an update to the way React handles proxies. Not sure why that wasn't a top google result.

[Attempt #4](https://github.com/facebook/create-react-app/issues/2271): inconclusive (literal dead-end)

[Attempt #5](https://stackoverflow.com/questions/52845805/deploying-create-react-app-to-heroku-with-express-backend-returns-invalid-host-h): genuinely got my hopes up tbh.


## Pivot 2
I switched gears and went for some ready-made solutions.

Some promising github repos:
  * [Attempt #6: Burke Holland's create-react-app mod](https://github.com/burkeholland/express-react-starter/tree/master/server)
    * [Associated video](https://www.youtube.com/watch?v=3bviFNg3BK4)


  * [Attempt #7: Brad Traversy's full fledged solution](https://github.com/bradtraversy/react_redux_express_starter)
    * [Associated video](https://www.youtube.com/watch?v=v0t42xBIYIs)

Ended up getting the same issue as the first 3.

# Conclusion
After ~8 hours of googling and rooting through SO, it looked like the best solution was to split the frontend and backend into 2 servers, one for each.

Ideally, the backend server is the always-on, persistent data store connected to MongoDB and serving the API. The frontend server would serve the React app and the app itself will make frequent calls to the API, and wrap+render the responding JSON. The mobile app will pretty much do the same thing.

Since it was decided that the frontend and backend were to be split up, it was also decided that there'd be separate repos for each. This made it easier to set up automatic deployment for each, and also gave the benefit of separating concerns, e.g., someone working on the frontend wouldn't need to be cluttered with a bunch of backend resources.

In addition, a separate repo was made for the mobile app, mostly because it is its own self-contained thing.
