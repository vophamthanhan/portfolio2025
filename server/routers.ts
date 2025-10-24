import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Portfolio routers
  portfolio: router({
    // Get all projects (public)
    list: publicProcedure.query(async () => {
      const { getProjects } = await import("./db");
      return getProjects();
    }),
    
    // Get user's projects
    myProjects: protectedProcedure.query(async ({ ctx }) => {
      const { getProjects } = await import("./db");
      return getProjects(ctx.user.id);
    }),
    
    // Get single project
    get: publicProcedure.input((val: unknown) => val as { id: string }).query(async ({ input }) => {
      const { getProjectById } = await import("./db");
      return getProjectById(input.id);
    }),
    
    // Create project
    create: protectedProcedure.input((val: unknown) => val as any).mutation(async ({ ctx, input }) => {
      const { createProject } = await import("./db");
      const { randomUUID } = await import("crypto");
      return createProject({
        id: randomUUID(),
        ...input,
        userId: ctx.user.id,
      });
    }),
    
    // Update project
    update: protectedProcedure.input((val: unknown) => val as { id: string; data: any }).mutation(async ({ ctx, input }) => {
      const { updateProject, getProjectById } = await import("./db");
      const project = await getProjectById(input.id);
      if (!project || project.userId !== ctx.user.id) {
        throw new Error("Not authorized");
      }
      await updateProject(input.id, input.data);
      return { success: true };
    }),
    
    // Delete project
    delete: protectedProcedure.input((val: unknown) => val as { id: string }).mutation(async ({ ctx, input }) => {
      const { deleteProject, getProjectById } = await import("./db");
      const project = await getProjectById(input.id);
      if (!project || project.userId !== ctx.user.id) {
        throw new Error("Not authorized");
      }
      await deleteProject(input.id);
      return { success: true };
    }),
  }),
  
  // Profile router
  profile: router({
    get: publicProcedure.input((val: unknown) => val as { userId: string }).query(async ({ input }) => {
      const { getProfile } = await import("./db");
      return getProfile(input.userId);
    }),
    
    update: protectedProcedure.input((val: unknown) => val as any).mutation(async ({ ctx, input }) => {
      const { upsertProfile } = await import("./db");
      const { randomUUID } = await import("crypto");
      await upsertProfile({
        id: randomUUID(),
        userId: ctx.user.id,
        ...input,
      });
      return { success: true };
    }),
  }),
  
  // Experience router
  experience: router({
    list: publicProcedure.input((val: unknown) => val as { userId: string }).query(async ({ input }) => {
      const { getExperiences } = await import("./db");
      return getExperiences(input.userId);
    }),
    
    create: protectedProcedure.input((val: unknown) => val as any).mutation(async ({ ctx, input }) => {
      const { createExperience } = await import("./db");
      const { randomUUID } = await import("crypto");
      await createExperience({
        id: randomUUID(),
        userId: ctx.user.id,
        ...input,
      });
      return { success: true };
    }),
    
    update: protectedProcedure.input((val: unknown) => val as { id: string; data: any }).mutation(async ({ ctx, input }) => {
      const { updateExperience } = await import("./db");
      await updateExperience(input.id, input.data);
      return { success: true };
    }),
    
    delete: protectedProcedure.input((val: unknown) => val as { id: string }).mutation(async ({ ctx, input }) => {
      const { deleteExperience } = await import("./db");
      await deleteExperience(input.id);
      return { success: true };
    }),
  }),
  
  // Education router
  education: router({
    list: publicProcedure.input((val: unknown) => val as { userId: string }).query(async ({ input }) => {
      const { getEducation } = await import("./db");
      return getEducation(input.userId);
    }),
    
    create: protectedProcedure.input((val: unknown) => val as any).mutation(async ({ ctx, input }) => {
      const { createEducation } = await import("./db");
      const { randomUUID } = await import("crypto");
      await createEducation({
        id: randomUUID(),
        userId: ctx.user.id,
        ...input,
      });
      return { success: true };
    }),
    
    update: protectedProcedure.input((val: unknown) => val as { id: string; data: any }).mutation(async ({ ctx, input }) => {
      const { updateEducation } = await import("./db");
      await updateEducation(input.id, input.data);
      return { success: true };
    }),
    
    delete: protectedProcedure.input((val: unknown) => val as { id: string }).mutation(async ({ ctx, input }) => {
      const { deleteEducation } = await import("./db");
      await deleteEducation(input.id);
      return { success: true };
    }),
  }),
  
  // Skills router
  skills: router({
    list: publicProcedure.input((val: unknown) => val as { userId: string }).query(async ({ input }) => {
      const { getSkills } = await import("./db");
      return getSkills(input.userId);
    }),
    
    create: protectedProcedure.input((val: unknown) => val as any).mutation(async ({ ctx, input }) => {
      const { createSkill } = await import("./db");
      const { randomUUID } = await import("crypto");
      await createSkill({
        id: randomUUID(),
        userId: ctx.user.id,
        ...input,
      });
      return { success: true };
    }),
    
    delete: protectedProcedure.input((val: unknown) => val as { id: string }).mutation(async ({ ctx, input }) => {
      const { deleteSkill } = await import("./db");
      await deleteSkill(input.id);
      return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
