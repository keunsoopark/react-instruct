
Install create-react-app  
`(sudo) npm install -g create-react-app`  

Initiate react package setup  
- Create a repository first (ex. `react-app`)  
Inside the repository, `create-react-app .`  

Run the web app for development mode  
`npm start`

To build the web app for production mode  
`npm run build`  
Use files in `/build` for service

Install `serve`  
- `serve` for serving your web app with a static server
`(sudo) npm install -g serve`

Serve web app with using files in `/build`  
`serve -s build`

Code in App.js is not JavaScript code. If you run this in the console, error occurs.  
What happens behind the scene is our code is made in JSX, a language created by Facebook, and `create-react-app` converts it to JS code.  
