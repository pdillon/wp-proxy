# wp-proxy

A module and command line app for proxying requests to a remote web site. 
Designed for supporting Node.js layers on top of existing Wordpress sites, but could be used for any site.

## Installation

    npm install wp-proxy
    
## Global Installation

    npm install -g wp-proxy 

## Options

- ```--port``` Local server port. Defaults to 3000.
- ```--destination``` Destination host.
- ```--static``` Optional static path.

## Usage

As command line app:

    wp-proxy --destination="https://wordpress.org"
    
## Notice

Proxying to WP admin is not supported. Primarily for public requests.

    