export interface IMission {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  status: number;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  missionType: number;
  totalSeat: number;
  organizationName: string;
  organizationDetails: string;
  availability: number;
  missionThemeId: number;
  cityId: number;
  missionSkills: number[];
  goalObjectiveTitle: string;
  goalObjective: number;
  goalObjectiveAchieved: number;
  thumbnailUrl: string;
  images: string[];
  documents: string[];
  deletedMediaId: number[];
}
