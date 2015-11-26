# Introduction

This is very fresh (Oct 27, 2015).

More info coming soon as I'm developing this for our internal use.

# Development

Install all dependencies:

```
$ npm i
```

You can also use a globally installed
[nodemon](https://github.com/remy/nodemon) to automatically
restart the server whenever the server source code changes.

```
nodemon
```

# MVP

The MVP will only support a list of images.
Delay will be the same number for all of them.
There is no admin page. It is just a JSN file.
The image transition is smooth.
It should react when the data on the server changes (invalidate cache somehow).
It runs on a cloud.

# Next versions:

* Security (login/helmet, etc)
* Persistence with PouchDB
* Admin portal
* Live updating according to the latest changes in database
* reordering of slides
* set a time range for when a slide can be visible
* variable durations
* PowerPoint style templates with text
* URLs
* down/counters
* Make a nice logo
* Put the big logo behind the body
* Make a loading animation if necessary
* Coffeescript/Stylus/YAML?

# Data architecture

## Presentation

Is a collection of slides in the order.

### Slide

Type:

* URL
* image
* template + text
* counter(date+time) + text + image

Meta:

* Active
* Schedule (for when to show/hide, date+time,calendar, etc.)
* How long to show (auto = word count + defaultMin)
