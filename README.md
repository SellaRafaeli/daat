daat is a project for creating the Best Hebrew Content Site on the Web. 
=======================================================================

Daat is currently open-source. You can contact sella.rafaeli@gmail.com if you want to help, or create a PR.

To run:
> git clone git@github.com:SellaRafaeli/daat.git;
> npm install
> node app/app.js; #browse to localhost:8000/

Tickets:

* enable edit of existing answers
* Create seed data + process to get it along with clone
* Add and display comments.
* add FB-login
* check bug in category at "House Of Cards"?
* add option to set background
* click on user image: display that image?
* feed - don't load all questions at once, make it endless scroll
* put loading gif in qList controller while loading: http://codepen.io/alextebbs/pen/tHhrz
* if user not signed in (msg "missing valid authtoken for user") then return 401.

Technical tickets:
* setup configuration s.t. when deploying to prod it will use Heroku's DB
* don't render images if there's nothing to render (to avoid JS errors)
* localization: make localization more robust (extract to module from appController)
* fix CSS for textAngular (for example 'quote' shows LTR)
* stop XSS attacks: remove script tags, (copy images?)
* Move external scripts to be part of project (lodash, jquery, bootstrap)
* change authentication scheme to use HTTP-only-cookie instead of POST param
* divide questions_list_controller into inheriting sub-controllers for question, answer, categories
* make package.json not refer "*" but specific versions for any dependency.
* CSS
    * make everything prettier (and divide into subclasses)
    * compile LESS file on server, not client.




Participants:
Ohad Partuck
Sella Rafaeli
Eyal Arubas
