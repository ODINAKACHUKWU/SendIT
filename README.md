# SendIT

https://travis-ci.org/ODINAKACHUKWU/SendIT.svg?branch=develop

This is a courier service that helps users deliver parcels to different destinations. SendIT provides courier quotes based on weight categories.

# Features

<ul>
  <li>Users can create an account and log in.</li>
  <li>Users can create a parcel delivery order.</li>
  <li>Users can change the destination of a parcel delivery order.</li>
  <li>Users can cancel a parcel delivery order.</li>
  <li>Users can see the details of a delivery order.</li>
  <li>Admin can change the status and present location of a parcel delivery order.</li>
</ul>

# List of API endpoints for this application 

<ul>
  <li>GET /parcels</li>
  <li>POST /parcels</li>
  <li>GET /parcels/:id</li>
  <li>PUT /parcels/:id/cancel</li>
  <li>PUT /parcels/:id/destination</li>
  <li>GET /users/:id/parcels</li>
  <li>GET /users/:id/parcels/deliver</li>
  <li>POST /users</li>
  <li>GET /users</li>
  <li>GET /users/:id</li>
  <li>PUT /parcels/:id/deliver</li>
  <li>PUT /parcels/:id/location</li>
</ul>

# CRUD functionalities of the API endpoints for this application

<ul>
  <li><b>GET /parcels:</b> fetches all parcel delivery orders created by the user.</li>
  <li><b>POST /parcels:</b> creates a new parcel delivery order.</li>
  <li><b>GET /parcels/:id:</b> fetches a parcel delivery order with its id.</li>
  <li><b>PUT /parcels/:id/cancel:</b> cancels a particular delivery order if it has not been delivered. This functionality is reserved for the user who created the parcel delivery orer.</li>
  <li><b>PUT /parcels/:id/destination:</b> updates the destination of a parcel delivery order if it has not been delivered or cancelled. This functionality is reserved for the user who created the parcel delivery order.</li>
  <li><b>GET /users/:id/parcels:</b> fetches all parcel delivery orders by a particular user with the user's id.</li>
  <li><b>GET /users/:id/parcels/deliver:</b> fetches all delivered parcels of a particular user with the user's id.</li>
  <li><b>POST /users:</b> creates a new user account.</li>
  <li><b>GET /users:</b> fatches all users.</li>
  <li><b>GET /users/:id:</b> fetches a particular user with user's id.</li>
  <li><b>PUT /parcels/:id/deliver:</b> updates the status of a parcel delivery order to delivered if it has not been either delivered or cancelled. This functionality is specifically reserved for an admin user.</li>
  <li><b>PUT /parcels/:id/location:</b> updates the location of a parcel delivery order if it has not been either delivered or canccelled. This functionality is reserved for an admin user.</li>
</ul>



# Link to the deployed application

https://solomon-sendit-api.herokuapp.com/

