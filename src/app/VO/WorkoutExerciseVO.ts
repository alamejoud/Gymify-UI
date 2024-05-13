import { ExerciseVO } from "./ExerciseVO";
import { WorkoutVO } from "./WorkoutVO";

export class WorkoutExerciseVO {
  workoutExerciseId: number;
  exerciseId: number;
  exercise: ExerciseVO;
  workoutId: number;
  workout: WorkoutVO;
  day: number;
}
