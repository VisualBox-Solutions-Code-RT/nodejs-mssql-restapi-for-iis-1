# node-rest-mssql

Ignore this. This is specific to my server as I'm deploying node to iis.

Steps in deploying node to IIS:

1. Install nodejs/url rewrite on the iis server.
2. Install iisnode from https://github.com/tjanczuk/iisnode
3. Go to iisnode installation folder and run setupsamples.bat. If localhost/node is giving a proper response page, then its working fine.
4. Go to inetmgr.
5. Click 'Add Website' and type in correct details for the app.
6. Make sure the ApplicationPool has proper access (read, write (if required)) to the project folder.
7. Enjoy.
