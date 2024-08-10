export interface User {
    id: number;
    name: string;
    workouts: Workout[];
  }
  
  export interface Workout {
    type: string;
    minutes: number;
  }
  