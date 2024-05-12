"use client";

import React, { useEffect, useRef } from "react";
import p5 from "p5";
import * as Manim from "../node_modules/Manim.js/Manim";

const ManimScene = () => {
  const ref = useRef(null);

  useEffect(() => {
    console.log("Manim module contents:", Manim); // Logs the content of the Manim module

    const sketch = (p) => {
      let tnr, g;

      p.preload = () => {
        tnr = p.loadFont(
          "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff"
        );
      };

      p.setup = () => {
        p.createCanvas(1200, 675).parent(ref.current);
        const G = {
          V: [
            [100, 200],
            [260, 100],
            [260, 300],
            [420, 200],
          ],
          E: [
            [0, 1],
            [0, 2],
            [1, 2],
            [1, 3],
            [2, 3],
          ],
        };
        g = new Manim.Graph_U(p, {
          V: G.V,
          E: G.E,
          font: tnr,
          start: 40,
          color_e: [7, 97, 7],
          color_v: [255, 204, 0], // Assuming Yellow is similar to RGB (255, 204, 0)
        });
      };

      p.draw = () => {
        p.background(0);
        g.show();
      };
    };

    new p5(sketch);
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100%" }}></div>;
};

export default ManimScene;
