import Header from "./components/1-header/Header";
import Home from "./components/2-home/Home";
import About from "./components/3-about/About";
import History from "./components/4-history/History";
import Features from "./components/5-features/Features";
import Guidelines from "./components/6-guidelines/Guidelines";
import Gallery from "./components/7-gallery/Gallery";
import Footer from "./components/9-footer/Footer";
import "./App.css";



function App() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <div className="divider" />
      <History />
      <div className="divider" />
      <Features />
      <div className="divider" />
      <Guidelines />
      <div className="divider" />
      <Gallery />
      <Footer />
    </>
  );
}

export default App;

