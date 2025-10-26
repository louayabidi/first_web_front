import Hero from "../components/Hero";
import Service from "../components/Service";

console.log("Hero is:", Hero);
console.log("Service is:", Service);

function Home() {
  return (
    <div>
      <Hero />
      <Service />
    
    </div>
  );
}

export default Home;
