import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const IntroductionPage = () => {
  return (
    <div>
      <section
        className="hero bg-cover bg-center text-white py-24 mt-5"
        style={{ backgroundImage: "url(../../healthy-hands.jpg)" }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">
            Empowering Hong Kong's Ethnic Minorities
          </h1>
          <p className="mt-4 text-lg">
            Through outreach, opportunity, and systemic change.
          </p>
          <Button className="mt-6 text-white px-4 py-2 rounded">
            Learn More
          </Button>
        </div>
      </section>

      <section className="about py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">About The Zubin Foundation</h2>
          <p className="mt-4 text-md">
            Founded in 2009, The Zubin Foundation is dedicated to improving the
            lives of Hong Kong’s ethnic minorities by reducing suffering and
            providing opportunities.
          </p>
          <p className="mt-4 text-md">
            With over 16,000 individuals impacted through our programs, we
            strive for racial equality and systemic change.
          </p>
        </div>
      </section>

      <section className="programs py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Our Programs</h2>
          <div className="flex flex-wrap justify-center mt-8">
            {[
              "Women & girls",
              "Economic Opportunity",
              "Family Resources",
              "Mental Health",
              "Emergency Relief",
            ].map((program) => (
              <div key={program} className="w-1/5 p-4">
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <Image
                    src={`/${program.toLowerCase().replaceAll(" ", "-")}.jpg`}
                    alt={program}
                    className="h-12 mx-auto"
                    width={100}
                    height={130}
                  />
                  <h3 className="mt-4 text-xl font-bold">{program}</h3>
                  <p className="mt-2 text-sm">
                    Brief description of the {program} program.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta bg-gray-100 py-16 text-white text-center">
        <h2 className="text-3xl font-bold text-black">
          Get Involved with The Zubin Foundation
        </h2>
        <p className="mt-4 text-black">
          Register for events, volunteer your time, and help us make a
          difference in the community.
        </p>
        <div className="flex justify-center mt-8">
          <Link href="/main/events">
            <Button className="mx-2 bg-black text-white">View Events</Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-800 py-6 text-white text-center">
        <p className="text-sm">
          © 2024 The Zubin Foundation. All rights reserved.
        </p>
        <div className="social-links mt-4">
          <a
            href="https://www.facebook.com/zubinfoundation"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <Image
              src="/path-to-icon/facebook.png"
              alt="Facebook"
              className="h-6 inline-block mx-2"
              width={100}
              height={100}
            /> */}
          </a>
          <a
            href="https://www.twitter.com/zubinfoundation"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <Image
              src="/path-to-icon/twitter.png"
              alt="Twitter"
              className="h-6 inline-block mx-2"
              width={100}
              height={100}
            /> */}
          </a>
        </div>
      </footer>
    </div>
  );
};

export default IntroductionPage;
