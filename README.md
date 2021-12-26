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

## Tech Stacks

1. Ruby on Rails
2. React (Javascript)
3. Postgresql Database
4. Material UI

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

|            Input            |                                                              Positive Response                                                               |           Negative response            |
| :-------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------: |
|       Create a group        |                             A new thread of steps will be created. User will be prompted to start on their step.                             | Unable to create group. Error message. |
|  Edit and Deleting a group  |                  Group's title will automatically be updated/deleted. All steps relevant to the group will also be deleted.                  |             Error message.             |
|        Create a step        |                                             User will begin to input steps to track their tasks.                                             | Unable to create step. Error message.  |
| Editing and Deleting a step |                                               Step's name will be updated/deleted accordingly.                                               |             Error message.             |
|      Search for groups      | If group exist, user will be directed to the page containing the group's infomation. Otherwise, user will be prompted to create a new group. |           No error message.            |
|        Filter steps         |     User will be able to filter the steps according to any keyword they typed in. Successful filters will filter the steps accordingly.      |           No error message.            |
|         Adding tags         |                                            Tags added will be placed right beside the input box.                                             |           No error message.            |

## Reflection

Creating this application has been a fantastic experience. While I have past experience in web development, I have never worked with Ruby on Rails. As a result, the majority of my time was spent learning Rails syntax, reading documentation, and constructing the backend. Setting up the environment was also difficult, and I had to use Stack Overflow to debug several of the difficulties. Adopting the MVC design for the backend and the Flux architecture for the frontend has opened up my eyes to the many software engineering paradigms, particularly the notion of state management. Using Redux has made it exceedingly simple to maintain track of app-wide state with a single source of truth.

This assignment has helped me to further hone my understanding of web programming, and I intend to acquire even more by joining CVWO this summer.

<p align="right">(<a href="#top">Back to top</a>)</p>

## Suggestions for improvements

1. Implement other ancuillary enhancements such as deadlines and user statistics
2. Introduce testing
3. Notification Timelines (Complements current notification system)

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">Back to top</a>)</p>
