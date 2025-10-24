import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const ADMIN_PASSWORD = "Thanhan1@";

// Password protection wrapper
export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsPasswordVerified(true);
      setPasswordError("");
    } else {
      setPasswordError("Mật khẩu không đúng. Vui lòng thử lại.");
      setPasswordInput("");
    }
  };

  if (!isPasswordVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Dashboard Access</h1>
            <p className="text-gray-600">Nhập mật khẩu để truy cập Dashboard</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="mt-1"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-600 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Xác nhận
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setLocation("/")}
            >
              Quay lại trang chủ
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return <DashboardContent />;
}

// Actual dashboard content
function DashboardContent() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  const [uploadingImage, setUploadingImage] = useState(false);

  const utils = trpc.useUtils();
  
  // Queries
  const { data: profile } = trpc.profile.get.useQuery({ userId: user?.id || "admin" });
  const { data: projects = [] } = trpc.portfolio.myProjects.useQuery();
  const { data: experiences = [] } = trpc.experience.list.useQuery({ userId: user?.id || "admin" });
  const { data: education = [] } = trpc.education.list.useQuery({ userId: user?.id || "admin" });
  const { data: skills = [] } = trpc.skills.list.useQuery({ userId: user?.id || "admin" });

  // Profile state
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    title: "",
    bio: "",
    location: "",
    profileImageUrl: "",
    email: "",
    linkedin: "",
    behance: "",
    website: "",
  });
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  // Project state
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    tags: "",
    featured: "no" as "yes" | "no",
  });
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Experience state
  const [experienceForm, setExperienceForm] = useState({
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
    current: false,
  });
  const [experienceDialogOpen, setExperienceDialogOpen] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);

  // Education state
  const [educationForm, setEducationForm] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    gpa: "",
  });
  const [educationDialogOpen, setEducationDialogOpen] = useState(false);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);

  // Skill state
  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "hardskill" as "hardskill" | "softskill",
  });
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);

  // Mutations
  const updateProfile = trpc.profile.update.useMutation({
    onSuccess: () => {
      toast.success("Cập nhật profile thành công!");
      utils.profile.get.invalidate();
      setProfileDialogOpen(false);
    },
    onError: (error) => {
      toast.error("Lỗi: " + error.message);
    },
  });

  const createProject = trpc.portfolio.create.useMutation({
    onSuccess: () => {
      toast.success("Tạo project thành công!");
      utils.portfolio.myProjects.invalidate();
      setProjectDialogOpen(false);
      setProjectForm({
        title: "",
        description: "",
        imageUrl: "",
        category: "",
        tags: "",
        featured: "no",
      });
    },
    onError: (error) => {
      toast.error("Lỗi: " + error.message);
    },
  });

  const updateProject = trpc.portfolio.update.useMutation({
    onSuccess: () => {
      toast.success("Cập nhật project thành công!");
      utils.portfolio.myProjects.invalidate();
      setProjectDialogOpen(false);
      setEditingProjectId(null);
    },
    onError: (error) => {
      toast.error("Lỗi: " + error.message);
    },
  });

  const deleteProject = trpc.portfolio.delete.useMutation({
    onSuccess: () => {
      toast.success("Xóa project thành công!");
      utils.portfolio.myProjects.invalidate();
    },
    onError: (error) => {
      toast.error("Lỗi: " + error.message);
    },
  });

  // Experience mutations
  const createExperience = trpc.experience.create.useMutation({
    onSuccess: () => {
      toast.success("Thêm kinh nghiệm thành công!");
      utils.experience.list.invalidate();
      setExperienceDialogOpen(false);
      setExperienceForm({ company: "", position: "", description: "", startDate: "", endDate: "", current: false });
    },
    onError: (error) => toast.error("Lỗi: " + error.message),
  });

  const updateExperience = trpc.experience.update.useMutation({
    onSuccess: () => {
      toast.success("Cập nhật kinh nghiệm thành công!");
      utils.experience.list.invalidate();
      setExperienceDialogOpen(false);
      setEditingExperienceId(null);
    },
    onError: (error) => toast.error("Lỗi: " + error.message),
  });

  const deleteExperience = trpc.experience.delete.useMutation({
    onSuccess: () => {
      toast.success("Xóa kinh nghiệm thành công!");
      utils.experience.list.invalidate();
    },
    onError: (error) => toast.error("Lỗi: " + error.message),
  });

  // Education mutations
  const createEducation = trpc.education.create.useMutation({
    onSuccess: () => {
      toast.success("Thêm học vấn thành công!");
      utils.education.list.invalidate();
      setEducationDialogOpen(false);
      setEducationForm({ institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" });
    },
    onError: (error) => toast.error("Lỗi: " + error.message),
  });

  const updateEducation = trpc.education.update.useMutation({
    onSuccess: () => {
      toast.success("Cập nhật học vấn thành công!");
      utils.education.list.invalidate();
      setEducationDialogOpen(false);
      setEditingEducationId(null);
    },
    onError: (error) => toast.error("Lỗi: " + error.message),
  });

  const deleteEducation = trpc.education.delete.useMutation({
    onSuccess: () => {
      toast.success("Xóa học vấn thành công!");
      utils.education.list.invalidate();
    },
    onError: (error) => toast.error("Lỗi: " + error.message),
  });

  // Skill mutations
  const createSkill = trpc.skills.create.useMutation({
    onSuccess: () => {
      toast.success("Thêm kỹ năng thành công!");
      utils.skills.list.invalidate();
      setSkillDialogOpen(false);
      setSkillForm({ name: "", category: "hardskill" });
    },
    onError: (error) => toast.error("Lỗi: " + error.message),
  });

  const deleteSkill = trpc.skills.delete.useMutation({
    onSuccess: () => {
      toast.success("Xóa kỹ năng thành công!");
      utils.skills.list.invalidate();
    },
    onError: (error) => toast.error("Lỗi: " + error.message),
  });

  // Handlers
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "profileImageUrl" | "imageUrl") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      
      if (field === "profileImageUrl") {
        setProfileForm({ ...profileForm, profileImageUrl: data.url });
      } else {
        setProjectForm({ ...projectForm, imageUrl: data.url });
      }
      
      toast.success("Upload ảnh thành công!");
    } catch (error) {
      toast.error("Lỗi upload ảnh");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEditProfile = () => {
    if (profile) {
      setProfileForm({
        fullName: profile.fullName || "",
        title: profile.title || "",
        bio: profile.bio || "",
        location: profile.location || "",
        profileImageUrl: profile.profileImageUrl || "",
        email: profile.email || "",
        linkedin: profile.linkedin || "",
        behance: profile.behance || "",
        website: profile.website || "",
      });
    }
    setProfileDialogOpen(true);
  };

  const handleSaveProfile = () => {
    updateProfile.mutate({
      userId: user?.id || "admin",
      ...profileForm,
    });
  };

  const handleEditProject = (project: any) => {
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title || "",
      description: project.description || "",
      imageUrl: project.imageUrl || "",
      category: project.category || "",
      tags: project.tags || "",
      featured: project.featured || "no",
    });
    setProjectDialogOpen(true);
  };

  const handleSaveProject = () => {
    if (editingProjectId) {
      updateProject.mutate({
        id: editingProjectId,
        data: projectForm,
      });
    } else {
      createProject.mutate(projectForm);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa project này?")) {
      deleteProject.mutate({ id });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Portfolio Dashboard</h1>
          <Button variant="outline" onClick={() => setLocation("/")}>
            Quay lại trang chủ
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
                <Button onClick={handleEditProfile}>
                  <Edit className="w-4 h-4 mr-2" />
                  Chỉnh sửa
                </Button>
              </div>
              {profile ? (
                <div className="space-y-4">
                  <div>
                    <Label>Họ tên</Label>
                    <p className="text-gray-700">{profile.fullName || "Chưa cập nhật"}</p>
                  </div>
                  <div>
                    <Label>Chức danh</Label>
                    <p className="text-gray-700">{profile.title || "Chưa cập nhật"}</p>
                  </div>
                  <div>
                    <Label>Giới thiệu</Label>
                    <p className="text-gray-700">{profile.bio || "Chưa cập nhật"}</p>
                  </div>
                  <div>
                    <Label>Địa điểm</Label>
                    <p className="text-gray-700">{profile.location || "Chưa cập nhật"}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-gray-700">{profile.email || "Chưa cập nhật"}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Chưa có thông tin profile</p>
              )}
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Dự án</h2>
                <Button onClick={() => {
                  setEditingProjectId(null);
                  setProjectForm({
                    title: "",
                    description: "",
                    imageUrl: "",
                    category: "",
                    tags: "",
                    featured: "no",
                  });
                  setProjectDialogOpen(true);
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm dự án
                </Button>
              </div>
              <div className="space-y-4">
                {projects.length > 0 ? (
                  projects.map((project: any) => (
                    <div key={project.id} className="border rounded-lg p-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                        <p className="text-xs text-gray-500 mt-2">Category: {project.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Chưa có dự án nào</p>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Kinh nghiệm làm việc</h2>
                <Button onClick={() => {
                  setEditingExperienceId(null);
                  setExperienceForm({ company: "", position: "", description: "", startDate: "", endDate: "", current: false });
                  setExperienceDialogOpen(true);
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm kinh nghiệm
                </Button>
              </div>
              <div className="space-y-4">
                {experiences.length > 0 ? (
                  experiences.map((exp: any) => (
                    <div key={exp.id} className="border rounded-lg p-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{exp.position}</h3>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {exp.startDate} - {exp.current ? "Hiện tại" : exp.endDate}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => {
                          setEditingExperienceId(exp.id);
                          setExperienceForm({
                            company: exp.company || "",
                            position: exp.position || "",
                            description: exp.description || "",
                            startDate: exp.startDate || "",
                            endDate: exp.endDate || "",
                            current: exp.current || false,
                          });
                          setExperienceDialogOpen(true);
                        }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => {
                          if (confirm("Đồng ý xóa kinh nghiệm này?")) {
                            deleteExperience.mutate({ id: exp.id });
                          }
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Chưa có kinh nghiệm</p>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Học vấn</h2>
                <Button onClick={() => {
                  setEditingEducationId(null);
                  setEducationForm({ institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" });
                  setEducationDialogOpen(true);
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm học vấn
                </Button>
              </div>
              <div className="space-y-4">
                {education.length > 0 ? (
                  education.map((edu: any) => (
                    <div key={edu.id} className="border rounded-lg p-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => {
                          setEditingEducationId(edu.id);
                          setEducationForm({
                            institution: edu.institution || "",
                            degree: edu.degree || "",
                            field: edu.field || "",
                            startDate: edu.startDate || "",
                            endDate: edu.endDate || "",
                            gpa: edu.gpa || "",
                          });
                          setEducationDialogOpen(true);
                        }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => {
                          if (confirm("Đồng ý xóa học vấn này?")) {
                            deleteEducation.mutate({ id: edu.id });
                          }
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Chưa có thông tin học vấn</p>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Kỹ năng</h2>
                <Button onClick={() => {
                  setSkillForm({ name: "", category: "hardskill" });
                  setSkillDialogOpen(true);
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm kỹ năng
                </Button>
              </div>
              <div className="space-y-4">
                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: any) => (
                      <div key={skill.id} className="group relative inline-flex items-center">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {skill.name}
                        </span>
                        <button
                          onClick={() => {
                            if (confirm("Đồng ý xóa kỹ năng này?")) {
                              deleteSkill.mutate({ id: skill.id });
                            }
                          }}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Chưa có kỹ năng</p>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Profile Dialog */}
        <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Họ tên</Label>
                <Input
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                />
              </div>
              <div>
                <Label>Chức danh</Label>
                <Input
                  value={profileForm.title}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Giới thiệu</Label>
                <Textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <Label>Địa điểm</Label>
                <Input
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input
                  value={profileForm.linkedin}
                  onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                />
              </div>
              <div>
                <Label>Ảnh đại diện</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "profileImageUrl")}
                    disabled={uploadingImage}
                  />
                  {uploadingImage && <span className="text-sm text-gray-500">Đang upload...</span>}
                </div>
              </div>
              <Button onClick={handleSaveProfile} disabled={updateProfile.isPending}>
                {updateProfile.isPending ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Project Dialog */}
        <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProjectId ? "Chỉnh sửa dự án" : "Thêm dự án mới"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Tiêu đề</Label>
                <Input
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Mô tả</Label>
                <Textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <Label>Danh mục</Label>
                <Input
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  placeholder="Automation, Machine Learning, etc."
                />
              </div>
              <div>
                <Label>Tags (phân cách bằng dấu phẩy)</Label>
                <Input
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  placeholder="Python, Flask, AI"
                />
              </div>
              <div>
                <Label>Ảnh dự án</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "imageUrl")}
                    disabled={uploadingImage}
                  />
                  {uploadingImage && <span className="text-sm text-gray-500">Đang upload...</span>}
                </div>
              </div>
              <Button onClick={handleSaveProject} disabled={createProject.isPending || updateProject.isPending}>
                {createProject.isPending || updateProject.isPending ? "Đang lưu..." : "Lưu dự án"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Experience Dialog */}
        <Dialog open={experienceDialogOpen} onOpenChange={setExperienceDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingExperienceId ? "Chỉnh sửa kinh nghiệm" : "Thêm kinh nghiệm mới"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Công ty</Label>
                <Input
                  value={experienceForm.company}
                  onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                />
              </div>
              <div>
                <Label>Vị trí</Label>
                <Input
                  value={experienceForm.position}
                  onChange={(e) => setExperienceForm({ ...experienceForm, position: e.target.value })}
                />
              </div>
              <div>
                <Label>Mô tả</Label>
                <Textarea
                  value={experienceForm.description}
                  onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <Label>Ngày bắt đầu</Label>
                <Input
                  value={experienceForm.startDate}
                  onChange={(e) => setExperienceForm({ ...experienceForm, startDate: e.target.value })}
                  placeholder="Jan 2025"
                />
              </div>
              <div>
                <Label>Ngày kết thúc</Label>
                <Input
                  value={experienceForm.endDate}
                  onChange={(e) => setExperienceForm({ ...experienceForm, endDate: e.target.value })}
                  placeholder="Jul 2025"
                  disabled={experienceForm.current}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experienceForm.current}
                  onChange={(e) => setExperienceForm({ ...experienceForm, current: e.target.checked })}
                  id="current-job"
                />
                <Label htmlFor="current-job">Đang làm việc tại đây</Label>
              </div>
              <Button onClick={() => {
                if (editingExperienceId) {
                  updateExperience.mutate({ id: editingExperienceId, data: experienceForm });
                } else {
                  createExperience.mutate(experienceForm);
                }
              }} disabled={createExperience.isPending || updateExperience.isPending}>
                {createExperience.isPending || updateExperience.isPending ? "Đang lưu..." : "Lưu kinh nghiệm"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Education Dialog */}
        <Dialog open={educationDialogOpen} onOpenChange={setEducationDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEducationId ? "Chỉnh sửa học vấn" : "Thêm học vấn mới"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Trường</Label>
                <Input
                  value={educationForm.institution}
                  onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })}
                />
              </div>
              <div>
                <Label>Bằng cấp</Label>
                <Input
                  value={educationForm.degree}
                  onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                  placeholder="Bachelor of Data Science"
                />
              </div>
              <div>
                <Label>Chuyên ngành</Label>
                <Input
                  value={educationForm.field}
                  onChange={(e) => setEducationForm({ ...educationForm, field: e.target.value })}
                  placeholder="Data Science"
                />
              </div>
              <div>
                <Label>Ngày bắt đầu</Label>
                <Input
                  value={educationForm.startDate}
                  onChange={(e) => setEducationForm({ ...educationForm, startDate: e.target.value })}
                  placeholder="Sep 2020"
                />
              </div>
              <div>
                <Label>Ngày kết thúc</Label>
                <Input
                  value={educationForm.endDate}
                  onChange={(e) => setEducationForm({ ...educationForm, endDate: e.target.value })}
                  placeholder="Present"
                />
              </div>
              <div>
                <Label>GPA (tùy chọn)</Label>
                <Input
                  value={educationForm.gpa}
                  onChange={(e) => setEducationForm({ ...educationForm, gpa: e.target.value })}
                  placeholder="3.5/4.0"
                />
              </div>
              <Button onClick={() => {
                if (editingEducationId) {
                  updateEducation.mutate({ id: editingEducationId, data: educationForm });
                } else {
                  createEducation.mutate(educationForm);
                }
              }} disabled={createEducation.isPending || updateEducation.isPending}>
                {createEducation.isPending || updateEducation.isPending ? "Đang lưu..." : "Lưu học vấn"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Skill Dialog */}
        <Dialog open={skillDialogOpen} onOpenChange={setSkillDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm kỹ năng mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Tên kỹ năng</Label>
                <Input
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="Python, Communication, etc."
                />
              </div>
              <div>
                <Label>Loại kỹ năng</Label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as "hardskill" | "softskill" })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="hardskill">Hard Skill</option>
                  <option value="softskill">Soft Skill</option>
                </select>
              </div>
              <Button onClick={() => {
                createSkill.mutate(skillForm);
              }} disabled={createSkill.isPending}>
                {createSkill.isPending ? "Đang lưu..." : "Thêm kỹ năng"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

