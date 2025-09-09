import clsx from "clsx";
import React from "react";
import styled from "styled-components";

const Switch = ({
  onChange,
  checked,
  className,
}: {
  onChange: (on: boolean) => void;
  checked?: boolean;
  className?: string;
}) => {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  const randomInt = Math.floor(Math.random() * 10000);

  return (
    <span className={className || ""}>
      <StyledWrapper className="flex items-center justify-center">
        <div className="cyber-toggle-wrapper">
          <input
            className="cyber-toggle-checkbox"
            id={"cyber-toggle" + randomInt}
            type="checkbox"
            onChange={handleToggle}
            checked={checked}
            suppressHydrationWarning
          />
          <label
            className="cyber-toggle"
            htmlFor={"cyber-toggle" + randomInt}
            suppressHydrationWarning
          >
            <div className="cyber-toggle-track">
              <div className="cyber-toggle-track-glow" />
              <div className="cyber-toggle-track-dots">
                <span className="cyber-toggle-track-dot" />
                <span className="cyber-toggle-track-dot" />
                <span className="cyber-toggle-track-dot" />
              </div>
            </div>
            <div className="cyber-toggle-thumb">
              <div className="cyber-toggle-thumb-shadow" />
              <div className="cyber-toggle-thumb-highlight" />
              <div className="cyber-toggle-thumb-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={clsx("bi bi-sun", {
                    block: !checked,
                    hidden: checked,
                  })}
                  viewBox="0 0 16 16"
                >
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={clsx("bi bi-moon", {
                    hidden: !checked,
                    block: checked,
                  })}
                  viewBox="0 0 16 16"
                >
                  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                </svg>
              </div>
            </div>
            <div className="cyber-toggle-particles">
              <span className="cyber-toggle-particle" />
              <span className="cyber-toggle-particle" />
              <span className="cyber-toggle-particle" />
              <span className="cyber-toggle-particle" />
            </div>
          </label>
        </div>
      </StyledWrapper>
    </span>
  );
};

const StyledWrapper = styled.div`
  .cyber-toggle-wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .cyber-toggle-checkbox {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .cyber-toggle {
    position: relative;
    display: inline-block;
    width: 64px;
    height: 32px;
    cursor: pointer;
  }

  .cyber-toggle-track {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #111;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), inset 0 0 4px rgba(0, 0, 0, 0.8);
    transition: all 0.4s cubic-bezier(0.3, 1.5, 0.7, 1);
  }

  .cyber-toggle-track::before {
    content: "";
    position: absolute;
    inset: 2px;
    border-radius: 14px;
    background: #222;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    z-index: 0;
    transition: all 0.4s ease;
  }

  .cyber-toggle-track-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, #03e9f4, #4a00e0);
    opacity: 0;
    border-radius: 16px;
    z-index: 1;
    transition: all 0.4s ease;
  }

  .cyber-toggle-thumb {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 24px;
    height: 24px;
    background: #151515;
    border-radius: 50%;
    z-index: 2;
    transition: all 0.4s cubic-bezier(0.3, 1.5, 0.7, 1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  }

  .cyber-toggle-thumb-shadow {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.1),
      transparent 70%
    );
    z-index: 1;
  }

  .cyber-toggle-thumb-highlight {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(
      circle at 70% 70%,
      rgba(0, 0, 0, 0.2),
      transparent 70%
    );
    z-index: 1;
  }

  .cyber-toggle-thumb-icon {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    opacity: 0.7;
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  .cyber-toggle-thumb-icon svg {
    width: 14px;
    height: 14px;
    fill: #ffd41c;
    transition: fill 0.4s ease, transform 0.4s ease;
  }

  .cyber-toggle-track-dots {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
    z-index: 1;
  }

  .cyber-toggle-track-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #ffd41c;
    margin-left: 3px;
    opacity: 0.5;
    transition: all 0.4s ease;
  }

  .cyber-toggle-particles {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .cyber-toggle-particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: #03e9f4;
    border-radius: 50%;
    opacity: 0;
    filter: blur(1px);
    transition: all 0.3s ease;
    box-shadow: 0 0 4px rgba(3, 233, 244, 0.8);
  }

  .cyber-toggle-particle:nth-child(1) {
    top: 15%;
    right: 20%;
  }

  .cyber-toggle-particle:nth-child(2) {
    top: 45%;
    right: 30%;
  }

  .cyber-toggle-particle:nth-child(3) {
    top: 25%;
    right: 40%;
  }

  .cyber-toggle-particle:nth-child(4) {
    top: 60%;
    right: 15%;
  }

  /* Stati attivi */
  .cyber-toggle-checkbox:checked + .cyber-toggle .cyber-toggle-track-glow {
    opacity: 0.5;
  }

  .cyber-toggle-checkbox:checked + .cyber-toggle .cyber-toggle-thumb {
    left: calc(100% - 28px);
    background: #222;
  }

  .cyber-toggle-checkbox:checked + .cyber-toggle .cyber-toggle-thumb-icon {
    transform: rotate(360deg);
  }

  .cyber-toggle-checkbox:checked + .cyber-toggle .cyber-toggle-thumb-icon svg {
    fill: #03e9f4;
  }

  .cyber-toggle-checkbox:checked + .cyber-toggle .cyber-toggle-track-dot {
    background: #03e9f4;
    box-shadow: 0 0 4px #03e9f4;
    opacity: 1;
  }

  .cyber-toggle-checkbox:checked ~ .cyber-toggle-labels .cyber-toggle-label-on {
    color: #03e9f4;
    text-shadow: 0 0 5px rgba(3, 233, 244, 0.5);
  }

  .cyber-toggle-checkbox:not(:checked)
    ~ .cyber-toggle-labels
    .cyber-toggle-label-off {
    color: #aaa;
  }

  /* Animazione particelle quando attivo */
  .cyber-toggle-checkbox:checked + .cyber-toggle .cyber-toggle-particle {
    opacity: 1;
    animation: cyber-toggle-float 3s infinite alternate;
  }

  .cyber-toggle-checkbox:checked
    + .cyber-toggle
    .cyber-toggle-particle:nth-child(1) {
    animation-delay: 0s;
  }

  .cyber-toggle-checkbox:checked
    + .cyber-toggle
    .cyber-toggle-particle:nth-child(2) {
    animation-delay: 0.5s;
  }

  .cyber-toggle-checkbox:checked
    + .cyber-toggle
    .cyber-toggle-particle:nth-child(3) {
    animation-delay: 1s;
  }

  .cyber-toggle-checkbox:checked
    + .cyber-toggle
    .cyber-toggle-particle:nth-child(4) {
    animation-delay: 1.5s;
  }

  /* Effetto hover */
  .cyber-toggle:hover .cyber-toggle-track::before {
    background: #272727;
  }

  .cyber-toggle:hover .cyber-toggle-thumb {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  }

  .cyber-toggle-checkbox:checked
    + .cyber-toggle:hover
    .cyber-toggle-track-glow {
    opacity: 0.7;
  }

  /* Effetto focus per accessibilità */
  .cyber-toggle-checkbox:focus + .cyber-toggle {
    outline: none;
  }

  .cyber-toggle-checkbox:focus + .cyber-toggle::after {
    content: "";
    position: absolute;
    inset: -4px;
    border-radius: 20px;
    border: 2px solid rgba(3, 233, 244, 0.5);
    opacity: 0.5;
  }

  @keyframes cyber-toggle-float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default Switch;
