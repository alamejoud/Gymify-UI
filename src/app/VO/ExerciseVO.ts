import { EquipmentVO } from "./EquipmentVO";
import { TypeVO } from "./TypeVO";
import { MuscleVO } from "./MuscleVO";

export class ExerciseVO {
  exerciseId: number;
  exerciseName: string;
  majorMuscle: MuscleVO;
  notes: string;
  modifications: string;
  equipments: EquipmentVO[];
  minorMuscles: MuscleVO[];
  types: TypeVO[];
}
