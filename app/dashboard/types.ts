import type { Banner } from "@/app/services/bannerService";
import type { Project } from "@/app/services/projectService";
import type { TechStackItem } from "@/app/data/techStackData";
import type { TechnologyPayload } from "@/app/services/techStackService";
import type { ServiceCard } from "@/app/services/serviceCardService";
import type { Career, JobApplication } from "@/app/services/careerService";
import type { InquiryItem } from "@/app/services/inquiryService";
import type { TeamMember } from "@/app/services/teamService";
import type { User } from "@/app/services/authService";

export type ActiveTab =
  | "overview"
  | "banners"
  | "technologies"
  | "projects"
  | "services"
  | "careers"
  | "inquiries"
  | "team"
  | "users"
  | "settings";

export type ModalType =
  | "add-banner"
  | "edit-banner"
  | "add-project"
  | "edit-project"
  | "add-tech"
  | "edit-tech"
  | "add-service"
  | "edit-service"
  | "add-career"
  | "edit-career"
  | "add-team"
  | "edit-team"
  | "add-user"
  | "edit-user"
  | "view-inquiry"
  | "view-application"
  | null;

export interface DeleteModalState {
  isOpen: boolean;
  type: "banner" | "project" | "tech" | "service" | "career" | "application" | "inquiry" | "team" | "user" | null;
  id: string | null;
  title: string;
  itemName?: string;
}

export interface DashboardStats {
  bannersCount: number;
  projectsCount: number;
  techCount: number;
  servicesCount: number;
  careersCount: number;
  openCareersCount: number;
  applicationsCount: number;
  pendingApplicationsCount: number;
  inquiriesCount: number;
  unreadInquiriesCount: number;
  teamCount: number;
  usersCount?: number;
}
