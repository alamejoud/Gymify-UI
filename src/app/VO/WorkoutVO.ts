import { UserVO } from "./UserVO";
import { WorkoutExerciseVO } from "./WorkoutExerciseVO";

export class WorkoutVO {
  workoutId: number;
  workoutName: string;
  createdBy: UserVO;
  mondayExercises: WorkoutExerciseVO[] = [];
  tuesdayExercises: WorkoutExerciseVO[] = [];
  wednesdayExercises: WorkoutExerciseVO[] = [];
  thursdayExercises: WorkoutExerciseVO[] = [];
  fridayExercises: WorkoutExerciseVO[] = [];
  saturdayExercises: WorkoutExerciseVO[] = [];
  sundayExercises: WorkoutExerciseVO[] = [];
  users: UserVO[] = [];
}
