import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';

import CEPDescription from '@/components/pages/projects/CEPDescription';
import PartnerWithUs from '@/components/pages/projects/PartnerWithUs';
import ProjectsList from '@/components/pages/projects/ProjectsList';

const projects = [
  {
    title:
      'Haptic Vision: Accessible Robotic Technology for the Blind and Low Vision',
    category: 'Robitics, Project Development',
    description:
      'Haptic Vision is an accessible technology developer focused on creating robotic solutions to help Blind and Low Vision (BLV) individuals interact with the digital world. The project involves developing a software solution that can automatically convert 2D user interfaces, such as websites, into real-time digital 3D models. This software will run on low-power computing equipment and use either an AI system or classical programming techniques. The 3D model will be updated in real-time within a Unity environment and integrated with the company’s existing robotic prototypes and haptic displays. The final deliverable is a software that can capture a screen, convert the content into a 3D model, and physically represent it through robotic hardware controlled by an Arduino system. The project spans 6-8 months, with a focus on screen capture, element detection, 3D model conversion, and robotic integration.',
    status: 'current',
    img: '/projects/HapticVision.jpg',
  },
  {
    title: 'Finliti Corporation: Designing a Card Dealer',
    category: 'Kubernetes & Software Integration',
    description:
      'Finliti, a fintech innovator focused on gamified financial products, is seeking a team to design and prototype a compact card dealer. This device needs to handle up to 160 cards, remain stable on a 15-degree incline, and have a sleek, "Apple-like" design. The final deliverables include CAD models and drawings with key dimensions, a functional prototype (3D-printed, laser-cut, or hybrid), and documentation of design decisions. The project spans 6-8 months and requires skills in mechanical design, prototyping, and human-centered design. The prototype should also have a secure discard box and be tested for usability and mechanical reliability',
    status: 'current',
    img: '/projects/Finliti.png',
  },
  {
    title: 'Nodalli AI: Contact Monitoring and Hygiene System',
    category: 'Automation Development',
    description:
      'Nodalli is a platform that uses AI-powered automation to make professional networking more accessible and efficient. The project, named "Ecoguard," is to build a standalone contact monitoring and hygiene system to ensure ethical and effective outreach. The system will act as an "immune system" for Nodalli\'s networking ecosystem, flagging bounces, eliminating duplicate records, and scoring contacts based on engagement. The team will design an API-integratable service that accepts raw contact data, applies rules and scoring, and returns a cleaned list. A key feature is the ability to automatically organize contacts into sub-CRM groupings like "High-Value Prospects" or "Do Not Contact". The project is expected to span 6-8 months and will involve creating an initial prototype, a beta version, and the final deliverable, which includes a lightweight dashboard for admins.',
    status: 'current',
    img: '/projects/Nodalli.png',
  },
  {
    title: 'Smart CashBackTV: AI-Powered TV Commercial Detection',
    category: 'Automation Development',
    description:
      'Smart CashBackTV is a company that enables local small and medium-sized businesses to leverage targeted TV advertising. The project involves developing an automated system to detect, classify, and tag advertisements in real-time/pre-recorded TV content. This will involve using various audio/video processing methods and AI techniques. The team will create a "plug and play" software solution that can run on a PC or server, automatically timestamping TV advertisements and categorizing them as either a known or new advertisement. The system will also have a simple user interface for monitoring metrics and manually confirming new advertisements. Additionally, the team will assist in integrating this system into an Android application. The project timeline spans 6-8 months, covering everything from understanding existing systems to developing the AI and a user interface.',
    status: 'current',
    img: '/projects/SmartCashBackTV.jpg',
  },
  {
    title: 'Nouvelle Strategies: Rebranding and CRM Development',
    category: 'Project Development',
    description:
      'Nouvelle Strategies is a Toronto-based creative and political communications agency specializing in strategy and digital marketing. The project supports two parallel priorities as the company enters a new growth phase: a rebrand for U.S. market expansion and the development of a scalable CRM system. Student teams will provide engineering-based solutions, combining business strategy and software development. Final deliverables include a comprehensive U.S. market entry strategy, a rebranding toolkit, a custom CRM prototype, and an implementation roadmap. The CRM prototype is expected to be lightweight and modular, built with open-source tools like Django/React and PostgreSQL. The engagement will involve two parallel teams—one for business strategy and one for internal development—with the overall project lasting 6-8 months.',
    status: 'current',
    img: '/projects/NouvelleStrategies.jpg',
  },
  {
    title: 'DalTRAC Lab: Traffic and Pedestrian VR Simulation',
    category: 'VR Development',
    description:
      "DalTRAC, a transportation research facility, is looking for a team to build a Unity simulation of traffic and pedestrian flow along Toronto's Bay Street Corridor. The project's goal is to create a virtual environment with interactive capabilities for both gaming and VR. Students will develop a virtual environment that includes streets, crosswalks, sidewalks, and buildings, and then represent the flow of traffic, pedestrians, and bikes. A key component is to develop and examine scenarios, particularly those involving open fire and man-made disasters, to analyze how participants react. The final deliverables include the simulation environment and code, a technical report, and the dataset collected during scenario examinations. The project is expected to last for eight months and requires skills in C#, Unity, and data analysis.",
    status: 'current',
    img: '/projects/DalTRAC.jpg',
  },
  {
    title: 'Deep Pixel',
    category: 'Generative AI, Project Development',
    description:
      "Developing a Generative AI product that enhances children's education and entertainment experiences while ensuring digital protection and prioritizing the overall wellbeing of the user.",
    status: 'past',
    img: '/projects/DeepPixel.png',
  },
  {
    title: 'Green Speaking',
    category: 'Website Design',
    description:
      "Enhancing the design and user experience of the company's website. The team increased the visual appeal and user-friendliness of the website while enhancing its search engine through effective SEO practices, including keyword use and content strategy.",
    status: 'past',
    img: '/projects/GreenSpeaking.png',
  },
  {
    title: 'Nodalli',
    category: 'Automation Development',
    description:
      "Delivered a fully functional and deployable automation tool that replaces the company's manual process of searching contacts on Apollo.io, scrapping additional data with Apify, and exporting the results into Excel, ultimately facilitating job search.",
    status: 'past',
    img: '/projects/Nodalli.png',
  },
  {
    title: 'University Health Network (UHN)',
    category: 'Data Analysis',
    description:
      "Developed a comprehensive data tool to assess and visualize the cumulative environmental benefits of the company's sustainability initiatives over the past decade.",
    status: 'past',
    img: '/projects/UHN.png',
  },
  {
    title: 'Finliti',
    category: 'Kubernetes & Software Integration',
    description:
      "Integrating Kubernetes API into the company's system and developed a backtester that analyzes effectiveness of investment strategies.",
    status: 'past',
    img: '/projects/Finliti.png',
  },
  {
    title: 'Mobile Mailing App',
    category: 'App Development',
    description:
      "Developed a fully functional calendar app (both iOS and Android) within the company's existing Mailing app - with functionalities including event creation, editing, invites etc.",
    link: 'https://apps.apple.com/app/id1588848488',
    status: 'past',
    img: 'https://plus.unsplash.com/premium_photo-1682309526815-efe5d6225117?q=80&w=1512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Fine-Tuning Functions',
    category: 'Coding & 3D Modelling',
    description:
      'Delivered a functioning C# coding script in Unity 3D that would allow the company to fine-tune the CAD model for a 3D-printed plastic limb socket for patient prosthetics.',
    status: 'past',
    img: 'https://images.unsplash.com/photo-1484662020986-75935d2ebc66?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Online Shopping Platform',
    category: 'Web Development',
    description:
      'Developed a web-based shopping platform using Django/React, the team built a full stack system that handles database integrations, user management, authentication, product listings, searching, etc.',
    status: 'past',
    img: 'https://images.unsplash.com/photo-1668854249355-a3f7dc316d02?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'ESG Investment Insights',
    category: 'CSR, Finance',
    description:
      "Developed a prototype measurement and reporting system to track ESG initiatives' impact. Provided actionable recommendations to stimulate investment and enhance ROI for sustainable alternatives.",
    status: 'past',
    img: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Coffee Grading with ML',
    category: 'AI & Machine Learning',
    description:
      'Developed a Computer Vision System using an image processing and supervised learning algorithm, supported by a hardware system that was used for coffee bean grading.',
    status: 'past',
    img: 'https://images.unsplash.com/photo-1692299108318-5a6650eb6ae7?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Carbon Sequestration',
    category: 'Environment, Data Analytics',
    description:
      'Reviewed multiple methods of carbon sequestration from research papers, and empirical methods for determining carbon levels. Developed a calculator that estimates the carbon dioxide released from vegetation.',
    status: 'past',
    img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
] as const;

export default function Projects() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Container>
          <CEPDescription />
          <ProjectsList projects={projects} />
          <PartnerWithUs />
        </Container>
      </main>
      <Footer />
    </>
  );
}
