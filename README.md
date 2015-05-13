#Food Cart Map

*Created by [Andur Carr](https://github.com/LaMarseillaise).*

Deployed version on Heroku: [https://stormy-river-3671.herokuapp.com/](https://stormy-river-3671.herokuapp.com/).

This is for Uber's Food Truck coding challenge. The goal was to create a service that tells a user what types of food trucks are available near a specific location. This solution involves displaying the information graphically on a map. This is a front-end solution, as I considered a map to be the most effective means of displaying the data.

The data are gathered directly from an [OpenData API](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat?) in JSON using client-side JavaScript. This means that the system may be rate limited, as no API key is used (there is no way to obscure it). The application is run on a simple Ruby/Rack server. This solution did not necessitate a back-end, and so this seemed a reasonable approach.

Aside from the Google maps API, two libraries have been included for expedience: jQuery and Twitter Bootstrap. The former was used to obtain the data in JSON format; the latter to simplify the layout. If I had more time, I would remove Bootstrap.

##Usage

Once loaded, the map will be centered on either the user's current location (if it is shared and is approximately in San Francisco) or a pre-determined location in San Francisco (Market Street between Geary and Montgomery).

- Food trucks and carts in the general vicinity will be displayed as markers around this location.
- Clicking on a marker will display some information about the truck/cart.
- A new location can be selected by simply clicking on the map, re-centering it and possibly displaying new markers.

###Notes/Confessions
- JavaScript is not currently a strong point of mine. I am not yet familiar with testing frameworks for it.
- I have never worked with maps or map data before.
- I probably should have just done a text-only readout, and used Rails, a database, and TDD.
