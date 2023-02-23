import "./styles.css";
import "./app.css";
import "./cardlist.css";
import "./data.css";
import "./header.css";
import "./linklist.css";
import "./projectcard.css";
import "./spacer.css";

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