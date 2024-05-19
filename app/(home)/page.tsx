import { Button } from "@/components/ui/button";
import Header from "../../components/Header"
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <section className="flex flex-col min-h-screen bg-gray-100"> 
      <section className="flex flex-grow p-4 items-center justify-center text-center flex-col gap-6">
        <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold text-black "><span className="text-upcolor font-sans">UP Madayaw</span> Multi-Purpose Cooperative</h1>
        <p className="text-lg text-black">Empowering communities through sustainable development.</p>
        
          <Button size="sm" variant="up" className="text-white font-bold border mr-2">
            <a href="/apply">Apply Now</a>
          </Button>
          
      </section>
    </section>
  );
}
