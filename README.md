#Installation / Build projet

Installer le projet et builder le code

    git clone <this project> folder-name
    cd folder-name
    yarn install
    npm run build

Lancer un serveur de dev (serve) cf: https://www.npmjs.com/package/serve

    yarn serve

Visiter :
 - Local:  <a href="https://localhost:5000">https://localhost:5000</a>
 
 - Sur Réseau Interne (remplacez par votre IP machine): http://xxx.xx.xx.xxx:5000

###Utiliser l'appli sur serveur

#### Avec Docker

Builder l'image Docker :

    docker build --tag appli .
    
Lancer l'image Docker (Exemple: port 1000 pour une image appelée appli)

    docker run -d --name appliSuper -p 1000:80 appli
    
L'appli est accessible à ces addresses (selon votre installation Docker)

Docker For Desktop (Windows / MacOs) / Docker Native (Linux): 
- <a href="http://127.0.0.1:1000">http://127.0.0.1:1000</a>

Docker Toolbox (VM Boot2Docker) : 
- <a href="http://192.168.99.100:1000">http://192.168.99.100:1000</a>

#### Sans Docker

Extension Chrome Wevb Server (légère et pratique)
https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/related

Serveur Apache.. 

Serveru Nginx...