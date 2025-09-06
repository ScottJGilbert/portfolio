// "use client";

// import { motion, useScroll, useSpring, useTransform } from "motion/react";

// export default function Scroll({ children }: { children: React.ReactNode }) {
//   const { scrollYProgress } = useScroll();
//   const shift = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   // Map shift value (0-1) to an rgba string
//   const backgroundColor = useTransform(
//     shift,
//     (latest) => `rgba(13, 48, 27, ${latest})`
//   );

//   return (
//     <motion.div
//     // style={{
//     //   backgroundColor,
//     // }}
//     >
//       {children}
//     </motion.div>
//   );
// }
// // ...existing code...
