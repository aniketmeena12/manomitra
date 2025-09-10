
import { ImageWithFallback } from "@/components/inputs/imagefallback";
import { Button } from "@/components/ui/button";


export function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(to bottom right, #A8D0E6, #E4D9FF)",
      }}
    >
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1727341746969-ba954b5f572c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTczNDIzNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Calm lake with mountains and forest"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Add a subtle background for the text content */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
          <h1
            className="mb-6 text-6xl"
            style={{
              color: "#3D426B",
              textShadow: "0 2px 4px rgba(255,255,255,0.9)",
            }}
          >
            Find Your Peace
          </h1>
          <p
            className="mb-8 text-xl max-w-2xl mx-auto"
            style={{
              color: "#4A4A4A",
              textShadow: "0 1px 2px rgba(255,255,255,0.9)",
            }}
          >
            A safe space for mental wellness. Take a moment to
            breathe, reflect, and care for yourself.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("affirmations")}
              className="text-white shadow-lg"
              style={{ backgroundColor: "#7B9ACC" }}
            >
              Positive Affirmations
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("mood-tracker")}
              className="border bg-white/50 backdrop-blur-sm shadow-lg"
              style={{
                borderColor: "#7B9ACC",
                color: "#4A4A4A",
              }}
            >
              Track Your Mood
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("activities")}
              className="border bg-white/50 backdrop-blur-sm shadow-lg"
              style={{
                borderColor: "#7B9ACC",
                color: "#4A4A4A",
              }}
            >
              Calming Activities
            </Button>
          </div>

          <div
            className="mt-12 text-sm"
            style={{
              color: "#3D426B",
              textShadow: "0 1px 2px rgba(255,255,255,0.9)",
            }}
          >
            <p>You are not alone. Help is available.</p>
          </div>
        </div>
      </div>
    </section>
  );
}