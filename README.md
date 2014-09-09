# chartbeat-angular

Chartbeat AngularJS components, directives, filters, and services.

This is a collection of AngularJS code that we've built in-house and wanted to share back to the AngularJS community.

Pull requests welcome!


## Demo

[Check the website for demo of components.](http://chartbeat-labs.github.io/chartbeat-angular/)


## Quick start

Include the required libraries:


``` html
<link rel="stylesheet" href="dist/chartbeat-angular.css" />
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular.min.js"></script>
<script src="dist/chartbeat-angular.js"></script>
```

Define the `cb` module as a dependency in your app:


``` javascript
angular.module('myApp', ['cb']);
```


## Developers

Clone the repo:

    git clone git://github.com/chartbeat-labs/chartbeat-angular.git


Install dependencies:

    npm install
    bower install


We use `karma` as our test runner, which you can run via:

    gulp test


You can build the latest version using `gulp`:

    gulp build


## License

The MIT License

Copyright (c) 2014 Chartbeat http://chartbeat.com/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
