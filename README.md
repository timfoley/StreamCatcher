
# Milestones
## MVP
- [x] app displays 5 random movies based on RT filter and selected sources (Hulu, Amazon, etc.)
- [x] user can 'lock' movies they want to keep in the running
- [x] user can hover over a movie to find out more info
- [x] user can get streaming links for a particular movie
- [ ] user can update filters and start a new search

## Bronze
- [x] make it prettier
- [ ] flesh out movie detail fields (add genre, running time, etc.)
- [ ] add undo button
- [ ] add loading animation
- [x]

## Silver
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
- [ ] **FORM VALIDATION ON RT SCORE FILTER**
- [ ] what happens when the first filter doesn't return enough movies?
- [ ] what do do when we've run out of movies (reloadCount > offset)
- [ ] when a user has locked 5 movies, hide refresh button
- [ ] catch errors!
- [ ] where to write component logic (App vs MoviesContainer vs MovieDetails etc.)
- [ ] permanently save movie streaming links to state
- [ ] for the first batch of movies, choose a random offset between 1-4
- [ ] add more info to movie details
- [ ] auto-generate source filter checkboxes based on presence in state (contact.eirving)
