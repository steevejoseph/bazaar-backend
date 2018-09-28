All,

# Intro
Just a quick Tuesday update. Thank you all for bearing with me as this project is set up.

Something you may have noticed for this project is that the directory structure is different.

The majority of the changes come from using a package called express-generator. It's pretty straightforward. Read up on it [here](https://expressjs.com/en/starter/generator.html) (lite) or [here](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website) (more in-depth).

## Main differences:
  * The main is called is called "app.js" instead of "index.js"
  * The project is no longer run from the main js file, but instead from bin/www.
    * Apparently this makes it easier to set up automatic testing? Will look into this.

  * app.js is pretty much comprised of only global app includes and configurations.

  *  Routes modularized into seprate files.
    * This is so the main js will be cleaner.

Other than that, see if you can [grok](http://ninjawords.com/grok) what's happening in the project as a whole.

# Next Steps
Here's a skeleton of the next two weeks or so:

1. Affner's handling the signup/login logic this time around.

2. Wednesday Wyatt and I are meeting to get some basic API routes squared away.
  * **NOTE**: For the people I have investigating various mobile technologies, this is probably important. The mobile client will essentially be calling the API for everything.  

3. Thursday the plan is to meet up with Stephen and possibly others to get a basic implementation of adding Services, associating them with providers, searching for Services, and possibly deleting services. This set of features represents the absolute minimum functionality, that can (and will) be iterated upon.

4. Friday we should have a basic (Coma-level) implementation going, minus the "full" UI.
  * I say minus the UI because it'd suck to design a fully fleshed out UI, only to have to change it every time we add a unit of functionality.

5. Then, in lab (**please do your best to be there**), we'll hash out a full set of the features we'll be implementing.

  *  We did something similar last Friday, but I want to make sure everyone's there to give input, such that we can decide together what we're working on, but also so that each person knows and understands what we're doing moving forward, and to make sure that nothing is left unsaid in the beginning.

    * It becomes very expensive timewise to go back and say, "We should have done < x > instead," or "Let's do < completely unrelated thing >," in the middle of the project. Of course, we can adjust as necessary, but I'd like us to have a baseline to work towards.


6. From there, the idea is that we'll spend about a week on each new feature set up.
  * Ideally there'll be about 2-3 people working on each feature.
  * This includes:
    * setting up the API routes for it,
    * some light frontend (setting up FE to pass relevant info to BE),
    * writing the backend code,  and
    * replicating that feature on the mobile client.

* Some of the features already suggested:
  * Social media as login
  * password recovery thru email
  * Premium membership for providers
  * text chat
  * video chat
  * Map view of closest providers after search.
  * UCF room scheduling for client/business owner meetings, negotiations, etc.
  * Recommended services

* Of course, I prolly left some out, so feel free to edit this doc to add suggestions, or even create a new one.

As always, any questions/comments/concerns, feel free to PM me.

Kind regards,

Steeve
