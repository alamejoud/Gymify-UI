import { EquipmentVO } from "./EquipmentVO";
import { TypeVO } from "./TypeVO";
import { MuscleVO } from "./MuscleVO";
import { SafeHtml, SafeResourceUrl } from "@angular/platform-browser";
import { UserVO } from "./UserVO";

export class ExerciseVO {
  exerciseId: number;
  exerciseName: string;
  exerciseSafeHtml: SafeHtml;
  majorMuscle: MuscleVO;
  notes: string;
  modifications: string;
  equipments: EquipmentVO[] = [];
  minorMuscles: MuscleVO[] = [];
  types: TypeVO[] = [];
  videoLink: string;
  safeVideoLink: SafeResourceUrl;
  createdBy: UserVO;
}
