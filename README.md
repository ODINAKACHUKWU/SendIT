# SendIT

[![Build Status](https://travis-ci.org/ODINAKACHUKWU/SendIT.svg?branch=develop)](https://travis-ci.org/ODINAKACHUKWU/SendIT)
[![Coverage Status](https://coveralls.io/repos/github/ODINAKACHUKWU/SendIT/badge.svg?branch=develop)](https://coveralls.io/github/ODINAKACHUKWU/SendIT?branch=develop)

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
  <li>POST /auth/signup</li>
  <li>POST /auth/login</li>
  <li>GET /parcels</li>
  <li>POST /parcels</li>
  <li>GET /parcels/:id</li>
  <li>PUT /parcels/:id/cancel</li>
  <li>PUT /parcels/:id/destination</li>
  <li>GET /users/:id/parcels</li>
  <li>GET /users</li>
  <li>GET /users/:id</li>
  <li>PUT /parcels/:id/status</li>
  <li>PUT /parcels/:id/presentLocation</li>
  <li>DEL /parcels/:id/delete</li>
  <li>PUT /users/:id/role</li>
  <li>GET /users/:id/all</li>
  <li>GET /users/:id/deliver</li>
  <li>GET /users/:id/pending</li>
  <li>PUT /users/:id/regular</li>
</ul>

# CRUD functionalities of the API endpoints for this application

<ul>
  <li><b>`POST /auth/signup`:</b> signs up a user.</li>
  <li><b>`POST /auth/login`:<b> logs in a user into the application.</li>
  <li><b>`GET /parcels`:</b> fetches all parcel delivery orders created by the user.</li>
  <li><b>`POST /parcels`:</b> creates a new parcel delivery order.</li>
  <li><b>`GET /parcels/:id`:</b> fetches a parcel delivery order with its id.</li>
  <li><b>`PUT /parcels/:id/cancel`:</b> cancels a particular delivery order if it has not been delivered. This functionality is reserved for the user who created the parcel delivery orer.</li>
  <li><b>`PUT /parcels/:id/destination`:</b> updates the destination of a parcel delivery order if it has not been delivered or cancelled. This functionality is reserved for the user who created the parcel delivery order.</li>
  <li><b>`GET /users/:id/parcels`:</b> fetches all parcel delivery orders by a particular user with the user's id.</li>
  <li><b>`GET /users`:</b> fatches all users.</li>
  <li><b>`GET /users/:id`:</b> fetches a particular user with user's id.</li>
  <li><b>`PUT /parcels/:id/status`:</b> updates the status of a parcel delivery order to delivered if it has not been either delivered or cancelled. This functionality is specifically reserved for an admin user.</li>
  <li><b>`PUT /parcels/:id/presentLocation`:</b> updates the location of a parcel delivery order if it has not been either delivered or canccelled. This functionality is reserved for an admin user.</li>
  <li><b>`DEL /parcels/:id/delete`:</b> deletes a parcel delivery order that has been either cancelled or delivered. This functionality is reserved for the user who created the parcel delivery order.</li>
  <li><b>`PUT /users/:id/role`:</b> updates the role of a user to Admin. This functionality is reserved for an admin user.</li>
  <li><b>`GET /users/:id/all`:</b> fetches the total of all parcel delivery orders created by a particular user with the user's id.</li>
  <li><b>`GET /users/:id/deliver`:</b> fetches the total of all parcel delivery orders created by a particular user that have been delivered.</li>
  <li><b>`GET /users/:id/pending`:</b> fetches the total of all parcel delivery orders created by a particular user that are yet to be delivered.</li>
  <li><b>`PUT /users/:id/regular`:</b> updates the role of a user to Regular. This functionality is reserved for an admin user.</li>
</ul>



# Links to the deployed application

<ul>
  <li>https://solomon-sendit-api.herokuapp.com/api/v1</li>
  <li>https://localhost:3100/api/v1</li>
  <li>https://odinakachukwu.github.io/SendIT/UI/index.html</li>
</ul>

