import React from "react";
import styled from "styled-components";
import { services } from "../../utils/constants";
import "../../breakpoint.scss";

const Services = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <div className="up">
          <h3>
            Custom Furniture <br /> Built Only For You
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            dolorum debitis consectetur reprehenderit non aliquam voluptates
            dolore aut vero consequuntur.
          </p>
        </div>
        <div className="down">
          {services.map((servis) => {
            return (
              <div className="card" key={`${servis.id}`}>
                <div className="icon">{servis.icon}</div>
                <h3 className="title">_{servis.title}</h3>

                <p className="desc">{servis.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default Services;

const Wrapper = styled.div`
  padding: 5rem 0rem;
  background: var(--clr-primary-10);

  .up {
    display: flex;
    flex-direction: column;
    h3 {
      margin-bottom: 1.5rem;
    }
    p {
    }
  }

  .down {
    display: grid;
    place-items: center;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    .card {
      background: var(--clr-primary-7);
      text-align: center;
      padding: 2.5rem 2rem;
      border-radius: var(--radius);
      margin-top: 2rem;
      .icon {
        width: 4rem;
        height: 4rem;
        display: grid;
        margin: 0px auto 1rem;
        place-items: center;
        border-radius: 50%;
        background: var(--clr-primary-10);
        color: var(--clr-primary-1);
        font-size: 2rem;
      }
    }
  }

  @media (min-width: 992px) {
    .section-center {
      position: relative;
      height: 30vh;
    }
    .up {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      h3 {
        color: red;
        font-size: 2.4rem;
        color: var(--clr-primary-2);
      }
      p {
        display: flex;
        flex-basis: 40%;
      }
    }
    .down {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      position: absolute;
    }
  }
`;
