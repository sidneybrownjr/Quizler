const Footer = () => {
  return (
    <footer className="h-auto flex justify-center items-end text-gray-200 text-xs xl:text-xl py-2 text-center">
      <div className="w-full">
        <hr className="mb-1 opacity-25" />
        Created by{" "}
        <a
          className="hover:text-blue-400"
          target="_blank"
          rel="noreferrer"
          href="https://sidneybrownjr.com"
        >
          Sidney
        </a>{" "}
        with{" "}
        <a
          className="hover:text-blue-400"
          target="_blank"
          rel="noreferrer"
          href="https://opentdb.com/"
        >
          OpenTriviaDB
        </a>
        .
      </div>
    </footer>
  );
};

export default Footer;