+++
draft = false
date = "2015-02-11T16:24:01-05:00"
title = "Automating sprite creation with Grunt"
showonlyimage = false
image = "/img/blog/pinterest-header.jpg"
+++

> Visita este [link](http://frontendlabs.io/889--automatizar-la-creacion-de-sprites-con-grunt) para la versión en español.

### Why should I use sprites in my project?

Sprites can benefit page speed in several ways. First, if many small images are combined into one large image, the browser will require fewer server connections. Second, depending on how well the large PNG compresses, this can end up saving a substantial amount of bandwidth. Finally, in some browsers it is faster to decode one large image than several small ones.

This is one of [Pinterest’s](http://pinterest.com) sprites.

![webapp-desktop-main-1x.356df158](http://frontendlabs.io/wp-content/uploads/2014/06/webapp-desktop-main-1x.356df158.png)

Let’s imagine for a moment that we need to add a new image in the existing sprite and rearrange the others around it, we would have to recalculate positions for every class in the stylesheet…

Would you like to do that task manually? I’m quite sure I wouldn’t.

Well, worry no more. Today we’re going to learn how to automate this process with a little help from Grunt, if you don’t know what Grunt is you can read [this interesting post](http://24ways.org/2013/grunt-is-not-weird-and-hard/ "Grunt for People Who Think Things Like Grunt are Weird and Hard") by Chris Coyier to get started.

The Grunt task we’ll be using is **grunt-spritesmith**, for the full documentation visit the Github repo [https://github.com/Ensighten/grunt-spritesmith](https://github.com/Ensighten/grunt-spritesmith)

Now let’s set up the file structure to start creating the sprite of our project:

[![Captura de pantalla 2014-06-26 a la(s) 17.29.52](http://frontendlabs.io/wp-content/uploads/2014/06/Captura-de-pantalla-2014-06-26-a-las-17.29.52.png)](http://frontendlabs.io/wp-content/uploads/2014/06/Captura-de-pantalla-2014-06-26-a-las-17.29.52.png)Inside the folder `mi-proyecto` we have `css` (where the stylesheet will be created) and the folder `img` which also contains the `sprites` folders where we’ll place all the separated images that we’ll join later on. (In order to keep this a basic tutorial we’ll only be working with .png images)

The content of the file `package.json` is the following:

~~~js
{  
	"name": "mi-proyecto",  
	"version": "0.1.0",  
	"devDependencies": {  
		"grunt": "~0.4.5",  
		"grunt-spritesmith": "^2.1.0"  
	}  
}  
~~~

and the content of `Gruntfile.js` is:

~~~js
module.exports = function(grunt) {  
	grunt.initConfig({  
	sprite:{  
		all: {  
			src: ‘img/sprites/*.png’,  
			destImg: ‘img/spritesheet.png’,  
			destCSS: ‘css/sprites.css’,  
			algorithm: ‘binary-tree’  
		}  
	}  
});

// Load task  
grunt.loadNpmTasks(‘grunt-spritesmith’);  
};

~~~ 


Then we go to the root of our project in terminal and type this line:

~~~js
npm install  
~~~  

It should look like this so far:

![Captura de pantalla 2014-06-26 a la(s) 17.19.51](http://frontendlabs.io/wp-content/uploads/2014/07/Captura-de-pantalla-2014-06-26-a-las-17.19.51.png)

Hit enter and this will create a new folder called `node_modules` with the dependencies of our project that are downloaded from the file `package.json`

![Captura de pantalla 2014-06-26 a la(s) 17.21.48](http://frontendlabs.io/wp-content/uploads/2014/07/Captura-de-pantalla-2014-06-26-a-las-17.21.48.png)

Then run the task: grunt sprite  
![Captura de pantalla 2014-06-26 a la(s) 17.22.15](http://frontendlabs.io/wp-content/uploads/2014/07/Captura-de-pantalla-2014-06-26-a-las-17.22.15.png)

![Captura de pantalla 2014-06-26 a la(s) 17.22.37](http://frontendlabs.io/wp-content/uploads/2014/07/Captura-de-pantalla-2014-06-26-a-las-17.22.37.png)

This will create the sprite file `spritesheet.png` and the stylesheet `sprites.css` in the path specified above.

![Captura de pantalla 2014-06-26 a la(s) 17.23.13](http://frontendlabs.io/wp-content/uploads/2014/07/Captura-de-pantalla-2014-06-26-a-las-17.23.13.png)

![Captura de pantalla 2014-06-26 a la(s) 17.23.26](http://frontendlabs.io/wp-content/uploads/2014/07/Captura-de-pantalla-2014-06-26-a-las-17.23.26.png)

The styles and classes are ready to use in the file `sprite.css`

~~~css 
/*  
Icon classes can be used entirely standalone. They are named after their original file names.
*/  

.icon-ico_alert {  
	background-image: url(../img/spritesheet.png);  
	background-position: -93px 0px;  
	width: 21px;  
	height: 18px;  
}  
.icon-ico_check {  
	background-image: url(../img/spritesheet.png);  
	background-position: 0px 0px;  
	width: 65px;  
	height: 60px;  
}  
.icon-ico_fb {  
	background-image: url(../img/spritesheet.png);  
	background-position: -65px 0px;  
	width: 28px;  
	height: 28px;  
}  
.icon-ico_google {  
	background-image: url(../img/spritesheet.png);  
	background-position: -65px -28px;  
	width: 28px;  
	height: 28px;  
}  
.icon-ico_mail {  
	background-image: url(../img/spritesheet.png);  
	background-position: 0px -60px;  
	width: 28px;  
	height: 28px;  
}  
.icon-ico_time {  
	background-image: url(../img/spritesheet.png);  
	background-position: -28px -60px;  
	width: 28px;  
	height: 28px;  
}  
.icon-ico_twitter {  
	background-image: url(../img/spritesheet.png);  
	background-position: -56px -60px;  
	width: 28px;  
	height: 28px;  
}  
~~~ 

### Do you use preprocessors?

We have the option to generate our styles in several formats (CSS, SASS, SCSS, LESS, Stylus).

To create the stylesheet in [Stylus](http://learnboost.github.io/stylus/), we have to change line 7 of the `Gruntfile.js file and replace it with:

~~~js
destCSS: ‘css/sprites.styl’,  
~~~ 

And we run the grunt sprite task again:

![Captura de pantalla 2014-06-26 a la(s) 17.22.15](http://frontendlabs.io/wp-content/uploads/2014/07/Captura-de-pantalla-2014-06-26-a-las-17.22.15.png)

This will create a set of mixins in the `sprites.styl file with all the variables needed, for example;

~~~js 
.icoFacebook  
	sprite($ico_fb) // the image name is the same as the variable name  
	display: inline-block  
~~~ 

Which compiles in css to:

~~~ css
.icoFacebook {  
	background-image: url("../img/spritesheet.png");  
	background-position: -65px 0px;  
	width: 28px;  
	height: 28px;  
	display: inline-block;  
}  
~~~  

We should note that the names of the variables generated in the file `sprites.styl` are the same names as the .png files found in the `img/sprite` path.

