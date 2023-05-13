import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex title">
        Fitts Law
      </div>
      <div
        className="button-container"
        style={{
          margin: "3em",
        }}
      >
        <Link href="#aboutSection" className="button">
          About
        </Link>
        <Link href="/page1" className="button">
          Fitts Law 1D
        </Link>
        <Link href="/page2" className="button">
          Fitts Law 2D
        </Link>
      </div>

      <Image
        src="/Dhirubhai_Ambani_Institute_of_Information_and_Communication_Technology_logo.png"
        style={{
          margin: "2em",
        }}
        width={200}
        height={300}
        alt="daiict is great"
      />

      <section id="aboutSection" className="needforspeed">
        <h2>About Section</h2>
        <Image
          src="/fitts.jpeg"
          style={{
            border: "1px solid grey",
            margin: "1em",
            borderRadius: "1em",
          }}
          width={400}
          height={400}
          alt="fitts law baby"
        />
        <p className="texty">
          The equation states that the time required to move to a target is
          influenced by the distance to the target and the size of the target.
          The larger the target and the closer it is to the starting point, the
          faster the movement time. Fitts' Law is often applied in user
          interface design to optimize the placement and size of interactive
          elements such as buttons, icons, and links. By following the
          principles of Fitts' Law, designers can create interfaces that are
          easier and more efficient to use, especially in scenarios where quick
          and accurate pointing tasks are required. It's important to note that
          Fitts' Law is a simplification and approximation of human movement and
          doesn't account for all factors that may affect pointing performance,
          such as user experience, motor control capabilities, or cognitive
          load. However, it provides valuable insights and guidelines for
          designing user interfaces that consider the human factors involved in
          pointing tasks.
        </p>
      </section>

      <div></div>
      <p>Submission for HCI project by TEAM Innovative X</p>
    </main>
  );
}