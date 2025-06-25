import Image from "next/image";

const Vision = () => {
  return (
    <section className="w-full bg-custom  dark:bg-gray-900 min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="https://d502jbuhuh9wk.cloudfront.net/orgData/65c77500e4b0d8a03ab0fa90/pages/assets/images/ogfvs74165874824.jpg"
                alt="Vision illustration showing technology integration"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Overlay gradient for better text contrast if needed */}
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Our Vision
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8"></div>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                At Kudam, we envision a world where technology seamlessly
                integrates with daily life, enhancing productivity and
                creativity.
              </p>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                We strive to empower individuals and businesses through
                innovative solutions that simplify tasks and foster
                collaboration.
              </p>
            </div>

            {/* Call to action or additional elements */}
            {/* <div className="pt-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Innovation
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Collaboration
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Simplicity
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
