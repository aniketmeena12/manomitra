import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

// --- Assessments Data ---
const categories = [
  "Depression","Anxiety","Bipolar","PTSD","OCD","Eating","ADHD","ASD","Substance","Personality","Psychosis","Self-harm","General"
];

const assessments = [
  // --- Depression ---
  {
    id: "phq9",
    title: "PHQ-9",
    category: "Depression",
    desc: "Patient Health Questionnaire-9",
    questions: [
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
      "Trouble falling or staying asleep, or sleeping too much",
      "Feeling tired or having little energy",
      "Poor appetite or overeating",
      "Feeling bad about yourself — or that you are a failure",
      "Trouble concentrating on things",
      "Moving or speaking so slowly that other people could have noticed",
      "Thoughts that you would be better off dead, or of hurting yourself"
    ],
    scoring: [
      { min: 0, max: 4, label: "Minimal Depression" },
      { min: 5, max: 9, label: "Mild Depression" },
      { min: 10, max: 14, label: "Moderate Depression" },
      { min: 15, max: 19, label: "Moderately Severe Depression" },
      { min: 20, max: 27, label: "Severe Depression" }
    ]
  },
  {
    id: "bdi",
    title: "BDI",
    category: "Depression",
    desc: "Beck Depression Inventory",
    questions: [
      "Sadness","Pessimism","Past Failure","Loss of Pleasure","Guilty Feelings",
      "Punishment Feelings","Self-Dislike","Self-Criticalness","Suicidal Thoughts",
      "Crying","Agitation","Loss of Interest","Indecisiveness","Worthlessness",
      "Loss of Energy","Changes in Sleep","Irritability","Changes in Appetite",
      "Concentration Difficulty","Tiredness or Fatigue","Loss of Interest in Sex"
    ],
    scoring: [
      { min: 0, max: 13, label: "Minimal Depression" },
      { min: 14, max: 19, label: "Mild Depression" },
      { min: 20, max: 28, label: "Moderate Depression" },
      { min: 29, max: 63, label: "Severe Depression" }
    ]
  },

  // --- Anxiety ---
  {
    id: "gad7",
    title: "GAD-7",
    category: "Anxiety",
    desc: "Generalized Anxiety Disorder-7",
    questions: [
      "Feeling nervous, anxious, or on edge",
      "Not being able to stop or control worrying",
      "Worrying too much about different things",
      "Trouble relaxing",
      "Being so restless that it is hard to sit still",
      "Becoming easily annoyed or irritable",
      "Feeling afraid, as if something awful might happen"
    ],
    scoring: [
      { min: 0, max: 4, label: "Minimal Anxiety" },
      { min: 5, max: 9, label: "Mild Anxiety" },
      { min: 10, max: 14, label: "Moderate Anxiety" },
      { min: 15, max: 21, label: "Severe Anxiety" }
    ]
  },
  {
    id: "bai",
    title: "BAI",
    category: "Anxiety",
    desc: "Beck Anxiety Inventory",
    questions: [
      "Numbness or tingling","Feeling hot","Wobbliness in legs","Unable to relax",
      "Fear of worst happening","Dizzy or lightheaded","Heart pounding/racing","Unsteady",
      "Terrified or afraid","Nervous","Feeling of choking","Hands trembling","Shaky",
      "Fear of losing control","Difficulty breathing","Fear of dying","Scared",
      "Indigestion","Faint/lightheaded","Face flushed","Sweating"
    ],
    scoring: [
      { min: 0, max: 7, label: "Minimal Anxiety" },
      { min: 8, max: 15, label: "Mild Anxiety" },
      { min: 16, max: 25, label: "Moderate Anxiety" },
      { min: 26, max: 63, label: "Severe Anxiety" }
    ]
  },
  {
    id: "ham-a",
    title: "HAM-A",
    category: "Anxiety",
    desc: "Hamilton Anxiety Rating Scale",
    questions: [
      "Anxious mood","Tension","Fears","Insomnia","Intellectual impairment",
      "Depressed mood","Somatic (muscular) symptoms","Somatic (sensory) symptoms",
      "Cardiovascular symptoms","Respiratory symptoms","Gastrointestinal symptoms",
      "Genitourinary symptoms","Autonomic symptoms","Behavior at interview"
    ],
    scoring: [
      { min: 0, max: 17, label: "Mild Anxiety" },
      { min: 18, max: 24, label: "Moderate Anxiety" },
      { min: 25, max: 56, label: "Severe Anxiety" }
    ]
  },

  // --- Bipolar ---
  {
    id: "mdq",
    title: "MDQ",
    category: "Bipolar",
    desc: "Mood Disorder Questionnaire",
    questions: [
      "Ever felt so good or hyper that others thought you were not your normal self?",
      "Ever felt unusually irritable?",
      "Ever needed less sleep and felt rested?",
      "Ever felt more talkative than usual?",
      "Ever had racing thoughts?",
      "Ever been easily distracted?",
      "Ever had increased activity or goal-directed behavior?",
      "Ever engaged in risky behavior?",
      "Have these symptoms occurred at the same time?",
      "Have these symptoms caused problems in your life?"
    ],
    scoring: [
      { min: 0, max: 6, label: "Low likelihood of Bipolar" },
      { min: 7, max: 10, label: "Possible Bipolar" }
    ]
  },

  // --- PTSD ---
  {
    id: "pcl5",
    title: "PCL-5",
    category: "PTSD",
    desc: "PTSD Checklist for DSM-5",
    questions: [
      "Repeated, disturbing, and unwanted memories of the stressful experience?",
      "Repeated, disturbing dreams of the stressful experience?",
      "Suddenly feeling or acting as if the stressful experience were actually happening again?",
      "Feeling very upset when reminded of the stressful experience?",
      "Having strong physical reactions when reminded of the stressful experience?",
      "Avoiding memories, thoughts, or feelings related to the stressful experience?",
      "Avoiding external reminders of the stressful experience?",
      "Trouble remembering important aspects of the stressful experience?",
      "Loss of interest in activities?",
      "Feeling distant or cut off from others?",
      "Feeling emotionally numb?",
      "Feeling irritable or angry?",
      "Taking too many risks or acting destructively?",
      "Being overly alert or on guard?",
      "Feeling jumpy or easily startled?",
      "Having difficulty concentrating?",
      "Having trouble falling or staying asleep?"
    ],
    scoring: [
      { min: 0, max: 9, label: "Minimal PTSD symptoms" },
      { min: 10, max: 19, label: "Mild PTSD symptoms" },
      { min: 20, max: 29, label: "Moderate PTSD symptoms" },
      { min: 30, max: 80, label: "Severe PTSD symptoms" }
    ]
  },

  // --- OCD ---
  {
    id: "ybo",
    title: "Y-BOCS",
    category: "OCD",
    desc: "Yale-Brown Obsessive Compulsive Scale",
    questions: [
      "Time spent on obsessions","Interference from obsessions","Distress from obsessions",
      "Resistance against obsessions","Control over obsessions","Time spent on compulsions",
      "Interference from compulsions","Distress from compulsions",
      "Resistance against compulsions","Control over compulsions"
    ],
    scoring: [
      { min: 0, max: 7, label: "Subclinical" },
      { min: 8, max: 15, label: "Mild" },
      { min: 16, max: 23, label: "Moderate" },
      { min: 24, max: 31, label: "Severe" },
      { min: 32, max: 40, label: "Extreme" }
    ]
  },
  {
    id: "oci-r",
    title: "OCI-R",
    category: "OCD",
    desc: "Obsessive Compulsive Inventory – Revised",
    questions: [
      "Unwanted unpleasant thoughts","Washing and cleaning rituals","Checking behavior",
      "Doubts and uncertainty","Obsessing about order","Counting rituals",
      "Hoarding items unnecessarily","Reassurance seeking"
    ],
    scoring: [
      { min: 0, max: 20, label: "Low OCD symptoms" },
      { min: 21, max: 40, label: "Moderate OCD symptoms" },
      { min: 41, max: 72, label: "Severe OCD symptoms" }
    ]
  },

  // --- Eating ---
  {
    id: "scoff",
    title: "SCOFF",
    category: "Eating",
    desc: "SCOFF Questionnaire for Eating Disorders",
    questions: [
      "Do you make yourself Sick because you feel uncomfortably full?",
      "Do you worry you have lost Control over how much you eat?",
      "Have you recently lost more than One stone (6.35 kg) in a 3-month period?",
      "Do you believe yourself to be Fat when others say you are too thin?",
      "Would you say Food dominates your life?"
    ],
    scoring: [
      { min: 0, max: 1, label: "Low risk" },
      { min: 2, max: 5, label: "High risk of eating disorder" }
    ]
  },
  {
    id: "eat26",
    title: "EAT-26",
    category: "Eating",
    desc: "Eating Attitudes Test-26",
    questions: [
      "I am terrified about being overweight","I avoid eating when I am hungry",
      "I find myself preoccupied with food","I have gone on eating binges where I feel out of control",
      "Self-induced vomiting to control weight","I use laxatives, diet pills, or diuretics to control weight",
      "I exercise excessively to control weight","I am aware of having lost a large amount of weight"
    ],
    scoring: [
      { min: 0, max: 9, label: "Low risk" },
      { min: 10, max: 19, label: "Moderate risk" },
      { min: 20, max: 78, label: "High risk" }
    ]
  },

  // --- ADHD ---
  {
    id: "asrs",
    title: "ASRS v1.1",
    category: "ADHD",
    desc: "Adult ADHD Self-Report Scale",
    questions: [
      "How often do you make careless mistakes?",
      "How often do you have difficulty sustaining attention?",
      "How often do you have difficulty listening when spoken to?",
      "How often do you fail to finish work or duties?",
      "How often do you have difficulty organizing tasks?",
      "How often do you avoid tasks requiring sustained effort?",
      "How often do you lose things necessary for tasks?",
      "How often are you easily distracted?",
      "How often are you forgetful in daily activities?",
      "How often do you fidget or squirm?",
      "How often do you leave your seat inappropriately?",
      "How often do you feel restless?",
      "How often do you have difficulty relaxing?",
      "How often do you talk excessively?",
      "How often do you blurt out answers?",
      "How often do you interrupt or intrude on others?"
    ],
    scoring: [
      { min: 0, max: 23, label: "Low likelihood of ADHD" },
      { min: 24, max: 36, label: "Possible ADHD" },
      { min: 37, max: 64, label: "High likelihood of ADHD" }
    ]
  },
  {
    id: "vanderbilt",
    title: "Vanderbilt Assessment",
    category: "ADHD",
    desc: "Vanderbilt ADHD Diagnostic Parent Rating Scale (for children)",
    questions: [
      "Fails to pay close attention to details or makes careless mistakes",
      "Has difficulty sustaining attention",
      "Does not seem to listen when spoken to",
      "Does not follow through on instructions",
      "Has difficulty organizing tasks and activities",
      "Avoids tasks requiring sustained mental effort",
      "Loses things necessary for tasks",
      "Is easily distracted",
      "Is forgetful in daily activities",
      "Fidgets or squirms in seat",
      "Leaves seat when remaining seated is expected",
      "Runs about or climbs excessively",
      "Has difficulty playing quietly",
      "Is often 'on the go'",
      "Talks excessively",
      "Blurts out answers",
      "Has difficulty awaiting turn",
      "Interrupts or intrudes on others"
    ],
    scoring: [
      { min: 0, max: 17, label: "Few ADHD symptoms" },
      { min: 18, max: 30, label: "Moderate ADHD symptoms" },
      { min: 31, max: 54, label: "High ADHD symptoms" }
    ]
  },

  // --- Autism ---
  {
    id: "aq",
    title: "AQ",
    category: "ASD",
    desc: "Autism Spectrum Quotient",
    questions: [
      "I prefer to do things the same way over and over again",
      "I find social situations easy",
      "I notice small sounds when others do not",
      "I find it easy to make new friends",
      "I tend to notice details that others do not"
    ],
    scoring: [
      { min: 0, max: 25, label: "Low autistic traits" },
      { min: 26, max: 32, label: "Borderline range" },
      { min: 33, max: 50, label: "High autistic traits" }
    ]
  },
  {
    id: "mchat",
    title: "M-CHAT",
    category: "ASD",
    desc: "Modified Checklist for Autism in Toddlers",
    questions: [
      "Does your child enjoy being swung or bounced?",
      "Does your child take interest in other children?",
      "Does your child like climbing on things?",
      "Does your child make unusual finger movements near eyes?",
      "Does your child point to ask for something?"
    ],
    scoring: [
      { min: 0, max: 2, label: "Low risk" },
      { min: 3, max: 7, label: "Moderate risk" },
      { min: 8, max: 20, label: "High risk of autism" }
    ]
  },

  // --- Substance Use ---
  {
    id: "audit",
    title: "AUDIT",
    category: "Substance",
    desc: "Alcohol Use Disorders Identification Test",
    questions: [
      "How often do you have a drink containing alcohol?",
      "How many drinks containing alcohol do you have on a typical day?",
      "How often do you have six or more drinks on one occasion?",
      "How often during the last year have you failed to do what was expected due to drinking?",
      "How often during the last year have you needed a drink first thing in the morning?",
      "How often during the last year have you had a feeling of guilt or remorse after drinking?",
      "How often during the last year have you been unable to remember what happened the night before?",
      "Have you or someone else been injured as a result of your drinking?",
      "Has a relative, friend, or doctor expressed concern about your drinking?"
    ],
    scoring: [
      { min: 0, max: 7, label: "Low risk" },
      { min: 8, max: 15, label: "Medium risk" },
      { min: 16, max: 40, label: "High risk of alcohol use disorder" }
    ]
  },
  {
    id: "dast",
    title: "DAST",
    category: "Substance",
    desc: "Drug Abuse Screening Test",
    questions: [
      "Have you used drugs other than those required for medical reasons?",
      "Do you abuse more than one drug at a time?",
      "Can you get through the week without using drugs?",
      "Are you unable to stop using drugs when you want to?",
      "Have you had blackouts or flashbacks due to drug use?",
      "Do you feel bad or guilty about your drug use?",
      "Have you neglected your family because of your drug use?",
      "Have you engaged in illegal activities to obtain drugs?",
      "Have you experienced withdrawal symptoms?",
      "Have you had medical problems as a result of your drug use?"
    ],
    scoring: [
      { min: 0, max: 2, label: "Low level" },
      { min: 3, max: 5, label: "Moderate level" },
      { min: 6, max: 8, label: "Substantial level" },
      { min: 9, max: 10, label: "Severe level" }
    ]
  },
  {
    id: "cage",
    title: "CAGE",
    category: "Substance",
    desc: "CAGE Questionnaire for Alcohol Use",
    questions: [
      "Have you ever felt you should Cut down on your drinking?",
      "Have people Annoyed you by criticizing your drinking?",
      "Have you ever felt Guilty about drinking?",
      "Have you ever had a drink first thing in the morning (Eye-opener)?"
    ],
    scoring: [
      { min: 0, max: 1, label: "Low risk" },
      { min: 2, max: 4, label: "High risk of alcohol problem" }
    ]
  },

  // --- Personality ---
  {
    id: "sapas",
    title: "SAPAS",
    category: "Personality",
    desc: "Standardized Assessment of Personality – Abbreviated Scale",
    questions: [
      "Are you normally a worrier?","Do you have difficulty making and keeping friends?",
      "Do you normally lose your temper easily?","Are you normally an impulsive sort of person?",
      "Are you normally a perfectionist?","Do you normally avoid social situations?",
      "Are you normally a loner?","In general, do you depend on others a lot?"
    ],
    scoring: [
      { min: 0, max: 2, label: "Low risk" },
      { min: 3, max: 8, label: "High risk of personality disorder" }
    ]
  },
  {
    id: "ipde",
    title: "IPDE",
    category: "Personality",
    desc: "International Personality Disorder Examination",
    questions: [
      "Do you often distrust others?","Do you have an unstable self-image?",
      "Do you engage in impulsive behaviors?","Do you lack empathy for others?",
      "Do you need constant admiration?","Do you avoid social situations?",
      "Do you have long-term feelings of emptiness?","Do you have problems controlling anger?"
    ],
    scoring: [
      { min: 0, max: 2, label: "Low likelihood" },
      { min: 3, max: 5, label: "Moderate likelihood" },
      { min: 6, max: 8, label: "High likelihood of personality disorder" }
    ]
  },
  {
    id: "scid5pd",
    title: "SCID-5-PD",
    category: "Personality",
    desc: "Structured Clinical Interview for DSM-5 Personality Disorders",
    questions: [
      "Do you often have unstable relationships?","Do you feel very suspicious or paranoid?",
      "Do you avoid activities that involve significant interpersonal contact?",
      "Do you have little interest in close relationships?","Do you feel very self-important?",
      "Do you need excessive admiration?","Do you lack close friends?",
      "Do you feel anxious in social situations?"
    ],
    scoring: [
      { min: 0, max: 2, label: "Few traits" },
      { min: 3, max: 5, label: "Some traits" },
      { min: 6, max: 8, label: "Strong traits of personality disorder" }
    ]
  },

  // --- Psychotic Disorders ---
  {
    id: "pqb",
    title: "PQ-B",
    category: "Psychotic",
    desc: "Prodromal Questionnaire – Brief",
    questions: [
      "Do familiar surroundings sometimes seem strange or unreal?",
      "Have you heard unusual sounds that others don’t hear?",
      "Do you feel that others are watching you?",
      "Do you have thoughts that are not your own?",
      "Do you find it hard to get your thoughts organized?"
    ],
    scoring: [
      { min: 0, max: 2, label: "Low risk" },
      { min: 3, max: 4, label: "Moderate risk" },
      { min: 5, max: 21, label: "High risk of psychosis" }
    ]
  },
  {
    id: "sips",
    title: "SIPS",
    category: "Psychotic",
    desc: "Structured Interview for Prodromal Syndromes",
    questions: [
      "Have you noticed changes in your thinking?",
      "Have you had unusual experiences that others don’t share?",
      "Have you felt people are against you?",
      "Do you have unusual beliefs?",
      "Do you experience strange perceptions?"
    ],
    scoring: [
      { min: 0, max: 2, label: "Low risk" },
      { min: 3, max: 5, label: "Moderate risk" },
      { min: 6, max: 10, label: "High risk of psychosis" }
    ]
  },

  // --- Self-Harm ---
  {
    id: "cssrs",
    title: "C-SSRS",
    category: "Self-harm",
    desc: "Columbia Suicide Severity Rating Scale",
    questions: [
      "Have you wished you were dead?",
      "Have you had thoughts of killing yourself?",
      "Have you thought about how you might do it?",
      "Have you had intentions of acting on these thoughts?",
      "Have you started to prepare to end your life?"
    ],
    scoring: [
      { min: 0, max: 1, label: "Low risk" },
      { min: 2, max: 3, label: "Moderate risk" },
      { min: 4, max: 5, label: "High risk of suicide" }
    ]
  },
  {
    id: "siq-short",
    title: "SIQ (Short Form)",
    category: "Self-harm",
    desc: "Short Suicidal Ideation Questionnaire",
    questions: [
      "How often do you wish you were dead?",
      "How often do you think about killing yourself?",
      "How often do you think about how you might do it?",
      "How often do you think you will actually do it?",
      "How often do you plan out how to kill yourself?",
      "How often do you tell someone you may kill yourself?"
    ],
    scoring: [
      { min: 0, max: 3, label: "Low risk" },
      { min: 4, max: 6, label: "Moderate risk" },
      { min: 7, max: 18, label: "High risk of suicidal ideation" }
    ]
  },

  // --- Suicide ---
  {
    id: "siq",
    title: "SIQ",
    category: "Suicide",
    desc: "Suicidal Ideation Questionnaire (Full)",
    questions: [
      "I thought about killing myself",
      "I thought about how I might kill myself",
      "I thought about when I might kill myself",
      "I thought about what to write in a suicide note",
      "I thought about how easy it would be to kill myself",
      "I thought about telling someone I want to kill myself",
      "I thought about whether I would really carry out a plan to kill myself",
      "I thought about people I would like to say goodbye to",
      "I thought about things I would leave behind",
      "I thought about killing myself in detail"
    ],
    scoring: [
      { min: 0, max: 10, label: "Low risk" },
      { min: 11, max: 20, label: "Moderate risk" },
      { min: 21, max: 30, label: "High risk of suicidal ideation" }
    ]
  },

  // --- General Mental Health ---
  {
    id: "ghq",
    title: "GHQ-12",
    category: "General",
    desc: "General Health Questionnaire-12",
    questions: [
      "Able to concentrate","Lost much sleep over worry","Felt you are playing a useful role",
      "Capable of making decisions","Felt constantly under strain","Felt you couldn’t overcome difficulties",
      "Able to enjoy day-to-day activities","Able to face problems","Feeling unhappy or depressed",
      "Losing confidence","Thinking of yourself as worthless","Feeling reasonably happy"
    ],
    scoring: [
      { min: 0, max: 3, label: "Low distress" },
      { min: 4, max: 6, label: "Moderate distress" },
      { min: 7, max: 12, label: "High distress" }
    ]
  },
  {
    id: "sf36",
    title: "SF-36",
    category: "General",
    desc: "36-Item Short Form Survey",
    questions: [
      "Physical functioning","Role limitations due to physical health",
      "Role limitations due to emotional problems","Energy/fatigue",
      "Emotional well-being","Social functioning",
      "Pain","General health perception"
    ],
    scoring: [
      { min: 0, max: 49, label: "Below average health" },
      { min: 50, max: 74, label: "Average health" },
      { min: 75, max: 100, label: "Above average health" }
    ]
  },
  {
    id: "k10",
    title: "K10",
    category: "General",
    desc: "Kessler Psychological Distress Scale",
    questions: [
      "Tired out for no good reason","Nervous","So nervous nothing could calm you down",
      "Hopeless","Restless or fidgety","So restless you couldn’t sit still",
      "Depressed","So depressed nothing could cheer you up",
      "Everything was an effort","Worthless"
    ],
    scoring: [
      { min: 10, max: 19, label: "Low distress" },
      { min: 20, max: 24, label: "Moderate distress" },
      { min: 25, max: 29, label: "High distress" },
      { min: 30, max: 50, label: "Very high distress" }
    ]
  }
];


