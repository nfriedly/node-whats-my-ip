Text-based IP API
=================

Returns the requester's public IP as plain text. Also has a pretty front page. Was 
built to support https://github.com/nfriedly/node-dreamhost-dns-updater

Installation / Set Up
---------------------

git clone the repo and then push to heroku. Or run on your own system. It expects the 
X-Forwarded-For header to be set when behind a reverse proxy, if that's not avaliable 
then it returns the request's IP.

Credits
-------

Color Scheme by IcyMint, Creative Commons CC-BY-NC-SA
http://www.colourlovers.com/palette/2479354/durratino_CLAD

All other code and assets By Nathan Friedly, released under the MIT License:

MIT License
-----------

Copyright (c) 2012 by Nathan Friedly - http://nfriedly.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
