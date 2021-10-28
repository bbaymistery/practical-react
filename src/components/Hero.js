import React from "react";

const Hero = ({ children, hero }) => {
  return <header className={hero}>{children}</header>;
};

export default Hero;

///if forgot props it will come true instedad of it
Hero.defaultProps = {
  hero: "defaultHero",
};
