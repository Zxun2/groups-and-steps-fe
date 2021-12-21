# CVWO Riding on Rails 2021/2022 - 📝 [Groups and Steps](https://cvwo-groups-and-steps.netlify.app/)

<div id="#top"></div>

|     Name     | Matriculation Number |
| :----------: | :------------------: |
| Lee Zong Xun |      A0233594Y       |

## Application details

![image](https://user-images.githubusercontent.com/63457492/146907275-c48e3b2f-b5b9-4eb6-ae60-7dcad107ff2f.png)


### Tutorial account details for Web app :

|       Email        | Password |
| :----------------: | :------: |
| tutorial@gmail.com |  foobar  |


## Overview

Groups and Steps 📝 is a web application built using Rails and React for CVWO 2021/2022 assignment. It allows you to manage your tasks into groups, and further break them down into steps.

## Architecture

This application adopted the use of MVC architecture for the backend and the Flux architecture for the frontend.

### A short comparison between the Flux and MVC Architecture.
Flux application has 3 major parts: the dispatcher, the store and the view.

**The Store:** State manager, can be changed by listening to actions. It notifies the views to update.

**The View:** It renders the user interface and handles user interaction. Container views listen for store changes.

**The Dispatcher:** It broadcasts actions to all registered stores.

---

The MVC is an acronym for Model View Controller.

**Model:** It is a backend that includes all the data logic.

**View:** View is basically the frontend or graphical user interface of the application.

**Controller**: The brains of the application that controls how data is displayed.

<p align="right">(<a href="#top">Back to top</a>)</p>

## Tech Stacks

1. Ruby on Rails
2. React ( Javascript)
3. Postgresql Database
4. Material UI

<p align="right">(<a href="#top">Back to top</a>)</p>

## Database Choice and design

- PostgreSQL (Implemented with Rails)
- Schema
  ![image](https://user-images.githubusercontent.com/63457492/146906786-f87c195a-74c2-413c-979d-e338609309ea.png)


- Modeling relationship
  ![CVWO Groups and Steps Database Schema](https://user-images.githubusercontent.com/63457492/146906856-70dbc3fe-fe29-4c5f-97d7-a31835928f93.png)

  

<p align="right">(<a href="#top">Back to top</a>)</p>

## Use Cases and User Stories

### User Story

| User Story             |                                                                                                                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| User Story Description | As an app user, I would like to use the application as a central knowledge and task management platform. So that i can plan my tasks effectively and efficiently.                                                                    |
| Acceptance Criteria    | Build a task management application to allow real-time tasks updates and management. Allow users to perform basic CRUDs functionalities, a tagging system to categorise tasks and a search functionality to navigate between groups. |
| Notes                  | CRUDS functionality is dependent on API availability & integration.                                                                                                                                                                  |

Use Cases:
![image](https://user-images.githubusercontent.com/63457492/146907228-43150454-c105-4985-9978-2ec01b28dc06.png)

<p align="right">(<a href="#top">Back to top</a>)</p>

## Reflection

Overall, i had a lot of fun developing this application. While i had prior experience in web developmenet, i have not worked with Ruby on Rails before. Therefore, the majority of my time spent was in familiarizing with the Rails' syntax, browsing through documentation and developing the backend. Setting up the environment was also not easy, and i had to troubleshoot many of these issues with the help of Stack Overflow. Adopting the MVC architecture for the backend and Flux architecture for the frontend has opened my eyes to the different software engineering paradigms, in particular, the concept of state management. Using Redux has made it incredibly easy to keep track of app-wide state with a single source of truth.

This assigment has allowed me to further hone my knowledge in web development and i hope i can gain even more by joining CVWO this coming summer.

<p align="right">(<a href="#top">Back to top</a>)</p>

## Suggestions for improvements

1. Implement other ancuillary enhancements such as deadlines and user statistics
2. Introduce testing
3. Notification Timelines (Complements current notification system)
<p align="right">(<a href="#top">Back to top</a>)</p>

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request.

<p align="right">(<a href="#top">Back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">Back to top</a>)</p>

To be continued...
