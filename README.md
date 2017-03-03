Scaffolding generators for the nodejs environment.  

---  

# Getting Started  

## Installation

### npm  

npm install yeoman -g  
npm install @chickendinosaur/generator-node  

## Usage

Differences are a list of difference from the base generator.

### yo @chickendinosaur/node  

List of generators to run.

### yo @chickendinosaur/node:package  

Contains everything that a base npm package needs to publish.  
Code that runs in nodejs.

* npm run benchmark  
* npm run build
* npm run clean
* npm run deploy
* npm run test  

### yo @chickendinosaur/node:package-browser  

Code that needs runs in the browser.
Visual UI components.

#### Differences:  

* Browser testing/benchmarking  
* Example app for visual testing
* npm start  

---  

# Development  

## Installation  

* git clone git@github.com:chickendinosaur/yeoman-generator-node.git
* cd yeoman-generator-node
* npm install
* npm link

---  

# License  

The MIT License (MIT)

Copyright (c) 2016 John Pittman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
