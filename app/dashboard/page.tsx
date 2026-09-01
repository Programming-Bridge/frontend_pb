"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectIsAuthenticated,
  selectAuthUser,
  setCredentials,
  logoutUser,
} from "@/lib/store/features/auth/authSlice";
import {
  getToken,
  getUser,
  logout as authLogout,
  getAllUsers,
  createNewUser,
  updateUserRecord,
  deleteUserRecord,
  type User,
} from "@/app/services/authService";

// Services
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  type Banner,
} from "@/app/services/bannerService";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  type Project,
} from "@/app/services/projectService";
import {
  getTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology,
  seedTechnologies,
  type TechnologyPayload,
} from "@/app/services/techStackService";
import type { TechStackItem } from "@/app/data/techStackData";
import {
  getServiceCards,
  createServiceCard,
  updateServiceCard,
  deleteServiceCard,
  type ServiceCard,
} from "@/app/services/serviceCardService";
import {
  getCareers,
  createCareer,
  updateCareer,
  deleteCareer,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
  type Career,
  type JobApplication,
} from "@/app/services/careerService";
import {
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  type InquiryItem,
} from "@/app/services/inquiryService";
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  type TeamMember,
} from "@/app/services/teamService";

// Types
import type { ActiveTab, ModalType, DeleteModalState, DashboardStats } from "./types";

// UI Components
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { ToastAlert } from "./components/ui/ToastAlert";
import { ConfirmDeleteModal } from "./components/ui/ConfirmDeleteModal";

// Tab Views
import { OverviewTab } from "./components/tabs/OverviewTab";
import { BannersTab } from "./components/tabs/BannersTab";
import { ProjectsTab } from "./components/tabs/ProjectsTab";
import { TechStackTab } from "./components/tabs/TechStackTab";
import { ServicesTab } from "./components/tabs/ServicesTab";
import { CareersTab } from "./components/tabs/CareersTab";
import { InquiriesTab } from "./components/tabs/InquiriesTab";
import { TeamTab } from "./components/tabs/TeamTab";
import { UsersTab } from "./components/tabs/UsersTab";
import { SettingsTab } from "./components/tabs/SettingsTab";

