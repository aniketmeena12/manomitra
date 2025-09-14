import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider";
import { useRef, useState } from "react";


const sounds = [
  { name: "Sound 1", src: "/src/assets/mediation sound/om.mp3" },
  { name: "Sound 2", src: "/src/assets/mediation sound/shrikrishnaflute.mp3" },
  { name: "Sound 3", src: "/src/assets/mediation sound/sound1.mp3" },
  { name: "Sound 4", src: "/src/assets/mediation sound/sound2.mp3" },
];

export default function MeditationSoundBox() {
  const audioRefs = useRef(sounds.map(() => null));
  const [selected, setSelected] = useState(null);
  const [volume, setVolume] = useState(0.5);

  const playSound = (idx) => {
    const audio = audioRefs.current[idx];
    if (!audio) return;

    if (selected === idx && !audio.paused) {
      audio.pause();
      setSelected(null);
    } else {
      audioRefs.current.forEach((a, i) => {
        if (a && i !== idx) {
          a.pause();
          a.currentTime = 0;
        }
      });
      audio.volume = volume;
      audio.loop = true;
      audio.play();
      setSelected(idx);
    }
  };

  const handleVolume = (value) => {
    setVolume(value);
    if (selected !== null && audioRefs.current[selected]) {
      audioRefs.current[selected].volume = value;
    }
  };

  const stopSound = () => {
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    setSelected(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 space-y-6 bg-yellow-50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-orange-700">Meditation Sound Box</CardTitle>
        <CardDescription className="text-gray-600">
          Select a sound, adjust the volume, and meditate peacefully.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 w-full">
        {sounds.map((sound, i) => (
          <div
            key={sound.name}
            className={`flex justify-between items-center p-3 rounded-lg transition ${
              selected === i ? "bg-green-100 shadow-md" : "bg-white hover:bg-indigo-50"
            }`}
          >
            <span className="font-medium text-gray-800">{sound.name}</span>
            <Button
              variant={selected === i ? "default" : "outline"}
              onClick={() => playSound(i)}
            >
              {selected === i ? "Pause" : "Play"}
            </Button>
            <audio ref={(el) => (audioRefs.current[i] = el)} src={sound.src} />
          </div>
        ))}

        <div className="space-y-2">
          <span className="font-medium text-gray-700">Volume</span>
          <Slider
            value={[volume]}
            onValueChange={(val) => handleVolume(val[0])}
            step={0.01}
            max={1}
            min={0}
          >
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>

        <Button
          onClick={stopSound}
          variant="destructive"
          className="w-full"
          disabled={selected === null}
        >
          Stop All
        </Button>
      </CardContent>
    </Card>
  );
}
