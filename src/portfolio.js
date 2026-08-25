/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Christopher Tela",
  title: "Hello World, I'm Chris!",
  subTitle: emoji(
    "I'm a passionate full-stack Software Developer 🚀, who is currently diving into the depths of the tech world! I'm currently interested in software development, AI/Machine Learning, Cybersecurity, & Data Analytics!"
  ),
  resumeLink:
    "https://drive.google.com/file/d/1tJECy7j2JGC5eVRkAPwcyPIhqOuWEhC-/view?usp=sharing",
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/chris-tela",
  linkedin: "https://www.linkedin.com/in/christopher-tela/",
  gmail: "telachristopher4@gmail.com",
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "Some of my skills!",
  subTitle: "",
  skills: [
    emoji(
      "⚡ Developing full-scale solutions for real-world problems"
    ),
    emoji("⚡ Proficient in Python, TypeScript, JavaScript, React, Java, C#, C/C++, SQL, and Node.js"),
    emoji(
      "⚡ Experienced in full-stack development, test automation (Playwright, Selenium, xUnit), and CI/CD pipelines"
    ),
    emoji(
      "⚡ Building with modern stacks including Next.js, FastAPI, Supabase, Docker, and Kubernetes"
    )
  ],


  softwareSkills: [
    {
      skillName: "html-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "css3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "C",
      fontAwesomeClassname: "fab-solid fa-c"
    },
    {
      skillName: "git",
      fontAwesomeClassname: "fab-brands fa-git"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Western University",
      logo: require("./assets/images/western_university.png"),
      subHeader: "Bachelor of Science, Honours Specialization in Computer Science",
      duration: "September 2023 - April 2028",
      desc: "Relevant Courses:",
      descBullets: [
        "COMPSCI 2210: DATA STRUCTURES & ALGORITHMS",
        "COMPSCI 2211: SOFTWARE TOOLS & SYSTEMS PROGRAMMING",
        "COMPSCI 2209: APPLIED LOGIC FOR COMP SCI",
        "COMPSCI 2208: INTRO TO COMPUTER ORGANIZATION & ARCHITECT",
        "COMPSCI 2212: INTRO TO SOFTWARE ENGINEERING",
        "MATH 2155: DISCRETE MATHEMATICS",
        "COMPSCI 1027: INTRO TO OBJECT ORIENTATED PROGRAMMING"
      ]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: false, //Set it to true to show Proficiency Section

  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Software Developer and QA Intern",
      company: "Trojan Technologies",
      companylogo: require("./assets/images/trojantechnologies.png"),
      date: "May 2025 – May 2026",
      desc: "Built automation frameworks and CI/CD pipelines for hardware product validation",
      descBullets: [
        "Cut initial hardware testing time by 60% with a C# automation framework integrating Modbus RTU, RS232/RS485, TCP, and MQTT device protocols",
        "Built and administered Jenkins CI/CD pipelines gating merges on xUnit test runs, linting, and build verification with 80% coverage",
        "Automated infrastructure provisioning through the Proxmox VE API, cloning LXC containers and managing test environments"
      ]
    },
    {
      role: "Full-Stack Developer",
      company: "Western Developer's Society",
      companylogo: require("./assets/images/western_dev_society_logo.jpg"),
      date: "September 2024 – April 2025",
      desc: "Worked on a Council Management project, where we are developing a application to automate speaking order, attendance tracking, and voting processes to increase meeting efficiency",
      descBullets: [
        "Collaborated with a team to design and implement a full-stack solution using React Native, Express, Node.js, SQL, and JavaScript",
        "Integrated a dynamic backend with a complete database to ensure secure and efficient handling of attendance, voting data, and speaking order"
      ]
    },
    {
      role: "Back-End Developer",
      company: "Western Tech for Social Impact",
      companylogo: require("./assets/images/techforsocialimpact_logo.jpg"),
      date: "September 2024 – April 2025",
      desc: "Worked on a Social Service Accessiblity application, enabling easy access to various social services such as food bank, homeless shelters, etc.",
      descBullets: [
        "Integrated third-party APIs for real-time data updates, including service hours, capacity, and emergency alerts, improving the app's ability to serve users in critical need",
        "Created and maintained database schemas using PostgreSQL to store information on social services, including locations, contact details, and operational hours"
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: false // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Personal Projects",
  subtitle: "SOME OF THE PROJECTS THAT I CREATED",
  projects: [
    {
      image: require("./assets/images/nhlwordle.png"),
      projectName: "NHL Wordle",
      projectDesc: "A player guessing game where you make guesses on the mystery player based on information from previous guesses. The game is built using Python as the backend, FastAPI as the API framework, and React as the frontend.",
      footerLink: [
        {
          name: "Visit Github",
          url: "https://github.com/chris-tela/nhlapi"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      //image: require("./assets/images/nextuLogo.web"),
      projectName: "Credit Card Fraud Detector",
      projectDesc: "A credit card fraud detector that uses machine learning to detect fraudulent transactions. The model is built using Python and Scikit-learn & has achieved a accuracy of 96%. ",
      footerLink: [
        {
          name: "Visit Github",
          url: "https://github.com/chris-tela/creditcard-fraud"
        }
      ]
    },
    {
      image: require("./assets/images/nuzlocke.jpg"),
      projectName: "Pokemon Nuzlocke Tracker",
      projectDesc: "A full-stack Nuzlocke run tracker with 1,500+ users and 15,000+ page views. Features JWT session handling for Google OAuth, offline-first functionality using IndexedDB, and automatic sync on reconnect.",
      footerLink: [
        {
          name: "Visit Github",
          url: "https://github.com/chris-tela/nuzlocke-tracker"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  // title: emoji("Achievements And Certifications 🏆 "),
  // subtitle:
  //   "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  // achievementsCards: [
  //   {
  //     title: "Google Code-In Finalist",
  //     subtitle:
  //       "First Pakistani to be selected as Google Code-in Finalist from 4000 students from 77 different countries.",
  //     image: require("./assets/images/codeInLogo.webp"),
  //     imageAlt: "Google Code-In Logo",
  //     footerLink: [
  //       {
  //         name: "Certification",
  //         url: "https://drive.google.com/file/d/0B7kazrtMwm5dYkVvNjdNWjNybWJrbndFSHpNY2NFV1p4YmU0/view?usp=sharing"
  //       },
  //       {
  //         name: "Award Letter",
  //         url: "https://drive.google.com/file/d/0B7kazrtMwm5dekxBTW5hQkg2WXUyR3QzQmR0VERiLXlGRVdF/view?usp=sharing"
  //       },
  //       {
  //         name: "Google Code-in Blog",
  //         url: "https://opensource.googleblog.com/2019/01/google-code-in-2018-winners.html"
  //       }
  //     ]
  //   },
  //   {
  //     title: "Google Assistant Action",
  //     subtitle:
  //       "Developed a Google Assistant Action JavaScript Guru that is available on 2 Billion devices world wide.",
  //     image: require("./assets/images/googleAssistantLogo.webp"),
  //     imageAlt: "Google Assistant Action Logo",
  //     footerLink: [
  //       {
  //         name: "View Google Assistant Action",
  //         url: "https://assistant.google.com/services/a/uid/000000100ee688ee?hl=en"
  //       }
  //     ]
  //   },

  //   {
  //     title: "PWA Web App Developer",
  //     subtitle: "Completed Certifcation from SMIT for PWA Web App Development",
  //     image: require("./assets/images/pwaLogo.webp"),
  //     imageAlt: "PWA Logo",
  //     footerLink: [
  //       {name: "Certification", url: ""},
  //       {
  //         name: "Final Project",
  //         url: "https://pakistan-olx-1.firebaseapp.com/"
  //       }
  //     ]
  //   }
  // ],
  display: false // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  // title: "Blogs",
  // subtitle:
  //   "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  // displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  // blogs: [
  //   {
  //     url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
  //     title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
  //     description:
  //       "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
  //   },
  //   {
  //     url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
  //     title: "Why REACT is The Best?",
  //     description:
  //       "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
  //   }
  // ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  // title: "TALKS",
  // subtitle: emoji(
  //   "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  // ),

  // talks: [
  //   {
  //     title: "Build Actions For Google Assistant",
  //     subtitle: "Codelab at GDG DevFest Karachi 2019",
  //     slides_url: "https://bit.ly/saadpasta-slides",
  //     event_url: "https://www.facebook.com/events/2339906106275053/"
  //   }
  // ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  // title: emoji("Podcast 🎙️"),
  // subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // // Please Provide with Your Podcast embeded Link
  // podcast: [
  //   "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  // ],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "",
  
  email_address: "telachristopher4@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
