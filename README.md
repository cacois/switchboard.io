# Switchboard.io

Switchboard.io is a socket.io relay service. It allows socket.io to easily be used with non-Node.js backends, without using complex solutions for non-evented languages.

Switchboard basically functions as a proxy, allowing clients to make a socket.io connection and register their sessionid from a separate web app. Once registered,
all events sent to the REST API exposed switchboard.io instance will be
immediately pushed to the registered client. This allows a non-socket.io web
app to send realtime push notifications to all of its clients.

In the future we may extend switchboard.io to allow clients to push
events to the server as well.


## Project Origin

I love socket.io...when I'm writing web apps in Node.js. I've attempted to use socket.io ports with other backends, such as python/gevent, and hated the experience so much that I wrote this service to "fix the glitch". Switchboard.io
allows me to send realtime push notifications to clients from any webapp backend,
without a whole lot of complexity.

## Installation

Install dependencies using:

    npm install

then run switchboard.io with:

    node switchboard.js
