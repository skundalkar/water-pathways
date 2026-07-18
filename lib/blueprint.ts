import { Grade } from "./types";

export type BlueprintCategory = {
  id: string;
  title: string;
  examQuestions: { D1: number; D2: number };
  targetBank: [number, number];
  objectives: { id: string; title: string; grade: Grade }[];
};

export const distributionBlueprint: BlueprintCategory[] = [
  { id: "disinfection", title: "Disinfection", examQuestions: { D1: 15, D2: 20 }, targetBank: [60, 80], objectives: [
    { id: "main-disinfection", title: "Disinfect water mains and dechlorinate safely", grade: "Both" }, { id: "well-disinfection", title: "Disinfect a well and calculate well volume", grade: "Both" }, { id: "storage-disinfection", title: "Disinfect storage facilities", grade: "Both" }, { id: "chlorine-residual", title: "Monitor and interpret chlorine residual", grade: "Both" }, { id: "disinfectant-dosage", title: "Calculate disinfectant dosage", grade: "Both" }, { id: "chloramination", title: "Explain chloramination and chlorine curves", grade: "D2" }, { id: "dbps", title: "Recognize disinfection by-product causes", grade: "D2" }
  ] },
  { id: "hydraulics", title: "Distribution system design / hydraulics", examQuestions: { D1: 20, D2: 20 }, targetBank: [70, 90], objectives: [
    { id: "system-basics", title: "Explain the path of drinking water", grade: "Both" }, { id: "system-layout", title: "Recognize common distribution layouts", grade: "Both" }, { id: "pressure", title: "Read, interpret, and calculate pressure", grade: "Both" }, { id: "flow-volume", title: "Calculate flow, area, and volume", grade: "Both" }, { id: "water-hammer", title: "Identify water hammer and reduction methods", grade: "Both" }, { id: "backflow", title: "Recognize cross-connections and backflow hazards", grade: "Both" }, { id: "system-maps", title: "Interpret system-map symbols and scale", grade: "D2" }, { id: "velocity-headloss", title: "Calculate velocity and explain head loss", grade: "D2" }, { id: "storage-operations", title: "Operate and maintain storage facilities", grade: "D2" }
  ] },
  { id: "operations", title: "Equipment operation / maintenance / inspections", examQuestions: { D1: 20, D2: 20 }, targetBank: [70, 100], objectives: [
    { id: "valves", title: "Select, operate, and inspect valves", grade: "Both" }, { id: "hydrants", title: "Inspect, test, and flush hydrants", grade: "Both" }, { id: "meters", title: "Select and read water meters", grade: "Both" }, { id: "pumps", title: "Recognize basic pump operation and trouble signs", grade: "Both" }, { id: "generators", title: "Perform basic generator start-up and checks", grade: "Both" }, { id: "chemical-feeders", title: "Operate and troubleshoot chemical feeders", grade: "D2" }, { id: "scada", title: "Interpret basic SCADA information", grade: "D2" }, { id: "corrosion", title: "Recognize corrosion control methods", grade: "D2" }
  ] },
  { id: "regulations-safety", title: "Drinking water regulations / management / safety", examQuestions: { D1: 15, D2: 10 }, targetBank: [55, 85], objectives: [
    { id: "operator-certification", title: "Explain California operator certification basics", grade: "Both" }, { id: "sampling", title: "Use safe water-sampling techniques", grade: "Both" }, { id: "mcls", title: "Explain maximum contaminant levels", grade: "Both" }, { id: "public-notification", title: "Recognize situations requiring public notification", grade: "Both" }, { id: "emergency-response", title: "Follow core emergency response principles", grade: "Both" }, { id: "safety", title: "Apply trenching, traffic, chemical, electrical, and confined-space safety", grade: "Both" }, { id: "recordkeeping", title: "Recognize D2 reporting and recordkeeping responsibilities", grade: "D2" }
  ] },
  { id: "mains-piping", title: "Water mains and piping", examQuestions: { D1: 20, D2: 20 }, targetBank: [60, 85], objectives: [
    { id: "pipe-materials", title: "Select pipes, joints, fittings, and compatible materials", grade: "Both" }, { id: "main-installation", title: "Understand bedding, backfill, compaction, and repair", grade: "Both" }, { id: "leaks", title: "Identify, locate, and respond to leaks", grade: "Both" }, { id: "service-connections", title: "Recognize service-connection materials and work", grade: "Both" }, { id: "excavation", title: "Apply excavation safety basics", grade: "Both" }, { id: "thrust-restraint", title: "Explain thrust restraint and allowable leakage", grade: "D2" }
  ] },
  { id: "water-quality", title: "Water quality / water source", examQuestions: { D1: 10, D2: 10 }, targetBank: [40, 60], objectives: [
    { id: "coliform", title: "Explain coliform and bacteriological basics", grade: "Both" }, { id: "water-quality-basics", title: "Recognize pH, turbidity, hardness, and conductivity", grade: "Both" }, { id: "water-sources", title: "Recognize groundwater, wells, and source protection basics", grade: "Both" }, { id: "flushing", title: "Explain flushing and water-age basics", grade: "Both" }, { id: "corrosivity", title: "Recognize signs and impacts of corrosive water", grade: "Both" }
  ] }
];

export const totalExamQuestions = (grade: "D1" | "D2") => distributionBlueprint.reduce((sum, category) => sum + category.examQuestions[grade], 0);
export const totalTargetRange = () => distributionBlueprint.reduce((sum, category) => [sum[0] + category.targetBank[0], sum[1] + category.targetBank[1]] as [number, number], [0, 0] as [number, number]);
