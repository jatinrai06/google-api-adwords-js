# Introduction #

AdWords API Sandbox playground is a code example that shows how to use AdWords API Javascript library. This application allows you to write and execute Javascript code in your browser that makes calls against the AdWords API Sandbox.

# Source structure #

The AdWords API Sandbox playground is developed as an AppEngine Java project. The source code structure is as follows:

- src
> - com.google.ads.adwords.playground
> > - Java servlets for OAuth authentication, Proxying, etc.
- war

> - css
> - js
> > - awapi: AdWords API Javascript library
> > - codemirror: For syntax highlighted editor.
> > - jquery: For building the UI
> > - jstree: JQuery extension for building the left tree.

> - images
> - examples: Folder to hold the predefined code examples and indices.
> - WEB-INF
> > - lib: Folder to hold all the Java jars.
> > - appengine-web.xml
> > - web.xml
> > - index.jsp

# Running the sandbox playground #

To run the sandbox, you need to download and install the following software:

JAVA SDK:
ECLIPSE:
APPENGINE SDK: http://code.google.com/appengine/downloads.html#Google_App_Engine_SDK_for_Java

Now launch Eclipse, and install the Google Plugin for eclipse: http://code.google.com/appengine/downloads.html#Download_the_Google_Plugin_for_Eclipse

Now open the project in Eclipse. Build and run the project.

Now open a browser and navigate to the project. Click the login link to login into your Google account and authenticate the application to use AdWords API. Now pick any code example in the left tree to load it into the editor. Click the Run button to run the code example and display the results in the results box.

# Control flow #

To run the code examples against the AdWords API sandbox, the playground needs an initialized AdWords API sandbox account. It also requires a sandbox developer token. The playground can create one for the user; however it should know the user login email first. To get this, the application requires the user to login to their Google account first, and allow the playground access to the login email. If the user is not logged in, the playground uses AppEngine's UserService methods to create a login link. When the user clicks this link, (s)he is redirected to the Google Login page where the user logs in. Once done, Google requests the user's permission to allow the sandbox playground to access the user email. Once the user grants access, Google redirects the user back to the playground.

The playground now picks the currently logged-in user's email and tries to create a sandbox account on user's behalf.