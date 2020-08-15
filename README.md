## [Project Ceres](https://projectceres.herokuapp.com)

![Project Image](client/public/logo192.png)

Grocery List sharing web app.

[https://projectceres.herokuapp.com](https://projectceres.herokuapp.com)

---

### Table of Contents

1. [Description](#description)  
2. [Credentials](#credentials)  
  2.1. [User](#user)  
  2.2. [Admin](#admin)
3. [How To Use](#how-to-use)  
  3.1. [Map](#map)  
  3.2. [Tribe](#tribe)  
  3.3. [Grocery Lists](#grocery-list)  
  3.4. [Profile](#profile)  
  3.5. [Admin Settings](#admin-settings) 
4. [Routes](#routes) 
5. [Author Info](#author-info)  

---

## Description

The purpose of the web app is to enhance the experience of grocery shopping during the global COVID-19 pandemic. The app allows families to create grocery lists and share those lists with their “inner circle”, or tribe, of other families. This will help reduce traffic to grocery stores, by allowing one family member to shop for other families as well as their own. In addition to creating and sharing grocery lists there is a map view which  includes wait times for each grocery store. This allows the family member who is going shopping to choose the store with the least amount of wait time, or plan their trip for when the wait times are minimal.

#### Technologies

Front End

- [React.js](https://reactjs.org)
- [Bootstrap](https://getbootstrap.com)
- [React Leaflet](https://react-leaflet.js.org)
- [React Leaflet Search](https://www.npmjs.com/package/react-leaflet-search)
- [JQuery](https://jquery.com)

Back End

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [mongoose](https://mongoosejs.com)
- [bcrypt](https://www.npmjs.com/package/bcryptjs)
- [validator](https://www.npmjs.com/package/validator)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cors](https://www.npmjs.com/package/cors)

[Back To The Top](#project-ceres)

---

## Credentials

### User

User credentials are user/user.  
The user login will allow users to access the Map, Tribe, Grocery List and Profile pages of the app.

### Admin

Admin credentials are admin/admin.  
The admin login will allow users to access the Map, Tribe, Grocery List, Admin Settings and Profile pages of the app.

### User#

There are other users who have been created with other levels admin privilege such as Family Admin and Tribe Admin to show how other features of the website will work. These users have be designated a user1 - user# with the password user#.

## How to Use

On accessing the website the user will be presented with the map view. This will allow for the general public to access the information on the map page, namely the wait times associated with grocery stores in their area. In order to access other areas of the site the user must log in by pressing the 'Login' button in the upper left hand corner of the website.

#### Map

This page can be accessed by clicking on either the Project Ceres title or 'Map' in the Navbar. This page will show a map with grocery cart icons indicating the different grocery stores. The user is able to search for their city, (Toronto and Mississauga are currently locateable) using the search bar in the right hand pane, and clicking on a store icon will populate the panel with the store information which includes the name, address, hours of operation and the wait time, (which will be entered by the logged in users of the app in the bottom of the panel).

#### Tribe

This page will allow the user to select which tribe's grocery lists they will see. The left had side of the page shows the name of their family as well as the members. The will also be a textbox which will allow family admins to invite users to their family. The right hand side of the page lists the tribes that thier familiy belongs to as well as the other families who are members of that tribe. By clicking on the tribe button for the desired tribe they will select the current tribe. This will allow the tribe admins to invite other users families to that tribe. For a regular user selecting the current tribe will allow them display a list of all of the grocery lists which belong to families in that tribe buy clicking the button at the bottom of the page.


#### Grocery List

This page is the allows the users to see all the grocery lists associated with the families in their tribe. To select a list the user must click the button which contains that lists name. The user is able to create and delete lists, add new items with varying quantities to the lists as well as edit and delete items from lists.

#### Profile

This page will have various functionality dependent on the state of the user. 

 1. A user with no family will be shown a "Create Family" dialog where they will be able to create a family, and will automatically be assigned to the family admin position.

 2. A user who has been invited to a family will be shown a "Join Family" where they will be able to either join or decline the invitation. A user may only be invited to one family at a time.

 3. A user who is a family admin will be shown a "Create Tribe" dialog where they will be able to create a tribe, and will automatically be assigned to the tribe admin position.

 4. A user who is a family admin and whose family has be invited to join a/many tribe(s) will be shown a dialog with a dropdown menu to select the tribe they would like to join or decline.

 5. A regular user who is part of a family but not an admin will be shown none of these dialogs.

 The change Email and Password dialog is not functional as of version 1.0. 

#### Admin Settings

This page will only be available for admin users. The page will allow administrators to search for tribes, families and stores as well as add and delete tribes, families and stores. The right hand panel is where the data is entered to add new information and the left hand panel allows for search functions. As you type the autosuggest will filter all data that starts with what you entered. Clicking on the different tribe/family/store will show information in the bottom panel and allow the admin user to delete the selected data. Click on the search type (Family, Store or Tribe) to reload any changes you may have made such as deleting and adding new entries.

[Back To The Top](#project-ceres)

---

## Routes

```
  Route: /users/login
  Method: POST
  Description: Sets the current user session cookie.
  URL Parameters: None
  Body: 
    {
      username: "username",
      password: "password"
    }
```
```
  Route: get("/users/logout"
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/users/check-session",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: post("/users", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: delete("/users",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: patch("/users", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/users", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/user/:uName", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/family", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/family/addtime/:id", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: post("/family", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: delete("/family", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: patch("/family", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: patch("/family/:fid", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/family/:fid", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: post("/family/addtime/:fid", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/family/users/:fid", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: patch("/family/join/:fid", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: patch("/family/decline/:fid", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: patch("/family/invite/:uid", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: post("/tribe",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: delete("/tribe", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: patch("/tribe", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/tribe/:tid", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/tribe/families/:tid", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/tribe/lists/:tName", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: patch("/tribe/join/:tid", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: patch("/tribe/decline/:tid",  
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: patch("/tribe/invite/:uid", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: post("/list", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/list/:fid", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: delete("/list", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: post("/item", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: patch("/item", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: delete("/item", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/MapList",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: post("/MapList",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: patch("/MapList",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: delete("/MapList",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: post("/MapList/:mid",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: patch("/MapList/:mid",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/City",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: post("/City", 
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/all",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/all/tribe",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: get("/all/family",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: post("/admin/family",
  Method:
  Description:
  URL Parameters:
  Body:
```
```
  Route: post("/admin/tribe",
  Method:
  Description:
  URL Parameters:
    Route: Body:
    Method:
```

  Description:
  URL Parameters:
  Body:
```ck To The Top](#project-cere```
s)

---

## Author Info

William Boyle

Owen Ng

Omar Shabana

[Back To The Top](#project-ceres)
