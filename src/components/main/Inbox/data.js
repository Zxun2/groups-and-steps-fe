const steps = [
  {
    label: "Welcome to the application!",
    description: `
    When you enter the application for the first time, you will be prompted to log in with your credentials. Once authorized, you will be assigned a JWT token that will be saved in your local storage. This token is important for you to access other portions of the application as well as subsequent access during the lock-in period. 
    
    The Lock-in duration is 24 hours.
    `,
  },
  {
    label: "Groups",
    description: `To view your groups, simply open the sidebar (it should already be opened by default, unless you're on mobile then you'll be required to click on the hamburger menu on the top left corner of your screen). Enter the title of your group at the bottom of the screen to create a new group. 
    
    To delete or update a group, click on the settings icon beside the Group's title and a modal component similar to the one you're currently viewing will appear. 
    
    Follow the instructions there.
    `,
  },
  {
    label: "Steps",
    description: `
    Now, let's try creating our first step. If there are no current steps, then you should see a placeholder SVG (credits to Undraw.io) as well as a prompt to create a new step. Enter your step into the input box on the left, add any tags you wish to have on the right and navigate back to the left input box and press ENTER. 
    
    To complete your task, navigate to the vertical floating icon on the top right of the card, click on it and indicate that you wish to complete the task.

    Finally, to delete or update the step, click on the icon just right below the vertical floating icon and follow the instructions there!
    `,
  },
  {
    label: "Final Word",
    description: `My name is Zong Xun, a current computer science undergraduate at NUS. This is my first major application. I hope you like it! Also, do take the time to browse through the application. Who knows, you might find something!
    `,
  },
];

export default steps;
