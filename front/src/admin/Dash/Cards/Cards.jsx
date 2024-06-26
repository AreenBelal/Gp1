import React from "react";
import "./Cards.css";
import { cardsData } from "../Data";

import Card from "../Card/Card";

const Cards = () => {
  return (
    <div className="Cardsadmin">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContaineradmin" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
