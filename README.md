# StreamCatcher!
Picking a movie to watch in the age of streaming _should_ be easy. Anyone who's spent way too much time scrolling through dozens of titles knows it's not that simple!

Enter **StreamCatcher**. StreamCatcher helps you make good decisions quickly.Pick a few sources and a minimum Rotten Tomatoes score, and we'll show you four movies that match.

See something you like? Click on it to lock it down. Press space (or click more movies!) to refresh the selection. Hover over each movie for more info.

Continue refreshing, locking, and unlocking until you've found something that looks good. Then just click to get the streaming links, sit back, and enjoy the show!

I built this in just over a week as my final project for General Assembly DC's Web Development Immersive program. See below for my next steps, and feel free to reach out with questions, issues, or pull-requests!

## How It's Made
- An Express server handles API calls to [GuideBox](https://api.guidebox.com/) and [OMDB](omdbapi.com) (major shout-outs!), filtering and preparing the results
- This React front-end takes care of displaying info, re-querying the back-end to refresh movies, etc.
- I'd also like to say a HUGE thank-you to [Coolors](http://coolors.co), an awesome color-scheme generator, for giving me the inspiration for this site.  


# Milestones
## MVP
- [x] app displays 5 random movies based on RT filter and selected sources (Hulu, Amazon, etc.)
- [x] user can 'lock' movies they want to keep in the running
- [x] user can hover over a movie to find out more info
- [x] user can get streaming links for a particular movie
- [ ] user can update filters and start a new search without refreshing

## Bronze
- [ ] flesh out movie detail fields (add genre, running time, etc.)
- [ ] add movie trailers
- [ ] add undo button
- [ ] add loading animation
- [x] user onboarding/instructions
- [x] make it prettier

## Silver
- [ ] floating tooltips or something to demonstrate how to use
- [ ] movie will be done by 10pm (or nearest 15 minutes rounded up)
- [ ] optimize for mobile
  - [x] only display 4 movies?
  - [ ] change streaming links to device-appropriate links
- [ ] add more filter options (by genre, metacritic score, etc.)
- [ ] add a "free" filter for _all_ free movies
- [ ] filter by time

## Gold
- [ ]

## To Refactor
- [ ] mobile optimization:
  - [ ] best way to deal with touch vs. click events
    - currently handled based on UserAgent OS
    - would it be better to differentiate clicks vs touch events instead? 
- [ ] FORM VALIDATION ON RT SCORE FILTER
- [ ] what happens when the first filter doesn't return enough movies?
- [ ] what do do when we've run out of movies (reloadCount > offset)
- [ ] when a user has locked 4 movies, hide refresh button
- [ ] catch errors!
- [ ] where to write component logic (App vs MoviesContainer vs MovieDetails etc.)
- [ ] permanently save movie streaming links to state
- [x] for the first batch of movies, choose a random offset between 1-4
- [ ] auto-generate source filter checkboxes based on presence in state (contact.eirving)
