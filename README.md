daat is a project for creating the Best Hebrew Content Site on the Web. 
=======================================================================

Daat is currently open-source. You can contact sella.rafaeli@gmail.com if you want to help, or create a PR.

To run:
> git clone git@github.com:SellaRafaeli/daat.git;
> npm install
> node app/app.js; #browse to localhost:8000/

Current issues in progress:

* Create seed data + process to get it along with clone
* Add and display comments.
* add FB-login, change login flow to signin/up/fb
* add a good text editor for writing answers, including support for pictures and links

Technical tickets:
* Move external scripts to be part of project (lodash, jquery, bootstrap)
* change authentication scheme to use HTTP-only-cookie instead of POST param
* divide questions_list_controller into inheriting sub-controllers for question, answer, categories
* CSS
    * make everything prettier (and divide into subclasses)
    * compile LESS file on server, not client.




Participants:
Ohad Partuck
Sella Rafaeli
Eyal Arubas
