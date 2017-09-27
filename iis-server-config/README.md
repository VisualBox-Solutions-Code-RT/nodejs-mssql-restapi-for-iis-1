# node-rest-mssql

This 'iis-server-config' folder will not be part of the project folder. This is only for instructions.

Steps in deploying node to IIS:

1. Install [nodejs](https://nodejs.org/en/)/[URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite) on the iis server.
2. Install [iisnode](https://github.com/tjanczuk/iisnode) 
3. Go to the iisnode installation folder and run ```setupsamples.bat```. If ```http://localhost/node```(or check the cmd for ports use for the default web server) is giving a proper response page, then everything is still fine. You can also click the sample ``express`` app to see if URLrewrite is set up.
4. Go to inetmgr.
5. Create an app pool for ```iisnode```.
5. Click 'Add Website' and type in correct details(app pool, port, hostname) for the app you want to deploy.
6. Add the [web.config](https://github.com/jer8/node-rest-mssql/blob/master/iis-server-config/web.config) (with proper details) to the project's root folder. Check this folder's web.config for reference.
7. In case of any issues, make sure the ApplicationPool user (IIS_IUSR) has proper access (read, write (if required)) to the project folder.
8. Enjoy.

More info: https://tomasz.janczuk.org/2011/08/using-url-rewriting-with-nodejs.html
