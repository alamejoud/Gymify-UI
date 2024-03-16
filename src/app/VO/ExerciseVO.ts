import { ExerciseEquipmentVO } from "./ExerciseEquipmentVO";
import { ExerciseTypeVO } from "./ExerciseTypeVO";
import { MuscleVO } from "./MuscleVO";

export class ExerciseVO {
  exerciseId: number;
  exerciseName: string;
  majorMuscle: MuscleVO;
  notes: string;
  modifications: string;
  equipments: ExerciseEquipmentVO[];
  minorMuscles: MuscleVO[];
  types: ExerciseTypeVO[];
}