// Modals
import { BannerModal } from "./components/modals/BannerModal";
import { ProjectModal } from "./components/modals/ProjectModal";
import { TechModal } from "./components/modals/TechModal";
import { ServiceModal } from "./components/modals/ServiceModal";
import { CareerModal } from "./components/modals/CareerModal";
import { TeamModal } from "./components/modals/TeamModal";
import { UserModal } from "./components/modals/UserModal";
import { InquiryViewModal } from "./components/modals/InquiryViewModal";
import { ApplicationViewModal } from "./components/modals/ApplicationViewModal";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authUser = useAppSelector(selectAuthUser);

  // App Navigation & Session State
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [authChecked, setAuthChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dashboard Global Data
  const [banners, setBanners] = useState<Banner[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<TechStackItem[]>([]);
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Search, Loading & Toast States
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  // Modals Management
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Accessible Delete Modal State
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    type: null,
    id: null,
    title: "",
    itemName: "",
  });

  // 1. Session verification on mount
  useEffect(() => {
    const token = getToken();
    const user = getUser();
    if (!token) {
      router.replace("/login");
      return;
    }
    if (user) {
      setCurrentUser(user);
      dispatch(setCredentials({ token, user }));
    }
    setAuthChecked(true);
  }, [dispatch, router]);

  // 2. Fetch all collections
  const loadAllData = async () => {
    setIsLoadingData(true);
    try {
      const user = getUser();
      const isSuper = user?.role === "superadmin" || currentUser?.role === "superadmin";

      const [
        bannersRes,
        projectsRes,
        techRes,
        servicesRes,
        careersRes,
        appsRes,
        inquiriesRes,
        teamRes,
        usersRes,
      ] = await Promise.allSettled([
        getBanners(),
        getProjects(),
        getTechnologies("all"),
        getServiceCards(),
        getCareers(),
        getApplications(),
        getInquiries(),
        getTeamMembers(),
        isSuper ? getAllUsers() : Promise.resolve([]),
      ]);

      if (bannersRes.status === "fulfilled") setBanners(bannersRes.value || []);
      if (projectsRes.status === "fulfilled") setProjects(projectsRes.value || []);
      if (techRes.status === "fulfilled") setTechnologies(techRes.value || []);
      if (servicesRes.status === "fulfilled") setServices(servicesRes.value || []);
      if (careersRes.status === "fulfilled") setCareers(careersRes.value || []);
      if (appsRes.status === "fulfilled") setApplications(appsRes.value || []);
      if (inquiriesRes.status === "fulfilled") setInquiries(inquiriesRes.value || []);
      if (teamRes.status === "fulfilled") setTeamMembers(teamRes.value || []);
      if (usersRes.status === "fulfilled") setUsers(usersRes.value || []);
    } catch (err) {
      console.error("Data loading error:", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (authChecked) {
      loadAllData();
    }
  }, [authChecked]);

  // Toast Helper
  const showToast = (type: "success" | "error" | "info", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4500);
  };

  const handleLogout = () => {
    authLogout();
    dispatch(logoutUser());
    router.replace("/login");
  };

  // ===================== CRUD HANDLERS =====================

  // Banner CRUD
  const handleSaveBanner = async (e: React.FormEvent<HTMLFormElement>, file: File | null) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    if (file) formData.set("image", file);

    try {
      if (modalType === "edit-banner" && selectedItem?._id) {
        await updateBanner(selectedItem._id, formData);
        showToast("success", "Banner updated successfully!");
      } else {
        await createBanner(formData);
        showToast("success", "Banner created successfully!");
      }
      setModalType(null);
      setSelectedItem(null);
      loadAllData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save banner.";
      showToast("error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Project CRUD
  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>, file: File | null) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    if (file) formData.set("image", file);

    try {
      if (modalType === "edit-project" && selectedItem?._id) {
        await updateProject(selectedItem._id, formData);
        showToast("success", "Project updated successfully!");
      } else {
        await createProject(formData);
        showToast("success", "Project created successfully!");
      }
      setModalType(null);
      setSelectedItem(null);
      loadAllData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save project.";
      showToast("error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tech CRUD
  const handleSaveTech = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const payload: TechnologyPayload = {
      name: formData.get("name") as string,
      domain: formData.get("domain") as "software" | "ai-ml" | "mobile",
      svgUrl: formData.get("svgUrl") as string,
      category: formData.get("category") as string,
      categoryLabel: formData.get("categoryLabel") as string,
      badge: formData.get("badge") as string,
      shortDesc: formData.get("shortDesc") as string,
      highlight: formData.get("highlight") as string,
      order: Number(formData.get("order")) || 0,
      isActive: formData.get("isActive") === "on",
      invertInDark: formData.get("invertInDark") === "on",
    };

    try {
      if (modalType === "edit-tech" && selectedItem?._id) {
        await updateTechnology(selectedItem._id, payload);
        showToast("success", "Technology updated successfully!");
      } else {
        await createTechnology(payload);
        showToast("success", "Technology added successfully!");
      }
      setModalType(null);
      setSelectedItem(null);
      loadAllData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save technology.";
      showToast("error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSeedTech = async () => {
    setIsSeeding(true);
    try {
      await seedTechnologies();
      showToast("success", "Technologies catalog seeded successfully!");
      loadAllData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to seed technologies.";
      showToast("error", msg);
    } finally {
      setIsSeeding(false);
    }
  };

  // Service CRUD
  const handleSaveService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const tagsStr = (formData.get("tags") as string) || "";
    const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);

    const payload: Partial<ServiceCard> = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      badge: formData.get("badge") as string,
      icon: formData.get("icon") as string,
      link: formData.get("link") as string,
      tags,
      order: Number(formData.get("order")) || 0,
      isActive: formData.get("isActive") === "on",
    };

    try {
      if (modalType === "edit-service" && selectedItem?._id) {
        await updateServiceCard(selectedItem._id, payload);
        showToast("success", "Service updated successfully!");
      } else {
        await createServiceCard(payload);
        showToast("success", "Service added successfully!");
      }
      setModalType(null);
      setSelectedItem(null);
      loadAllData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save service.";
      showToast("error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Career CRUD
  const handleSaveCareer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const skillsStr = (formData.get("skills") as string) || "";
    const skills = skillsStr.split(",").map((s) => s.trim()).filter(Boolean);

    const payload: Partial<Career> = {
      title: formData.get("title") as string,
      department: formData.get("department") as string,
      location: formData.get("location") as string,
      type: formData.get("type") as string,
      experience: formData.get("experience") as string,
      salaryRange: formData.get("salaryRange") as string,
      description: formData.get("description") as string,
      skills,
      isOpen: formData.get("isOpen") === "on",
      isActive: formData.get("isActive") === "on",
    };

    try {
      if (modalType === "edit-career" && selectedItem?._id) {
        await updateCareer(selectedItem._id, payload);
        showToast("success", "Job listing updated successfully!");
      } else {
        await createCareer(payload);
        showToast("success", "Job listing published successfully!");
      }
      setModalType(null);
      setSelectedItem(null);
      loadAllData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save job opening.";
      showToast("error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Team Member CRUD
  const handleSaveTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const skillsStr = (formData.get("skills") as string) || "";
    const skills = skillsStr.split(",").map((s) => s.trim()).filter(Boolean);

    const payload: Partial<TeamMember> = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      department: formData.get("department") as string,
      bio: formData.get("bio") as string,
      avatar: formData.get("avatar") as string,
      experience: formData.get("experience") as string,
      skills,
      featured: formData.get("featured") === "on",
      isActive: formData.get("isActive") === "on",
      socialLinks: {
        github: (formData.get("github") as string) || "",
        linkedin: (formData.get("linkedin") as string) || "",
        email: (formData.get("email") as string) || "",
      },
    };

    try {
      if (modalType === "edit-team" && selectedItem?._id) {
        await updateTeamMember(selectedItem._id, payload);
        showToast("success", "Team member updated successfully!");
      } else {
        await createTeamMember(payload);
        showToast("success", "Team member added successfully!");
      }
      setModalType(null);
      setSelectedItem(null);
      loadAllData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save team member.";
      showToast("error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Inbound Application Status Update
  const handleUpdateAppStatus = async (id: string, status: string) => {
    try {
      await updateApplicationStatus(id, status);
      showToast("success", `Application marked as ${status}`);
      setApplications((prev) =>
        prev.map((app) => (app._id === id || app.id === id ? { ...app, status: status as any } : app))
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update status.";
      showToast("error", msg);
    }
  };

  // Inquiry Status Update
  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    try {
      await updateInquiryStatus(id, status);
      showToast("success", `Inquiry status updated to ${status}`);
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id || inq.id === id ? { ...inq, status: status as any } : inq))
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update status.";
      showToast("error", msg);
    }
  };

  // User CRUD (Superadmin only)
  const handleSaveUser = async (data: {
    name: string;
    email: string;
    password?: string;
    role: "superadmin" | "admin" | "editor";
    isActive: boolean;
  }) => {
    setIsSubmitting(true);
    try {
      if (selectedItem) {
        const uId = selectedItem._id || selectedItem.id;
        const updated = await updateUserRecord(uId, data);
        setUsers((prev) =>
          prev.map((u) => (u._id === uId || u.id === uId ? { ...u, ...updated } : u))
        );
        showToast("success", `Administrator ${updated.name} updated successfully.`);
      } else {
        if (!data.password) {
          throw new Error("Password is required for new administrator.");
        }
        const created = await createNewUser(data as any);
        setUsers((prev) => [created, ...prev]);
        showToast("success", `New administrator ${created.name} created successfully.`);
      }
      setModalType(null);
      setSelectedItem(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save user.";
      showToast("error", msg);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===================== CONFIRM DELETION LOGIC =====================

  const requestDelete = (
    type: DeleteModalState["type"],
    id: string,
    title: string,
    itemName?: string
  ) => {
    setDeleteModal({
      isOpen: true,
      type,
      id,
      title,
      itemName,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.id || !deleteModal.type) return;
    setIsSubmitting(true);

    try {
      const { id, type } = deleteModal;
      if (type === "banner") {
        await deleteBanner(id);
        setBanners((prev) => prev.filter((b) => b._id !== id && b.id !== id));
        showToast("success", "Banner deleted.");
      } else if (type === "project") {
        await deleteProject(id);
        setProjects((prev) => prev.filter((p) => p._id !== id && p.id !== id));
        showToast("success", "Project deleted.");
      } else if (type === "tech") {
        await deleteTechnology(id);
        setTechnologies((prev) => prev.filter((t) => (t as any)._id !== id && t.id !== id));
        showToast("success", "Technology removed.");
      } else if (type === "service") {
        await deleteServiceCard(id);
        setServices((prev) => prev.filter((s) => s._id !== id && s.id !== id));
        showToast("success", "Service deleted.");
      } else if (type === "career") {
        await deleteCareer(id);
        setCareers((prev) => prev.filter((c) => c._id !== id && c.id !== id));
        showToast("success", "Job listing deleted.");
      } else if (type === "application") {
        await deleteApplication(id);
        setApplications((prev) => prev.filter((a) => a._id !== id && a.id !== id));
        showToast("success", "Application deleted.");
      } else if (type === "inquiry") {
        await deleteInquiry(id);
        setInquiries((prev) => prev.filter((i) => i._id !== id && i.id !== id));
        showToast("success", "Inquiry message deleted.");
      } else if (type === "team") {
        await deleteTeamMember(id);
        setTeamMembers((prev) => prev.filter((t) => t._id !== id && t.id !== id));
        showToast("success", "Team member removed.");
      } else if (type === "user") {
        await deleteUserRecord(id);
        setUsers((prev) => prev.filter((u) => u._id !== id && u.id !== id));
        showToast("success", "User account removed.");
      }
      setDeleteModal({ isOpen: false, type: null, id: null, title: "" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete item.";
      showToast("error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic Dashboard Stats
  const dashboardStats: DashboardStats = {
    bannersCount: banners.length,
    projectsCount: projects.length,
    techCount: technologies.length,
    servicesCount: services.length,
    careersCount: careers.length,
    openCareersCount: careers.filter((c) => c.isOpen !== false).length,
    applicationsCount: applications.length,
    pendingApplicationsCount: applications.filter((a) => !a.status || a.status === "Pending").length,
    inquiriesCount: inquiries.length,
    unreadInquiriesCount: inquiries.filter((i) => !i.status || i.status === "New").length,
    teamCount: teamMembers.length,
    usersCount: users.length,
  };

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-3 border-brand border-t-transparent" />
          <span className="text-xs font-semibold text-foreground-muted">
            Verifying Admin Session...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface/30 dark:bg-[#070A0D] text-foreground font-sans antialiased">
      {/* Toast Alert Notification */}
      {toast && (
        <ToastAlert
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* 100% Height Fixed Dashboard Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSearchQuery("");
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        counts={{
          pendingApplications: dashboardStats.pendingApplicationsCount,
          unreadInquiries: dashboardStats.unreadInquiriesCount,
          openCareers: dashboardStats.openCareersCount,
        }}
      />

      {/* Fixed Sticky Top Dashboard Header */}
      <DashboardHeader
        activeTab={activeTab}
        currentUser={currentUser}
        isLoadingData={isLoadingData}
        onRefresh={loadAllData}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        unreadCount={dashboardStats.unreadInquiriesCount}
      />

      {/* Main Content Area (Offset by fixed sidebar width and fixed navbar height) */}
      <div className="min-h-screen lg:ml-64 xl:ml-72 pt-16 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "overview" && (
            <OverviewTab
              stats={dashboardStats}
              currentUser={currentUser}
              onNavigateTab={setActiveTab}
              onOpenCreateModal={(tab) => {
                if (tab === "projects") setModalType("add-project");
                if (tab === "careers") setModalType("add-career");
              }}
              recentInquiries={inquiries}
              recentApplications={applications}
              onViewInquiry={(inq) => {
                setSelectedItem(inq);
                setModalType("view-inquiry");
              }}
              onViewApplication={(app) => {
                setSelectedItem(app);
                setModalType("view-application");
              }}
            />
          )}

          {activeTab === "banners" && (
            <BannersTab
              banners={banners}
              searchQuery={searchQuery}
              onOpenCreate={() => {
                setSelectedItem(null);
                setModalType("add-banner");
              }}
              onOpenEdit={(b) => {
                setSelectedItem(b);
                setModalType("edit-banner");
              }}
              onDelete={(id, title) =>
                requestDelete("banner", id, "Delete Banner", title)
              }
            />
          )}

          {activeTab === "projects" && (
            <ProjectsTab
              projects={projects}
              searchQuery={searchQuery}
              onOpenCreate={() => {
                setSelectedItem(null);
                setModalType("add-project");
              }}
              onOpenEdit={(p) => {
                setSelectedItem(p);
                setModalType("edit-project");
              }}
              onDelete={(id, title) =>
                requestDelete("project", id, "Delete Project", title)
              }
            />
          )}

          {activeTab === "technologies" && (
            <TechStackTab
              technologies={technologies}
              searchQuery={searchQuery}
              onOpenCreate={() => {
                setSelectedItem(null);
                setModalType("add-tech");
              }}
              onOpenEdit={(t) => {
                setSelectedItem(t);
                setModalType("edit-tech");
              }}
              onDelete={(id, name) =>
                requestDelete("tech", id, "Delete Technology", name)
              }
              onSeedDefaults={handleSeedTech}
              isSeeding={isSeeding}
            />
          )}

          {activeTab === "services" && (
            <ServicesTab
              services={services}
              searchQuery={searchQuery}
              onOpenCreate={() => {
                setSelectedItem(null);
                setModalType("add-service");
              }}
              onOpenEdit={(s) => {
                setSelectedItem(s);
                setModalType("edit-service");
              }}
              onDelete={(id, title) =>
                requestDelete("service", id, "Delete Service", title)
              }
            />
          )}

          {activeTab === "careers" && (
            <CareersTab
              careers={careers}
              applications={applications}
              searchQuery={searchQuery}
              onOpenCreateCareer={() => {
                setSelectedItem(null);
                setModalType("add-career");
              }}
              onOpenEditCareer={(c) => {
                setSelectedItem(c);
                setModalType("edit-career");
              }}
              onDeleteCareer={(id, title) =>
                requestDelete("career", id, "Delete Job Vacancy", title)
              }
              onViewApplication={(app) => {
                setSelectedItem(app);
                setModalType("view-application");
              }}
              onUpdateAppStatus={handleUpdateAppStatus}
              onDeleteApplication={(id, name) =>
                requestDelete("application", id, "Delete Application", name)
              }
            />
          )}

          {activeTab === "inquiries" && (
            <InquiriesTab
              inquiries={inquiries}
              searchQuery={searchQuery}
              onViewInquiry={(inq) => {
                setSelectedItem(inq);
                setModalType("view-inquiry");
              }}
              onUpdateStatus={handleUpdateInquiryStatus}
              onDeleteInquiry={(id, name) =>
                requestDelete("inquiry", id, "Delete Inquiry Message", name)
              }
            />
          )}

          {activeTab === "team" && (
            <TeamTab
              teamMembers={teamMembers}
              searchQuery={searchQuery}
              onOpenCreate={() => {
                setSelectedItem(null);
                setModalType("add-team");
              }}
              onOpenEdit={(m) => {
                setSelectedItem(m);
                setModalType("edit-team");
              }}
              onDelete={(id, name) =>
                requestDelete("team", id, "Delete Team Member", name)
              }
            />
          )}

          {activeTab === "users" && (currentUser?.role === "superadmin" || authUser?.role === "superadmin") && (
            <UsersTab
              users={users}
              currentUser={currentUser}
              searchQuery={searchQuery}
              onOpenCreate={() => {
                setSelectedItem(null);
                setModalType("add-user");
              }}
              onOpenEdit={(u) => {
                setSelectedItem(u);
                setModalType("edit-user");
              }}
              onDelete={(id, name) =>
                requestDelete("user", id, "Delete User Account", name)
              }
            />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              currentUser={currentUser}
              onShowAlert={showToast}
            />
          )}
        </main>
      </div>

      {/* ===================== MODALS ===================== */}

      <BannerModal
        isOpen={modalType === "add-banner" || modalType === "edit-banner"}
        onClose={() => {
          setModalType(null);
          setSelectedItem(null);
        }}
        banner={selectedItem}
        onSubmit={handleSaveBanner}
        isSubmitting={isSubmitting}
      />

      <ProjectModal
        isOpen={modalType === "add-project" || modalType === "edit-project"}
        onClose={() => {
          setModalType(null);
          setSelectedItem(null);
        }}
        project={selectedItem}
        onSubmit={handleSaveProject}
        isSubmitting={isSubmitting}
      />

      <TechModal
        isOpen={modalType === "add-tech" || modalType === "edit-tech"}
        onClose={() => {
          setModalType(null);
          setSelectedItem(null);
        }}
        tech={selectedItem}
        onSubmit={handleSaveTech}
        isSubmitting={isSubmitting}
      />

      <ServiceModal
        isOpen={modalType === "add-service" || modalType === "edit-service"}
        onClose={() => {
          setModalType(null);
          setSelectedItem(null);
        }}
        service={selectedItem}
        onSubmit={handleSaveService}
        isSubmitting={isSubmitting}
      />

      <CareerModal
        isOpen={modalType === "add-career" || modalType === "edit-career"}
        onClose={() => {
          setModalType(null);
          setSelectedItem(null);
        }}
        career={selectedItem}
        onSubmit={handleSaveCareer}
        isSubmitting={isSubmitting}
      />

      <TeamModal
        isOpen={modalType === "add-team" || modalType === "edit-team"}
        onClose={() => {
          setModalType(null);
          setSelectedItem(null);
        }}
        member={selectedItem}
        onSubmit={handleSaveTeam}
        isSubmitting={isSubmitting}
      />

      <UserModal
        isOpen={modalType === "add-user" || modalType === "edit-user"}
        onClose={() => {
          setModalType(null);
          setSelectedItem(null);
        }}
        initialData={selectedItem}
        onSubmit={handleSaveUser}
        isSubmitting={isSubmitting}
      />

      <InquiryViewModal
        isOpen={modalType === "view-inquiry"}
        onClose={() => {
          setModalType(null);
          setSelectedItem(null);
        }}
        inquiry={selectedItem}
        onUpdateStatus={handleUpdateInquiryStatus}
      />

      <ApplicationViewModal
        isOpen={modalType === "view-application"}
        onClose={() => {
          setModalType(null);
          setSelectedItem(null);
        }}
        application={selectedItem}
        onUpdateStatus={handleUpdateAppStatus}
      />

      {/* Accessible Confirmation Deletion Dialog */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.title}
        itemName={deleteModal.itemName}
        isDeleting={isSubmitting}
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteModal({ isOpen: false, type: null, id: null, title: "" })
        }
      />
    </div>
  );
}
