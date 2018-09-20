All,

I hope you have enjoyed this sort of moratorium for the past week. I saw that everyone was making sacrifices to get Coma done and I thought it would be a good idea to have a period of time where we could all reorganize our lives and come into this project fresh and ready to go. That being said, let's get back into the swing of it so we can finish this one out.

# Large Project
I've named the repo "largo" temporarily, it'll be changed once we have a name.

## Main Idea

### Motivation
Our frontrunner idea right now is the local business directory. Basically, it's a UCF oriented service that allows students/faculty associated with UCF to connect consumers with producers.

### Examples
  * The photographers that post on various (5-10) UCF FB pages around graduation would now have **one** place they need to post to/check on.

  * UCF legal, CAPS, Tech Product Center, and other University-sponsored entities have a centralized way to efficiently distribute info about their services to our 60K+ student body.

  * Majors that typically don't get a lot of work experience while in school {marketing, sports/exercise science, event planning, graphic design, music production, etc} use it to gain experience in their field by connecting with clients looking for those services.

  * People looking for the above services, or others, have O(1) access to a giant database of local, affordable freelancers.

### Problem Solver
It also potentially solves some of the drawbacks of leading sites like Craigslist or fiverr, essentially giving the best of both services.

### Examples
  * **Locality**
    * Without a car in the Greater Orlando area, it's difficult to schedule appts, meet with customers, even buy materials. It'd be convenient if when you needed something done, you can get it done by someone who's geographically closest to you, for convenience's sake.

  * **Setting up meetings**
    * Since the app'll be UCF-affiliated, any student with a Knights email can easily reserve a classroom or a study room in the library to meet with clients/providers to plan out the terms of their agreements, sample work/evaluate portfolios, etc.

  * **Verification**
    * Because we'll be forcing users to sign up with UCF affiliated emails, it's easy to:
      * Protect the client by:
        1. Making sure the service provider is who they say they are
        2. Make sure the service provider can't hide behind an online persona (reviews?)

      * Protect the service provider by:
        1. Making sure the client isn't some rando trying to rip them off (reviews?).
  * **Pricing**
    * Many of the people posting on Craigslist are professionals, and expected to be paid as such. With our service, providers know they are dealing with students just like them and (probably) won't be ripped off, and clients know that because the providers are students/faculty, they (probably) won't be over-charged.


## Alternatives
I think this one is a solid idea. That being said, if you have an idea that you want to pitch to the group, feel free.

Some things you might want to keep in mind:
### Relevance
* **Users**
  * Who are your ideal users? What roles do they play in your app?
  * How do you acquire them?
  * How does a new user get started?
  * Why would an existing user continue to use your app?

* **Purpose**
  * What problem does your idea solve, or what currently existing thing does it improve upon?
  * Why do we (potential users) need your idea? Or, why do we want it, and how much do we want it?

* **Marketability**
  * Put yourself in the shoes of the person reading/hearing the description.
    * What do they say about it after they've read/heard about it?
    * Does the idea captivate them? Why or why not?
  * **MOST IMPORTANT**: What does the recruiter say when they see that bad boy on the rez?

### Feasibility
* How long will it take to make? How do you make that estimate?
* What are the core components?
* What is the core feature? Supporting features?


## Stack
  * As far as web stack goes, I think MEVN worked just fine last time. Open to suggestions.

### Mobile

* I know nothing about mobile development at all, so if there's an objectively best choice, or a compelling reason to use iOS instead, please suggest it.

* Some options:
  * [Nativescript](https://www.nativescript.org/)
  * [React Native](https://facebook.github.io/react-native/)
  * [Ionic](https://ionicframework.com/)
  * [PhoneGap](https://phonegap.com/)
  * [Xamarin](https://visualstudio.microsoft.com/xamarin/)
  * [Cordova](https://cordova.apache.org/)

* I'm partial to Nativescript since it sounds like we can make both native iOS and Android applications with it, using only Javascript and it claims to directly support Vuejs.

* Worst case, we fall back to Android, since everyone in the group knows Java, and it's the free option.

# Big Rocks
Here are some things that are needed, regardless of design choices later on:

**Database/Deployment Setup**
* This is pretty simple, should take ~5 mins. I only mention it because I felt like there was some confusion about how it was done last time, so I'll take some time to go through it.

**User signup/login**
* This is relatively straightforward, can pretty much do a copypasta of Coma's signup/login routes. For this project, I'd like us to also have flash messages giving user feedback when email/password combo is wrong.

**Mobile synchronicity**
* Ideally, the mobile client and the web client should be identical in terms of functionality. To get us started on that, I'd like to first get signup and login working on both web and mobile, and that process should give us an idea of how easy it will be to replicate web client functionality on the mobile client.

# Next Steps

* I'm expecting a quick turnaround on the above.

* After those parts are settled:
  1. I'd like us to get a more fleshed out idea of how the project will work in terms of flow, features, and entities.
  2. Then, we start building out the backend, and connecting a nice frontend to it.
  3. As far as mobile development goes, it'd be nice to be able to iterate by adding a feature on the web client, and then replicating that feature on mobile.
    * Another option is to fully flesh out the web client, and then fully replicate it on the mobile.
    * Worst case, we can always open up a webview and just call the API (theoretically).
