const Hero = () => {
  return (
    
    <div
      className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 pt-4"
    >
      <h3 className="flex items-end gap-2 text-xl md:text-2xl mb-3">
        Welcome to Hakomerch ✨
      </h3>
      <h1 className="text-2xl sm:text-6xl lg:text-[62px]">
        Your ultimate destination for custom K-pop merchandise!
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Discover exclusive K-pop merch inspired by your favorite idols.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <a
          href="/create"
          className="px-10 py-3 border border-white bg-gray-950 hover:bg-gray-800 text-white flex item-center gap-2"
        >
          Create a Product
        </a>
        <a
          href="/collections"
          className="px-10 py-3 border border-gray-900 hover:bg-lightHover flex item-center gap-2"
        >
          Browse Collections
        </a>
      </div>
    </div>
  );
};

export default Hero;
