

### A Cross Platform App 'Web Word Cloud'

Previously I've worked with AngularJs as the front end JS framework for single page applications. The world has moved on and React and Angular are popular now, so both are worth learning to understand what each offers. But for this application I focused on Angular. Ionic is a technology built on top of Angular which allows cross platform apps to be created which will run on Android or iOS, so I decided to learn it and how Angular works within it. 

### The Application

The application I wrote to learn Ionic is called WebWordCloud. It uses SVG to render word clouds like the example below and can be played with at: [www.webwordcloud.com](www.webwordcloud.com). The souce code is here: [Ionic-WordCloud](https://github.com/julianperrott/Ionic-WordCloud)

![](https://raw.githubusercontent.com/julianperrott/Ionic-WordCloud/master/post/img/WebWordCloud1.jpg)

The words shown in the word cloud can be taken from any web page on the internet. Hence the name of the app 'Web Word Cloud'.

For example this page from BBC news "Katowice: COP24 Climate change deal to bring pact to life" [www.bbc.co.uk/news](https://www.bbc.co.uk/news/science-environment-46582025) has been used to create the following image:
![](https://raw.githubusercontent.com/julianperrott/Ionic-WordCloud/master/post/img/WebWordCloud2.jpg) 



<br/>

Many options are included in the application for choosing the font, shape and style of the text to be rendered:

![](https://raw.githubusercontent.com/julianperrott/Ionic-WordCloud/master/post/img/WebWordCloud_options.png)



### Writing the application

There is always an element of learning that is required when doing pretty much any coding and when doing something new then this is especially so. Learning the basics from tutorials is a good way to get the ball rolling e.g. [ionicframework.com/docs/intro/tutorial/](https://ionicframework.com/docs/intro/tutorial/)

Next, some examples more specific to what you want to do are helpful. Creating a word cloud and using SVG in Ionic was what I needed and these two sites helped me form the basis of the application:

> [github.com/proustibat/d3js-ionic](https://github.com/proustibat/d3js-ionic). A tutorial app built with [Ionic Framework](https://ionicframework.com/) to learn [D3.js](https://d3js.org/) with Typescript.
>


> [github.com/jasondavies/d3-cloud](https://github.com/jasondavies/d3-cloud). This is a [Wordle](http://www.wordle.net/)-inspired word cloud layout written in JavaScript. It uses HTML5 canvas and sprite masks to achieve near-interactive speeds. 

Once the basics were done I looked into what options I could give the user to take the application to the next level.

Adding the option of using different fonts was made possible via the fonts google have available at [github.com/google/fonts](https://github.com/google/fonts).

Displaying the word cloud inside a shape was a customisation I made to Jason Davies code. The code he wrote uses a mask to determine where words have already been placed. My change was to simply render a font awesome icon outline on the mask so that words could only be placed in the shape of the icon.

Finally various SVG filters and effects were made available. For examples see some of the effects on this page: [www.smashingmagazine.com](https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/)

Turning a web page into a list of words was made possible via unfluff "An automatic web page content extractor for Node.js!"  [github.com/ageitgey/node-unfluff](https://github.com/ageitgey/node-unfluff)

</br>

### The architecture

I initially planned for the application to be downloadable from the Play and Apple stores as Ionic applications are cross platform. But the performance on devices was not acceptable so I have left it as a web only application.

The problem initially was that the calculation of the word cloud took too long on a device. To resolve this I made this part of the application server side. The final nail in the cross platform coffin was the rendering time on the device which wan't awful, just a bit too sluggish.

The application is made up of 3 parts:

* The files that make up the browser client (Ionic / Angular).
* The CORS proxy - needed to avoid cross origin errors (NodeJS).
* The server which turns a list of words into a word cloud (NodeJS).

![](https://raw.githubusercontent.com/julianperrott/Ionic-WordCloud/master/post/img/webwordcloud_architecture.jpg)



###  Hosting the application

#### Client

The files that make up the browser client (Ionic / Angular) are hosted by Google in a static web site stored in a Google Cloud Storage bucket. The performance is great with no wake-up time even if the files have not been requested for a while.

 [cloud.google.com/storage/docs/hosting-static-website](https://cloud.google.com/storage/docs/hosting-static-website)

<br/>

#### CORS

The CORS anywhere NodeJS server is hosted in Azure as an App service. The hosting plan is F1 (Free) which give 60 minutes a day of compute time, which should be more than enough.

[corsproxywebwordcloud.azurewebsites.net](https://corsproxywebwordcloud.azurewebsites.net/)

<br/>

#### Layout Word Cloud

The server to turn a list of words into a word cloud uses NodeJS which has some C++ dependencies so I put this in a docker container to simplify deployment. Initially this container was hosted on Google, but I ran out of my free credit so I moved it to Azure as an app service running a container.

[webwordcloudcontainer.azurewebsites.net](https://webwordcloudcontainer.azurewebsites.net/)

The performance vs cost for light usage can be seen below. My monthly azure credits cover it running under B1.

| Dev/Test Tier- A-series compute     | Cost per month | Render Time (seconds) |
| ----------------------------------- | -------------- | --------------------- |
| B1 - 100 total ACU - 1.75 GB memory | £29.09         | 2.1 to 2.5            |
| B2 - 200 total ACU - 3.5 GB memory  | £58.18         | 1.7 to 1.8            |
| B3 - 400 total ACU - 7 GB memory    | £116.44        | 1.5 to 1.6            |

| Production Tier - Dv2-series compute | Cost per month | Render Time (seconds) |
| ------------------------------------ | -------------- | --------------------- |
| P1V2 - 210 total ACU - 3.5 GB memory | £96.27         | 0.6 to 0.7            |
| P2V2 - 420 total ACU - 7 GB memory   | £192.62        | 0.6 to 0.8            |
| P2V3 - 840 total ACU - 14 GB memory  | £385.32        | 0.6 to 0.7            |

| Production Tier - A-series compute  | Cost per month | Render Time (seconds) |
| ----------------------------------- | -------------- | --------------------- |
| S1 - 100 total ACU - 1.75 GB memory | £55.43         | 1.6 to 2.2            |
| S2 - 200 total ACU - 3.5 GB memory  | £110.86        | 1.6                   |
| S3 - 400 total ACU - 7 GB memory    | £221.79        | 1.6                   |

<br/>

### Conclusions

There is a learning curve, but Ionic is good option for cross platform apps if you have Angular/JavaScript and Web skills. It is limited by the computing power of the phones and tablet it runs on, so graphically intense applications may not be a good fit. 

Google storage buckets are a great place to host static web sites.


<br/>

### Screenshots


![Screenshot0](https://raw.githubusercontent.com/julianperrott/Ionic-WordCloud/master/post/img/Screenshot0.jpg)

<br/>

![](https://raw.githubusercontent.com/julianperrott/Ionic-WordCloud/master/post/img/Screenshot.jpg)

![Screenshot1](https://raw.githubusercontent.com/julianperrott/Ionic-WordCloud/master/post/img/Screenshot1.jpg)

<br/>

![Screenshot2](https://raw.githubusercontent.com/julianperrott/Ionic-WordCloud/master/post/img/Screenshot2.jpg)

<br/>

![Screenshot3](https://raw.githubusercontent.com/julianperrott/Ionic-WordCloud/master/post/img/Screenshot3.jpg)

<br/>

![Screenshot4](https://raw.githubusercontent.com/julianperrott/Ionic-WordCloud/master/post/img/Screenshot4.jpg)

<br/>

![Screenshot5](https://raw.githubusercontent.com/julianperrott/Ionic-WordCloud/master/post/img/Screenshot5.jpg)


