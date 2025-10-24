import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { useState, useMemo, lazy, Suspense } from "react";
import { Mail, Linkedin, Globe, ChevronDown, User, Moon, Edit, ArrowDownRight, Search } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"about" | "resume" | "work">("about");

  // Fetch portfolio data
  // Get owner info first
  const { data: owner } = trpc.profile.owner.useQuery();
  const displayUserId = user?.id || owner?.id || "";
  
  const { data: projects = [] } = trpc.portfolio.list.useQuery();
  const { data: profile } = trpc.profile.get.useQuery(
    { userId: displayUserId },
    { enabled: !!displayUserId }
  );
  const { data: experiences = [] } = trpc.experience.list.useQuery(
    { userId: displayUserId },
    { enabled: !!displayUserId }
  );
  const { data: education = [] } = trpc.education.list.useQuery(
    { userId: displayUserId },
    { enabled: !!displayUserId }
  );
  const { data: skills = [] } = trpc.skills.list.useQuery(
    { userId: displayUserId },
    { enabled: !!displayUserId }
  );

  // Memoize computed values to avoid recalculation on every render
  const featuredProject = useMemo(
    () => projects.find(p => p.featured === "yes") || projects[0],
    [projects]
  );
  const hardSkills = useMemo(
    () => skills.filter(s => s.category === "hardskill"),
    [skills]
  );
  const softSkills = useMemo(
    () => skills.filter(s => s.category === "softskill"),
    [skills]
  );

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#f5f5f0]/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo/Name */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                {profile?.fullName?.charAt(0) || "Q"}
              </div>
              <span className="font-semibold text-sm sm:text-base hidden sm:inline">
                {profile?.fullName || "Qorry'aina D. J."}
              </span>
            </div>

            {/* Center Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
              <h1 className="text-sm sm:text-base font-semibold">{profile?.title || "Graphic Design Portfolio"}</h1>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 sm:w-9 sm:h-9 hover:bg-gray-100">
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <Button variant="ghost" className="rounded-full h-8 sm:h-9 px-2 sm:px-3 hover:bg-gray-100 text-xs sm:text-sm font-medium">
                <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" />
                EN
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {/* Featured Project Hero */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
            {/* Left Side - Arrow and Hashtags */}
            <div className="flex sm:flex-col gap-4 sm:gap-4 sm:pt-8 w-full sm:w-auto animate-slideInLeft">
              {/* Large Arrow Icon */}
              <div className="flex-shrink-0 animate-float">
                <ArrowDownRight className="h-12 w-12 sm:h-20 sm:w-20 text-black transition-smooth hover:scale-110" strokeWidth={3} />
              </div>
              
              {/* Hashtags Column */}
              <div className="text-gray-700 space-y-0.5 sm:space-y-1 text-xs sm:text-sm font-medium flex flex-wrap gap-x-3 sm:flex-col sm:gap-x-0">
                <div className="animate-fadeIn stagger-1 transition-smooth hover:text-blue-600">#Branding</div>
                <div className="animate-fadeIn stagger-2 transition-smooth hover:text-blue-600">#Logo</div>
                <div className="animate-fadeIn stagger-3 transition-smooth hover:text-blue-600"># Social_Media</div>
                <div className="animate-fadeIn stagger-4 transition-smooth hover:text-blue-600">#Poster</div>
                <div className="animate-fadeIn stagger-5 transition-smooth hover:text-blue-600">#Packaging</div>
                <div className="animate-fadeIn stagger-6 transition-smooth hover:text-blue-600">#Illustration</div>
                <div className="hidden sm:block animate-fadeIn stagger-6 transition-smooth hover:text-blue-600">#3D_&_Motion_Graphic</div>
              </div>
            </div>

            {/* Right Side - Blue Card */}
            <Card className="relative overflow-hidden rounded-2xl sm:rounded-[32px] aspect-[16/9] flex-1 w-full bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 shadow-xl animate-scaleIn transition-smooth hover-lift">
              {featuredProject?.imageUrl ? (
                <img 
                  src={featuredProject.imageUrl} 
                  alt={featuredProject.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="relative h-full p-4 sm:p-8 flex flex-col justify-between">
                  {/* Portfolio Text with 3D Effect */}
                  <div className="flex-1 flex items-center justify-end">
                    <div className="text-white text-right transform rotate-[-5deg]">
                      <h2 className="text-[60px] sm:text-[100px] lg:text-[140px] font-black leading-[0.85] tracking-tight" style={{
                        textShadow: '3px 3px 0px rgba(0,0,0,0.2), 2px 2px 0px rgba(255,255,255,0.1)',
                        WebkitTextStroke: '1px rgba(255,255,255,0.3)'
                      }}>
                        PORT<br/>FOLIO
                      </h2>
                    </div>
                  </div>

                  {/* 2025 at Bottom Left with White Background */}
                  <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8">
                    <div className="bg-white px-3 py-1 sm:px-6 sm:py-2 rounded-lg">
                      <p className="text-xl sm:text-3xl font-bold text-blue-600">2025</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
          
          {/* See More Button */}
          <div className="text-center sm:text-right sm:pr-4">
            <Button variant="ghost" className="rounded-full text-xs sm:text-sm text-gray-600 hover:text-gray-900">
              See More <ChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </section>

        {/* Secondary Navigation Bar */}
        <div className="border-y border-gray-300 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo + Tabs */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Logo */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                {profile?.fullName?.charAt(0) || "Q"}
              </div>
              
              {/* Navigation Tabs */}
              <div className="flex items-center gap-4 sm:gap-6">
                <button 
                  onClick={() => setActiveTab("about")}
                  className={`text-xs sm:text-sm font-medium pb-1 transition-colors relative ${
                    activeTab === "about" 
                      ? "text-black" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  About me
                  {activeTab === "about" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab("resume")}
                  className={`text-xs sm:text-sm font-medium pb-1 transition-colors relative ${
                    activeTab === "resume" 
                      ? "text-black" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Resume
                  {activeTab === "resume" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab("work")}
                  className={`text-xs sm:text-sm font-medium pb-1 transition-colors relative ${
                    activeTab === "work" 
                      ? "text-black" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Work
                  {activeTab === "work" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Action Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 hover:bg-gray-100">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-black text-white hover:bg-gray-800">
                <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              {isAuthenticated && (
                <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 hover:bg-gray-100" asChild>
                  <Link href="/dashboard">
                    <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        {activeTab === "about" && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Profile Card */}
            <Card className="rounded-2xl sm:rounded-[32px] overflow-hidden bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white p-6 sm:p-8 flex flex-col justify-between min-h-[400px] sm:min-h-[500px] animate-slideInLeft transition-smooth hover-lift">
              <div>
                <p className="text-xs sm:text-sm mb-4 sm:mb-6 opacity-70">Hello</p>
                <h2 className="text-3xl sm:text-5xl font-bold mb-1 sm:mb-2 leading-tight">My name</h2>
                <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 leading-tight">is {profile?.fullName?.split(' ')[0] || "Qorry"}</h2>
              </div>
              
              {profile?.profileImageUrl ? (
                <div className="relative w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden my-3 sm:my-4">
                  <img 
                    src={profile.profileImageUrl} 
                    alt={profile.fullName || "Profile"}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-square rounded-2xl sm:rounded-3xl bg-gray-600 flex items-center justify-center my-3 sm:my-4">
                  <User className="h-20 w-20 sm:h-32 sm:w-32 opacity-30" />
                </div>
              )}
              
              <p className="text-[10px] sm:text-xs opacity-60 leading-relaxed">
                I consider myself as a hardworking person who constantly seeks new ways and executes several design styles to deliver near the best result. Always a project.
              </p>
            </Card>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6 animate-slideInRight">
              {/* Introduction Card */}
              <div className="animate-fadeIn stagger-1">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold">Introduction</h3>
                  <Button variant="ghost" size="icon" className="rounded-full h-7 w-7 sm:h-8 sm:w-8">
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
                <Card className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white border-2 border-gray-200 transition-smooth hover-lift">
                  <div className="flex gap-3 sm:gap-4 items-start">
                    <div className="flex-1">
                      <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3">
                        {profile?.title || "A Graphic Designer based in Yogyakarta"}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {profile?.bio || "While my academic background boasts a degree in Civil Engineering, I've always had strong passion in graphic design. I love crafting designs that are not only visually pleasing but also functional, solving problems through creativity and innovation."}
                      </p>
                    </div>
                    {/* Illustration Icon */}
                    <div className="flex-shrink-0 animate-float">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center transition-smooth hover:scale-110">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Get In Touch */}
              <div className="animate-fadeIn stagger-2">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold">Get In Touch</h3>
                  <Button variant="ghost" size="icon" className="rounded-full h-7 w-7 sm:h-8 sm:w-8">
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {/* Email Card */}
                  <a href={`mailto:${profile?.email || "email@example.com"}`}>
                    <Card className="rounded-2xl sm:rounded-3xl p-3 sm:p-6 bg-black text-white hover:bg-gray-900 transition-smooth cursor-pointer aspect-square flex flex-col items-center justify-center hover-lift hover-glow">
                      <Mail className="h-6 w-6 sm:h-10 sm:w-10 mb-2 sm:mb-3" strokeWidth={2} />
                      <p className="text-[8px] sm:text-xs text-center break-all px-1 sm:px-2 hidden sm:block">{profile?.email || "email@example.com"}</p>
                    </Card>
                  </a>
                  
                  {/* LinkedIn Card */}
                  <a href={profile?.linkedin || "#"} target="_blank" rel="noopener noreferrer">
                    <Card className="rounded-2xl sm:rounded-3xl p-3 sm:p-6 bg-blue-600 text-white hover:bg-blue-700 transition-smooth cursor-pointer aspect-square flex flex-col items-center justify-center hover-lift hover-glow">
                      <Linkedin className="h-6 w-6 sm:h-10 sm:w-10 mb-2 sm:mb-3" fill="white" strokeWidth={0} />
                      <p className="text-[8px] sm:text-xs font-medium">LinkedIn</p>
                    </Card>
                  </a>
                  
                  {/* Behance Card */}
                  <a href={profile?.behance || "#"} target="_blank" rel="noopener noreferrer">
                    <Card className="rounded-2xl sm:rounded-3xl p-3 sm:p-6 bg-white border-2 sm:border-[3px] border-black hover:bg-gray-50 transition-smooth cursor-pointer aspect-square flex flex-col items-center justify-center hover-lift">
                      <div className="text-black font-bold text-xl sm:text-3xl mb-1 sm:mb-2">Bē</div>
                      <p className="text-[7px] sm:text-[10px] text-black text-center leading-tight hidden sm:block">behance.net/qorryapt</p>
                    </Card>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Resume Section */}
        {activeTab === "resume" && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Experience Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Experience</h3>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <Card key={exp.id} className="rounded-3xl p-5 bg-white border-2 border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="rounded-full bg-blue-600 hover:bg-blue-600 text-white text-xs px-4 py-1">
                        {exp.startDate}-{exp.current === "yes" ? "Present" : exp.endDate}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-gray-200">
                        <span className="text-xs">ℹ️</span>
                      </Button>
                    </div>
                    <h4 className="font-bold text-base mb-1">{exp.company}</h4>
                    <p className="text-sm text-gray-600 mb-4">{exp.position}</p>
                    
                    {/* Timeline Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Start</span>
                        <span>Present</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{width: `${idx === 0 ? 70 : 50}%`}}
                        ></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Expertise Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Expertise</h3>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-4">
                {/* Expertise Description */}
                <Card className="rounded-3xl p-5 bg-white border-2 border-gray-200">
                  <p className="text-sm leading-relaxed">
                    Logo, Brand Identity, Packaging, Poster & Editorial, Social Media Post, 3D & Motion Graphic
                  </p>
                </Card>

                {/* Hardskill */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg">Hardskill</h4>
                    <Button variant="ghost" size="icon" className="rounded-full h-7 w-7">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <Card className="rounded-3xl p-5 bg-white border-2 border-gray-200">
                    {/* Skills Image */}
                    <div className="relative aspect-video bg-gray-100 rounded-2xl mb-4 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop" 
                        alt="Skills"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2">
                      {hardSkills.slice(0, 6).map((skill) => (
                        <Badge 
                          key={skill.id}
                          className="rounded-full bg-blue-600 hover:bg-blue-600 text-white text-xs px-4 py-1.5"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Softskill */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg">Softskill</h4>
                    <Button variant="ghost" size="icon" className="rounded-full h-7 w-7">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {softSkills.map((skill) => (
                      <Badge 
                        key={skill.id}
                        variant="outline"
                        className="rounded-full border-2 border-gray-300 text-xs px-4 py-1.5 bg-white hover:bg-gray-50"
                      >
                        #{skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Education Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Education</h3>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-4">
                {education.map((edu) => (
                  <Card key={edu.id} className="rounded-3xl p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className="rounded-full bg-white hover:bg-white text-black text-xs px-4 py-1">
                        {edu.startDate}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-white hover:bg-white/20">
                        <span className="text-xs">ℹ️</span>
                      </Button>
                    </div>
                    <h4 className="font-bold text-xl mb-2">{edu.degree}</h4>
                    <p className="text-sm opacity-80 mb-1">{edu.institution}</p>
                    {edu.field && (
                      <p className="text-xs opacity-60">{edu.field}</p>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Work Section */}
        {activeTab === "work" && (
          <section className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="rounded-[32px] overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                    {project.imageUrl ? (                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-white text-6xl font-bold">
                        {project.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg mb-2">{project.title}</h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    {project.tags && (
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(project.tags).slice(0, 4).map((tag: string, idx: number) => (
                          <Badge 
                            key={idx}
                            variant="outline"
                            className="rounded-full border-2 text-xs px-3 py-1"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} {profile?.fullName || APP_TITLE}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

