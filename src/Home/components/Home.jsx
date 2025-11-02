import "../styles/styles.css";
import "../styles/cardlist.css";
import "../styles/header.css";
import "../styles/linklist.css";
import "../styles/projectcard.css";
import "../styles/spacer.css";

import Header from "./Header";
import CardList from "./CardList";
import LinkList from "./LinkList";

export default function Home() {
  return (
    <div className="Home">
      <Header />
      <LinkList />
      <CardList />
    </div>
  );
}