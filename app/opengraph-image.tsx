import { ImageResponse } from "next/og";

// Image metadata
export const alt = "My site";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          display: "flex",
          background:
            "linear-gradient(90deg,rgba(255, 255, 255, 1) 5%, rgb(7, 138, 48))",
        }}
      >
        <div
          style={{
            display: "flex",
            margin: "100px 0px",
          }}
        >
          {/* eslint-disable */}
          <img
            src="https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfJ3lqInC5xrIX2q0NoPUDlZ9HBF8zYept7OCV"
            style={{
              padding: "40px",
            }}
            width="555"
            height="430"
            alt="Opengraph Image"
          ></img>
          {/* eslint-enable */}
          <div
            style={{
              fontSize: 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                borderLeft: "3px solid black",
                padding: "30px",
                color: "white",
              }}
            >
              Scott Gilbert
            </div>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
