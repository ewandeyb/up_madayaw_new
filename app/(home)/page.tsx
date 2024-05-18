import { Button } from "@/components/ui/button";
import Header from "../../components/Header"
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <section className="flex flex-grow p-4 items-center justify-center text-center flex-col gap-6 bg-gray-100">
        <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold text-black "><span className="text-upcolor font-sans">UP Madayaw</span> Multi-Purpose Cooperative</h1>
        <p className="text-lg text-black">Empowering communities through sustainable development.</p>
        <Button size="sm" variant="up" className= "text-white font-bold border ">
            <a href="/apply">Apply Now</a>
        </Button>
      </section>
    </div>
  );
}
