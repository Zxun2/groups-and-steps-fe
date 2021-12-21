# CVWO Riding on Rails 2021/2022 - 📝 [Groups and Steps](https://cvwo-groups-and-steps.netlify.app/)

<div id="#top"></div>

|     Name     | Matriculation Number |
| :----------: | :------------------: |
| Lee Zong Xun |      A0233594Y       |

---

<span color="red"> IMPORTANT! Please take note of the following: </span>

### Tutorial account details for Web app :

|       Email        | Password |
| :----------------: | :------: |
| tutorial@gmail.com |  foobar  |

---

## Overview

Groups and Steps 📝 is a web application built using Rails and React for CVWO 2021/2022 assignment. It allows you to manage your tasks into groups, and further break them down into steps.

## Architecture

This application adopted the use of MVC architecture for the backened and the Flux architecture for the frontend.

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
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/74f08995-0f18-4d7f-90aa-2c7463cae55c/Untitled.png)

- Modeling relationship
  ![CVWO Groups and Steps Database Schema.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c210cf7a-8d2c-4642-bf60-b18c2c99d3bf/CVWO_Groups_and_Steps_Database_Schema.png)

<p align="right">(<a href="#top">Back to top</a>)</p>

## Use Cases and User Stories

### User Story

| User Story             |                                                                                                                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| User Story Description | As an app user, I would like to use the application as a central knowledge and task management platform. So that i can plan my tasks effectively and efficiently.                                                                    |
| Acceptance Criteria    | Build a task management application to allow real-time tasks updates and management. Allow users to perform basic CRUDs functionalities, a tagging system to categorise tasks and a search functionality to navigate between groups. |
| Notes                  | CRUDS functionality is dependent on API availability & integration.                                                                                                                                                                  |

Use Cases:
![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/63b02d36-8313-4d70-b2c8-f2dc2684dbfe/Untitled.png)

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

## Application details

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fc5fec97-7471-43db-833f-4b3e1451f838/Untitled.png)

<p align="right">(<a href="#top">Back to top</a>)</p>

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request.

<p align="right">(<a href="#top">Back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">Back to top</a>)</p>

To be continued...
