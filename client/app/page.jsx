import Homepage from "@/components/homepage/Homepage";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col gap-5 overflow-x-hidden">
      <Navbar />
      <div className="flex justify-center w-screen">
      <Homepage />
      </div>
    </div>
  );
}
