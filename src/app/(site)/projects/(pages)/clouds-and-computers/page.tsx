import { getProjectMeta } from "@/lib/projects/content";
import { ProjectShell } from "../../components/project-shell";
import {
  CaseStudy,
  CodeSample,
  FlowDiagram,
  Highlights,
  Note,
} from "../../components/blocks";
import { projectMetadata } from "../../lib/metadata";

export const metadata = projectMetadata("clouds-and-computers");

export default function CloudsAndComputersPage() {
  const project = getProjectMeta("clouds-and-computers")!;

  return (
    <ProjectShell project={project}>
      <p>
        Clouds and Computers is my final project for “Exploring Quantum Science
        through the Arts,” an honors physics course at the University of
        Illinois. It is a small 3D game that lets you play with two ideas at
        once: how a quantum computer’s qubits behave, and what an electron in a
        hydrogen atom looks like. The state of your qubits drives the color and
        shape of a glowing orbital cloud, so abstract linear algebra turns into
        something you can see and move.
      </p>

      <Highlights
        items={[
          {
            label: "Quantum simulator",
            detail:
              "A 3-qubit state-vector simulator with 9 gates and measurement, written in plain NumPy with no quantum SDK.",
          },
          {
            label: "Hydrogen orbitals",
            detail:
              "Wavefunctions solved numerically from Laguerre polynomials and spherical harmonics, including superpositions of orbitals.",
          },
          {
            label: "Moving electron clouds",
            detail:
              "20,000 particles guided by Bohmian pilot-wave dynamics computed from the wavefunction.",
          },
        ]}
      />

      <h2>How it works</h2>
      <FlowDiagram
        title="From qubits to an orbital cloud"
        layout="column"
        steps={[
          {
            title: "Build a quantum state",
            detail:
              "Apply gates like Hadamard, Pauli, S, T, CNOT, and SWAP to a 3-qubit register",
          },
          {
            title: "Read the state out",
            detail:
              "Amplitudes become a direction and a color, and per-qubit superposition values are computed",
          },
          {
            title: "Save an orbital",
            detail:
              "The state selects hydrogen orbital quantum numbers (n, l, m) to add to the cloud",
          },
          {
            title: "Solve the wavefunction",
            detail:
              "Combine the saved orbitals and sample where the electron is most likely to be",
          },
          {
            title: "Animate the cloud",
            detail:
              "Move each particle along the velocity field the wavefunction implies",
          },
        ]}
      />

      <h2>The three pieces</h2>
      <h3>1. A quantum computer simulator</h3>
      <p>
        The register holds three qubits as eight complex amplitudes. Each gate
        is a small matrix, and the simulator expands it to act on the whole
        register using Kronecker (tensor) products, so a single-qubit gate on
        one qubit becomes an 8-by-8 operation on the full state. Measurement
        follows the Born rule: the squared magnitude of each amplitude is the
        probability of that outcome, and measuring picks one at random using
        those weights and collapses the state to it.
      </p>
      <CodeSample caption="Simplified: measurement picks an outcome using the Born rule, then collapses the state.">
        {`probabilities = abs(state) ** 2
probabilities /= probabilities.sum()
outcome = random_choice(len(state), p=probabilities)

state = zeros_like(state)
state[outcome] = 1.0`}
      </CodeSample>

      <h3>2. A hydrogen atom solver</h3>
      <p>
        For hydrogen-like atoms, the electron’s wavefunction splits into a
        radial part (an exponential times a generalized Laguerre polynomial) and
        an angular part (a spherical harmonic). The solver evaluates these with
        SciPy’s special functions for any valid choice of quantum numbers, and
        sums several orbitals to form superpositions. Squaring the magnitude of
        the result gives the probability density, and the points that make up
        the visible cloud are sampled where that density is high.
      </p>

      <h3>3. Making the electrons move</h3>
      <p>
        To animate the cloud, I used Bohmian (pilot-wave) mechanics, which gives
        each electron a definite path. The velocity at any point comes from the
        wavefunction’s probability current divided by its density. The code
        computes that field on a grid with numerical gradients, interpolates it
        at each particle’s position, and nudges every particle along it each
        timestep.
      </p>

      <h2>Engineering challenges</h2>
      <CaseStudy
        title="Visualizing complex math"
        problem="State space in quantum mechanics is a complex vector space, but it's hard to visualize naturally or understand intuitively as a result. A 3D representation would be helpful, but how do you convert 8 dimensions to 3?"
        action="I defined a mapping between quantum states and a 3D model of a hydrogen cloud. The register's values set orbital quantum numbers (n, l, m) and a color (in CMYK-style channels). What the player does to the qubits visibly changes the cloud, alongside a visible arrow that represents the actual state vector."
        result="One interface where gates, superposition, and orbitals respond to the same input."
      />
      <CaseStudy
        title="Making numerical physics robust"
        problem="Dividing by a probability density that is nearly zero in parts of the grid produces infinities and NaNs, and gradients behave badly at the edges of the cloud."
        action="The velocity calculation masks out regions where the density is effectively zero before dividing."
        result="The velocity field stays finite where the cloud is thin."
      />
      <CaseStudy
        title="Testing the physics outside the game engine"
        problem="Beta testing in the game engine, especially verifying the cloud simulations, is slow and cumbersome."
        action="I made a second, standalone version with a text menu and Matplotlib 3D animation that exercises the same gate, orbital, and velocity code."
        result="A faster way to check the simulation before wiring it into the game."
      />

      <Note title="Attributions">
        Large parts of the source code were produced with AI tools. The orbital particle approach in
        Blender builds on public CC0 code from the YouTuber Least.Action, and
        the music is “Echoes of the Void” by AudioPapkin from Pixabay.
      </Note>
    </ProjectShell>
  );
}
