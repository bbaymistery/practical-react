import React from "react";
import { useGlobalContext } from "../context/context";

const Stories = ({ stories }) => {
  const { handleRemove } = useGlobalContext();
  return (
    <>
      {stories.map((story) => {
        const { title, url, points, num_comments, author, objectID } = story;
        return (
          <article className="story" key={objectID}>
            <h4 className="title">{title}</h4>
            <p className="info">
              {points} <span>{author} | </span> {num_comments}
            </p>
            <div>
              <a
                href={url}
                className="read-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                read more
              </a>
              <button
                className="remove-btn"
                onClick={() => handleRemove(objectID)}
              >
                remove
              </button>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default Stories;
