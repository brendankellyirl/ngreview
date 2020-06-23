## Update Angular

- npm install -g @angular/cli@latest
- npm install -g @angular/cli@next

## Check version

- ng --version

## Update NPM

- npm install -g npm

## Install ScullyIO

- npm install -g npm

## Setup Source Control

- git clone https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/wol-jamstack
- git add --all
- git commit -m "initial commit"
- git push https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/wol-jamstack --all

## Handy Component Commands

- ng g m home --routing=true && ng g c home --skip-tests=true -m=home
- ng g m about --routing=true && ng g c about --skip-tests=true -m=about
- ng g m user --routing=true && ng g c user --skip-tests=true -m=user && ng g c users --skip-tests=true -m=user

## Web Share API Wrapper

- allows app to use native sharing options
- npm install --save ng-navigator-share

## Google Maps

- create key
- add JS script to index.html file
- add type = npm i @types/googlemaps
- update tsconfig.app.json to include googlemaps type
- ensure to include CSS
