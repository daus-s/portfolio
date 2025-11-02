import "../styles/styles.css";
import "../styles/cardlist.css";
import "../styles/header.css";
import "../styles/linklist.css";
import "../styles/projectcard.css";
import "../styles/spacer.css";

import ProjectCard from "./ProjectCard";
import Spacer from "./Spacer";
import { useEffect, useState } from "react";
import { ttHtml } from "../../utils/html/transform";

export default function CardList() {
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("bio");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();

        setBio(ttHtml(text));
      } catch (_) {}
    };
    fetchData();
  }, []);

  return (
    <div className="CardList">
      <ProjectCard
        title="Biography"
        description={bio}
        date="February 2000"
        image="/graduation.jpg"
        altDescription="Hey, I'm Daus, welcome to my website! I will continue to add new projects as I work on them!"
      />
      <Spacer height="20px" />
      <ProjectCard
        title="betties.app"
        description="betties.app is a social-betting site for you to place bets on random events: any time, any place. It was built with Next.JS on top of a supabase database with a fully implemented security suite. It has social features to find groups in addition to historical data, to track your bets over time. betties.app is an all-in-one website to place bets with friends."
        link="https://www.betties.app"
        date="OPEN NOW"
        image="/greenbook.jpg"
        altDescription="betties.app is a social-betting site for you to place bets on random events: any time, any place."
      />
      <Spacer height="20px" />
      <ProjectCard
        title="Wordle"
        description="The wordle app I created is a Command line-based app that takes uses User input to solve the wordle problem for the day. I have not yet lost with the code. The code uses a file of valid guesses as well as valid words to create the possible words that could be used in wordle. Then the user inputs into the command line interface the word chosen and the results (the black, yellow, green values). These correspond to where the letters in the guessed word go. If you are not familiar with the game, if the letter returns black then that letter does not exist in the word, if it is yellow it exists in that word but not in that index, if the letter is green that letter exists in that spot. "
        link="/wordle"
        date="January 2022"
        image="/wordlebot.png"
      />
      <Spacer height="20px" />
      <ProjectCard
        title="Desmos Algebra"
        description="The inspiration for this project came from a place of boredom. While working on intro-level physics problems for my job as an SI, I soon realized that I was often solving the same equation over and over. I would simply be solving for different variables. So, I used desmos to write the equation out and get the values that the students were given.  I would get the final result of the question very easily but I still had to rewrite the equation. If I were able to write the equations necessary for one problem could I plug in the values and find all of the answers for the problems?"
        link="https://github.com/daus-s/desmos-algebra"
        date="December 2022"
        image="/desmos_ad.png"
        altDescription="This is a project that created a mathematical language. The code uses Haskell, BNFC, Java, and Rust for the main computational work."
      />
      <Spacer height="20px" />
      <ProjectCard
        title="Tic Tac Toe"
        description="I created a Tic Tac Toe game on stream. I used react to build the project. Without errors, the computer will not lose. Additionally by toggling the computer first play switch you can watch the algorithm play itself. It will never lose to itself. The game as stated before has 1-person and 2-person functionality. "
        link="/tictactoe"
        date="July 2023"
        image="/tictactoe.PNG"
        altDescription="I built a tic-tac-toe game this blob serves as a link to the game. Enjoy!"
      />
      <Spacer height="20px" />
      <ProjectCard
        title="Optics"
        description="This is a book containing 6 topics in optics. It describes the fundamental math of each topic as well as the lab practice we used. The book includes diagrams, mathematics, pictures, and written descriptions. The 6 topics are reflection and refraction, telescopes, microscopes, power and polarization of light, lasers, and diffraction. "
        link="/OpticsBook.pdf"
        date="May 2022"
        image="/optics.PNG"
        altDescription="In Optics Lab we had an assignment in which we were to create chapters throughout the semester. We would then compile them together to create our books. Each chapter covers a physical phenomenon and a laboratory experiment to test it."
      />
      <Spacer height="20px" />
      <ProjectCard
        title="Internet Addiction Presentation"
        description="In my technical communications course our group was assigned an issue prevalent to college students (our audience). Our group researched internet addiction and misuse and determined it to be a worthwhile topic to inform our class on. This class is a CS/CE and SE major requirement. CS majors had naturally higher levels of dependence on the internet and so informing them on healthy internet use was more important than it may be for other groups on campus. This presentation has a test to determine the 'level' of internet addiction one is experiencing. This test is not necesarily indicative of your actual level of addiction but it does give a baseline. Feel free to take the test, the results will be uploaded to a dataset and will be completely anonymous. The team that worked on this project included me (Daus), Benjamin Kahn, Keoni Lanoza, Moises Lopez. "
        link="/ImprovingInternetUseTCM.pdf"
        date="April 2022"
        image="/TCMMidtermQR.PNG"
        altDescription="This is the technical communications midterm. It is a presentation on improving internet use. There is an anonymous self-reporting quiz to determine your level of internet addiction. This test is not necesarily indicative of your actual level of addiction but it does give a baseline. Team: Benjamin Kahn, Daus Carmichael, Keoni Lanoza, Moises Lopez."
      />
    </div>
  );
}