const options = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" }
];

const AssessmentHub = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [taking, setTaking] = useState(null); // assessment id
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [result, setResult] = useState(null);

  const filtered = assessments.filter((a) => {
    if (selectedCategory && a.category !== selectedCategory) return false;
    if (!query) return true;
    return (a.title + " " + a.desc + " " + a.category).toLowerCase().includes(query.toLowerCase());
  });

  const currentAssessment = taking
    ? assessments.find((a) => a.id === taking)
    : null;

  const startAssessment = (id) => {
    setTaking(id);
    setCurrentQ(0);
    setResult(null);
    setAnswers(
      currentAssessment && currentAssessment.questions
        ? new Array(currentAssessment.questions.length).fill("")
        : []
    );
  };

  const handleAnswer = (val) => {
    const newAns = [...answers];
    newAns[currentQ] = val;
    setAnswers(newAns);
  };

  const handleNext = () => {
    if (!answers[currentQ]) {
      toast.error("Please select an answer.");
      return;
    }
    if (currentQ < currentAssessment.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate result
      const total = answers.reduce((sum, v) => sum + parseInt(v), 0);
      const scoring = currentAssessment.scoring;
      let label = "No result";
      if (scoring) {
        const found = scoring.find((s) => total >= s.min && total <= s.max);
        if (found) label = found.label;
      }
      setResult(`${label} (Score: ${total})`);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const handleBack = () => {
    setTaking(null);
    setResult(null);
    setAnswers([]);
    setCurrentQ(0);
  };

  return (
    <div className="min-h-screen bg-[rgba(235,225,225,0.67)] rounded-2xl text-slate-800 flex">
      {/* Sidebar categories */}
      <aside className="w-56 rounded-2xl border-r shadow-sm h-screen sticky top-0 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-3">Categories</h3>
          <div className="flex flex-col gap-2">
            <Button
              variant={selectedCategory === null ? "secondary" : "ghost"}
              onClick={() => setSelectedCategory(null)}
              className="justify-start"
            >
              All
            </Button>
            {categories.map((c) => (
              <Button
                key={c}
                variant={selectedCategory === c ? "secondary" : "ghost"}
                onClick={() => setSelectedCategory(c)}
                className="justify-start"
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Assessments</h2>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="border rounded-md px-3 py-2 w-64 text-sm"
          />
        </div>

        {/* Assessment taking view */}
        {taking && currentAssessment ? (
          <Card className="max-w-xl mx-auto rounded-xl shadow-md p-6">
            {/* Header row: Back button left, assessment name center */}
            <div className="flex items-center justify-between mb-6">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                onClick={handleBack}
              >
                &larr; Back to list
              </Button>
              <div className="flex-1 flex justify-center">
                <h3 className="text-xl font-bold text-center">{currentAssessment.title}</h3>
              </div>
              {/* Empty div for spacing */}
              <div style={{ width: "120px" }}></div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 text-gray-500">{currentAssessment.desc}</div>
              <div className="mb-2 text-sm text-gray-600">
                Question {currentQ + 1} of {currentAssessment.questions.length}
              </div>
              <div className="mb-6 font-medium text-gray-800 text-lg">
                {currentAssessment.questions[currentQ]}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              {options.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="answer"
                    value={opt.value}
                    checked={answers[currentQ] === opt.value}
                    onChange={() => handleAnswer(opt.value)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentQ === 0}
              >
                Previous
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={handleNext}
              >
                {currentQ === currentAssessment.questions.length - 1
                  ? "Finish"
                  : "Next"}
              </Button>
            </div>
            {result && (
              <div className="text-center py-10">
                <div className="text-2xl font-bold mb-2">Result</div>
                <div className="text-lg mb-4">{result}</div>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleBack}
                >
                  Back to Assessments
                </Button>
              </div>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  shadow-lg rounded-xl p-4">
            {filtered.map((a) => (
              <Card key={a.id} className="p-4 rounded-xl shadow-sm border flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-lg">{a.title}</h3>
                  <p className="text-sm text-slate-500">{a.desc}</p>
                  <span className="text-xs px-2 py-1 mt-2 inline-block rounded-full bg-slate-100">{a.category}</span>
                </div>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white mt-4 cursor-pointer"
                  onClick={() => {
                    setTaking(a.id);
                    setCurrentQ(0);
                    setResult(null);
                    setAnswers(
                      a.questions ? new Array(a.questions.length).fill("") : []
                    );
                  }}
                >
                  Start
                </Button>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AssessmentHub;
