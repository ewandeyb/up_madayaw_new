import Image from 'next/image'
import up from '../../components/img/upmin.jpg'
export default function About(){
  return (
    <>
        <section className="w-full bg-gray-100 py-10 dark:bg-gray-800 min-h-[400px]">
          <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 text-upcolor">
                About Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Vision and Mission</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                For the <span className=" text-up">Nation</span> For the People!
                </p>
              </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-upcolor">Vision</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                      The UPMMPC is a model University Cooperative with members attaining an improved quality of life.
                      </p>
                    </div>
                </li>
                <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-upcolor">Mission</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                      The UPMMPC is a University Cooperative with a mission to provide quality service and sustainable socio-economic activities responsive to the needs of the members and the general public. In pursuit of this mission, the UPMMPC is committed to the spirit ofcooperativism, loyalty and honesty as a way of life.
                      </p>
                    </div>
                </li>
                </ul>
              </div>
              <Image
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src= {up}
                width="550"
              ></Image>
          </div>
          </div>
        </section>
    </>
  )
}