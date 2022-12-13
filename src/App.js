import React from "react";
import profileImage from "./profile-image.jpg";

const ShineLink = props => {
  return (
    <a
      href={props.href}
      className="text-blue-500 hover:text-blue-600 font-bold py-2 px-4 rounded-full border-2 border-blue-500 hover:border-blue-600 transition duration-300 ease-in-out mr-2"
    >
      {props.text}
    </a>
  );
};

const ProfileDescription = () => {
  return (
    <div className="mt-5">
      <h1 className="text-2xl font-bold">Hi, I'm Gabriele</h1>
      <p className="mt-2 text-lg font-medium">
        I'm a full-stack web developer with experience in Python. I enjoy
        building modern and user-friendly web applications that solve real-world
        problems.
      </p>
    </div>
  );
};

const App = () => (
  <div className="bg-zinc-900 text-white min-h-screen">
    <div className="container mx-auto px-8 py-10">
      <div className="flex flex-col items-center">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full"
        />
        <h1 className="text-4xl font-bold mt-5">Gabriele Armento</h1>
        <p className="text-lg font-medium mt-2">Full-Stack Web Developer</p>
        <div className="flex mt-5">
          <ShineLink
            href="https://www.linkedin.com/in/gabrielearmento/"
            text="LinkedIn"
          />
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold">About Me</h2>
        <hr className="my-5 border-gray-500" />
        <ProfileDescription />
      </div>
    </div>
  </div>
);

export default App;
