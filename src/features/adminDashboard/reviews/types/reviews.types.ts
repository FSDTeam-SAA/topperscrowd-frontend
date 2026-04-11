export type ReviewStatus = "APPROVED" | "PENDING";

export type Review = {
  id: number;
  name: string;
  avatar: string;
  time: string;
  book: string;
  rating: number;
  text: string;
  status: ReviewStatus;
};
