import "./styles.css";
import "./app.css";
import "./cardlist.css";
import "./data.css";
import "./header.css";
import "./linklist.css";
import "./projectcard.css";
import "./spacer.css";

import ProjectCard from "./ProjectCard";
import Spacer from "./Spacer";

export default function CardList() {
  return (
    <div className="CardList">
      <ProjectCard
        title="Biography"
        description="My name is Davis Carmichael, although I go by Daus. (exclusively). I graduated from Chapman University in December 2022 with 2 degrees; one a Bachelor's of Science Degree in Physics, and the other a Bachelor's of Science in Computer Science. I competed in track and field and cross country in college. I am from Issaquah in Washington State. This meant the outdoors became a very important part of my life. I loved running on the trails in the hills as well as snowboarding in the mountains 45 minutes from home. I grew up very interested in science and my curiosity has yet to leave me. I am always looking to learn and figure out more and more. As I explained, with more and more problems, I will continue to add projects I complete here."
        date="February 2000"
        image="https://github.com/daus-s/portfolio/blob/main/graduation.jpg?raw=true"
        altDescription="Hey, I'm Daus, welcome to my website! I will continue to add new projects as I work on them!"
      />
      <Spacer height="20px" />
      <ProjectCard
        title="Desmos Algebra"
        description="The inspiration for this project came from a place of boredom. While working on intro-level physics problems for my job as an SI, I soon realized that I was often solving the same equation over and over. I would simply be solving for different variables. So, I used desmos to write the equation out and get the values that the students were given.  I would get the final result of the question very easily but I still had to rewrite the equation. If I were able to write the equations necessary for one problem could I plug in the values and find all of the answers for the problems?"
        link="https://github.com/daus-s/desmos-algebra"
        date="December 2022"
        image="https://github.com/daus-s/portfolio/blob/main/DesmosImage.PNG?raw=true"
        altDescription="This is a project that created a mathematical language. The code uses Haskell, BNFC, Java, and Rust for the main computational work."
      />
      <Spacer height="20px" />
      <ProjectCard
        title="Porter: Figma App"
        description="During the summer of 2022, I was taking one of my final classes to complete my computer science degree. The class; Human-Computer Interaction. Our final project was to create a prototype of an app that was not limited by the technology that would solve our section's problem. Our problem was loneliness. My immediate thought was, well teleportation could solve that. So I created an app mocking an interface with a teleporter. We did crowd research in our class and user feedback using Maze."
        link="https://www.figma.com/proto/35WCXSng2SdXXfTNkjWLef/porter?node-id=1%3A2&starting-point-node-id=1%3A2"
        date="Summer 2022"
        image="https://github.com/daus-s/portfolio/blob/main/PorterFigma.PNG?raw=true"
        altDescription="This project was for HCI a class I took at Chapman. The focus was to solve loneliness. We were not bound by any technological restraints, we were given the ability to dream and explain why our prototype would solve this problem."
      />
      <Spacer height="20px" />
      <ProjectCard
        title="Optics"
        description="This is a book containing 6 topics in optics. It describes the fundamental math of each topic as well as the lab practice we used. The book includes diagrams, mathematics, pictures, and written descriptions. The 6 topics are reflection and refraction, telescopes, microscopes, power and polarization of light, lasers, and diffraction. "
        link="/OpticsBook.pdf"
        date="May 2022"
        image="https://raw.githubusercontent.com/daus-s/portfolio/7c08561234e92a580d7a1fea34a8fb3ea0615e23/OpticsImage.jpg"
        altDescription="In Optics Lab we had an assignment in which we were to create chapters throughout the semester. We would then compile them together to create our books. Each chapter covers a physical phenomenon and a laboratory experiment to test it."
      />
      <ProjectCard
        title="Internet Addiction Presentation"
        description="In my technical communications course our group was assigned an issue prevalent to college students (our audience). Our group researched internet addiction and misuse and determined it to be a worthwhile topic to inform our class on. This class is a CS/CE and SE major requirement. CS majors had naturally higher levels of dependence on the internet and so informing them on healthy internet use was more important than it may be for other groups on campus. This presentation has a test to determine the 'level' of internet addiction one is experiencing. This test is not necesarily indicative of your actual level of addiction but it does give a baseline. Feel free to take the test, the results will be uploaded to a dataset and will be completely anonymous. The team that worked on this project included me (Daus), Benjamin Kahn, Keoni Lanoza, Moises Lopez. "
        link="/ImprovingInternetUseTCM.pdf"
        date="April 2022"
        image="https://raw.githubusercontent.com/daus-s/portfolio/main/TCMMidtermQR.PNG"
        altDescription="This is the technical communications midterm. It is a presentation on improving internet use. There is an anonymous self-reporting quiz to determine your level of internet addiction. This test is not necesarily indicative of your actual level of addiction but it does give a baseline. Team: Benjamin Kahn, Daus Carmichael, Keoni Lanoza, Moises Lopez."
      />
      <Spacer height="20px" />
      <ProjectCard
        title="Wordle"
        description="The wordle app I created is a Command line based app that takes uses User input to solve the wordle problem for the day. I have not yet lost with the code. The code uses a file of valid guesses as well as valid words to create the possible words that could be used in wordle. Then the user inputs into the command line interface the word chosen and the results (the black, yellow, green values). These correspond to where the letters in the guessed word go. If you are not familiar with the game, if the letter returns black then that letter does not exist in the word, if it is yellow it exists in that word but not in that index, if the letter is green that letter exists in that spot. "
        link="https://github.com/daus-s/wordle"
        date="January 2022"
        image="https://raw.githubusercontent.com/daus-s/portfolio/main/WordleImage.png"
        altDescription="I am incredibly competitive and hate losing. So I wrote code to solve wordle for me. I don't consider it cheating because I wrote the code."
      />
      <Spacer height="20px" />
      <ProjectCard
        title="Physics-Diff Eq"
        description="This is a python based lab in which a differential equation was given and the purpose was to explore as much as possible about the equation. It is a jupyter-noteboook report. The project was to take a set of equations given to us and plot them with varying parameters. It was very interesting to see how the initial conditions could have such an effect on the behavior."
        link="/Final.html"
        date="Fall 2021"
        image="https://github.com/daus-s/portfolio/blob/main/FinalImage.PNG?raw=true"
        altDescription="One of the first projects I've been proud of. In my Junior year of college we were given a set of mystery ODEs (ordinary differential equations) and our task was to look at their behavior with different initial conditions."
      />
      <Spacer height="20px" />
    </div>
  );
}
