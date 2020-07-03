## Project Ceres

![Project Image](public/logo192.png)

Grocery List sharing web app.

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
4. [Author Info](#author-info)  

---

## Description

The purpose of the web app is to enhance the experience of grocery shopping during the global COVID-19 pandemic. The app allows families to create grocery lists and share those lists with their “inner circle”, or tribe, of other families. This will help reduce traffic to grocery stores, by allowing one family member to shop for other families as well as their own. In addition to creating and sharing grocery lists there is a map view which  includes wait times for each grocery store. This allows the family member who is going shopping to choose the store with the least amount of wait time, or plan their trip for when the wait times are minimal.

#### Technologies

- [React.js](https://reactjs.org)
- [Bootstrap](https://getbootstrap.com)
- [React Leaflet](https://react-leaflet.js.org)
- [React Leaflet Search](https://www.npmjs.com/package/react-leaflet-search)

[Back To The Top](#project-ceres)

---

## Credentials

### User

User credentials are user/user.  
The user login will allow users to access the Map, Tribe, Grocery List and Profile pages of the app.

### Admin

Admin credentials are admin/admin.  
The admin login will allow users to access the Map, Tribe, Grocery List, Admin Settings and Profile pages of the app.

Note: Credentials are pretyped under user and password for this access level. This is for your convenience.

## How to Use

On accessing the website the user will be presented with the map view. This will allow for the general public to access the information on the map page, namely the wait times associated with grocery stores in their area. In order to access other areas of the site the user must log in by pressing the 'Login' button in the upper left hand corner of the website.

#### Map

This page can be accessed by clicking on either the Project Ceres title or 'Map' in the Navbar. This page will show a map with grocery cart icons indicating the different grocery stores. The user is able to search for their city, (Toronto and Mississauga are currently locateable) using the search bar in the right hand pane, and clicking on a store icon will populate the panel with the store information which includes the name, address, hours of operation and the wait time, (which will be entered by the logged in users of the app in the bottom of the panel).

> :warning: The wait time functions have not been implemented pending the implementation of the backend server portion of the website.

#### Tribe

This page will allow the user to select which tribe's grocery lists they will see. The left had side of the page shows the name of their family as well as the members. The right hand side of the page lists the tribes that thier familiy belongs to as well as the other families who are members of that tribe. By clicking on the tribe button for the desired tribe they will be taken to the grocery list page with the first list from that tribe selected.
_
> :bangbang: The 'Change Family' button was added for testing purposes to allow the grocery lists of other families to be selected and will be removed once the backend server has been implemented.

#### Grocery List

This page is the allows the users to see all the grocery lists associated with the families in their tribe. To select a list the user must click the button which contains that lists name. The user is able to create and delete lists, add new items with varying quantities to the lists as well as edit and delete items from lists.

> :warning: In the current iteration of the website the user can add and delete items to all of the lists as there is no association of lists to families yet. This will be implemented with the backend server as well.

#### Profile

This page will allow the user to change their email and password and will be the page that allows a non-admin user to join their family.

> :warning: These features have not yet been implemented.

#### Admin Settings

This page will only be available for admin users. The page will allow administrators to search for tribes, families and stores as well as add and delete tribes, families and stores. The right hand panel is where the data is entered to add new information and the left hand panel allows for search functions. As you type the autosuggest will filter all data that starts with what you entered. Clicking on the different tribe/family/store will show information in the bottom panel and allow the admin user to delete the selected data. Click on the search type (Family, Store or Tribe) to reload any changes you may have made such as deleting and adding new entries.

[Back To The Top](#project-ceres)

---

## Author Info

William Boyle

Owen Ng

Omar Shabana

[Back To The Top](#project-ceres)
