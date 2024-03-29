import { ExerciseVO } from "./ExerciseVO";

export class MuscleVO {
  muscleId: number;
  muscleName: string;
  musclePicture: ArrayBuffer;
  exercises: ExerciseVO[] = [];
}
