import Head from "../components/head";
import Nav from "../components/nav";

import Image from "next/image";

const Index = () => (
  <div>
    <Head title="About" />
    <Nav />
    <div className="hero">
      <h1 className="title">About</h1>
      <Image
        src="/ezgif-3-c5df985477a6.jpg"
        width="400"
        height="400"
        layout="fixed"
        alt="Profile Picture"
        quality="100"
      />{" "}
      <Image
        src="/ezgif-3-c5df985477a6.jpg"
        width="400"
        height="400"
        layout="fixed"
        alt="Profile Picture"
        quality="100"
      />
    </div>

    <div className="hero">
      <h1 className="title">About</h1>
      <Image
        src="/ezgif-3-c5df985477a6.jpg"
        width="400"
        height="400"
        layout="fixed"
        alt="Profile Picture"
        quality="100"
      />{" "}
      <Image
        src="/ezgif-3-c5df985477a6.jpg"
        width="400"
        height="400"
        layout="fixed"
        alt="Profile Picture"
        quality="100"
      />
    </div>

    <div className="hero">
      <h1 className="title">About</h1>
      <Image
        src="/ezgif-3-c5df985477a6.jpg"
        width="400"
        height="400"
        layout="fixed"
        alt="Profile Picture"
        quality="100"
      />{" "}
      <Image
        src="/ezgif-3-c5df985477a6.jpg"
        width="400"
        height="400"
        layout="fixed"
        alt="Profile Picture"
        quality="100"
      />
    </div>

    <div className="hero">
      <h1 className="title">About</h1>
      <Image
        src="https://cdn.pixabay.com/photo/2015/03/26/09/41/chain-690088_960_720.jpg"
        width="400"
        height="400"
        layout="fixed"
        alt="Profile Picture"
        quality="100"
      />{" "}
      <Image
        src="/ezgif-3-c5df985477a6.jpg"
        width="400"
        height="400"
        layout="fixed"
        alt="Profile Picture"
        quality="100"
      />
    </div>

    <div className="hero">
      <h1 className="title">About</h1>
      <Image
        src="https://cdn.pixabay.com/photo/2015/03/26/09/41/chain-690088_960_720.jpg"
        width="400"
        height="400"
        layout="fixed"
        alt="Profile Picture"
        quality="100"
      />{" "}
      <Image
        src="/ezgif-3-c5df985477a6.jpg"
        width="400"
        height="400"
        layout="fixed"
        alt="Profile Picture"
        quality="100"
      />
    </div>

    <div className="hero">
      <h1 className="title">About</h1>
      <Image
        src="https://cdn.pixabay.com/photo/2013/05/15/09/05/bridge-111326_640.jpg"
        width="400"
        height="400"
        layout="fixed"
        alt="Profile Picture"
        quality="100"
      />{" "}
      <Image
        src="/ezgif-3-c5df985477a6.jpg"
        width="400"
        height="400"
        layout="fixed"
        alt="Profile Picture"
        quality="100"
      />
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        padding-bottom: 12px;
        line-height: 1.15;
        font-size: 37px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 587px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
);

export default Index;
