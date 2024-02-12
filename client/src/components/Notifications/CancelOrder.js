import { Link } from "react-router-dom";

export default function CancelOrder() {
  return (
    <>
      <main className="relative lg:min-h-full">
        <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
          <img
            src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-hero.jpg"
            alt="TODO"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div>
          <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
            <div className="lg:col-start-2">
              <h1 className="text-sm font-medium text-indigo-600">
                Payment can not received!
              </h1>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Payment has been canceled
              </p>
              <p className="mt-2 text-base text-gray-500">
                We are sorry for the experience, if you have any questions,
                please let us know <b>support@asd.com</b>
              </p>

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <Link
                  to="/"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
