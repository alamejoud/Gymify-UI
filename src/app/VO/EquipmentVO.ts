import { ExerciseVO } from "./ExerciseVO";

export class EquipmentVO {
  equipmentId: number;
  equipmentName: string;
  equipmentPicture: ArrayBuffer;
  exercises: ExerciseVO[] = [];
}
