import { Router } from "express";
import { randomUUID } from "crypto";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  getProjects, getPublishedProjects, getProjectById,
  createProject, updateProject, deleteProject,
  type StoredProject,
} from "../lib/storage.js";

const router = Router();

const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] || "techtitans2024";
const SECRET = process.env["ADMIN_SECRET"] || "tt_secret_key_2024";

function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers["authorization"];
  if (!auth || !auth.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = auth.slice(7);
  try {
    const decoded = jwt.verify(token, SECRET) as { role?: string };
    if (decoded.role !== "ADMIN") {
      res.status(401).json({ error: "Invalid token role" });
      return;
    }
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ─── Public routes ────────────────────────────────────────────────────────────

router.get("/projects", async (_req, res, next) => {
  try {
    const projects = await getPublishedProjects();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/projects/:id", async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const project = await getProjectById(id);
    if (!project || project.status !== "published") {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// ─── Auth ─────────────────────────────────────────────────────────────────────

router.post("/admin/login", (req, res) => {
  const { password } = req.body as { password?: string };
  if (!password || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  const token = generateToken({ role: "ADMIN" });
  res.json({ token });
});

// ─── Admin routes (authenticated) ─────────────────────────────────────────────

router.get("/admin/projects", requireAdmin, async (_req, res, next) => {
  try {
    const projects = await getProjects();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/admin/projects/:id", requireAdmin, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const project = await getProjectById(id);
    if (!project) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
});

router.post("/admin/projects", requireAdmin, async (req, res, next) => {
  try {
    const body = req.body as Partial<StoredProject>;
    const title = body.title?.trim();
    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const id = `${slug}-${randomUUID().slice(0, 6)}`;

    const project = await createProject({
      id,
      title,
      tagline: body.tagline || "",
      overview: body.overview || "",
      challenge: body.challenge || "",
      solution: body.solution || "",
      serviceId: body.serviceId || "branding",
      subServiceId: body.subServiceId || "",
      category: body.category || "",
      subCategory: body.subCategory || "",
      tags: body.tags || [],
      image: body.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
      coverImage: body.coverImage || body.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=90",
      results: body.results || [],
      services: body.services || [],
      year: body.year || new Date().getFullYear().toString(),
      duration: body.duration || "",
      status: body.status || "draft",
      featured: body.featured ?? false,
      imagePosition: body.imagePosition || "center",
      coverImagePosition: body.coverImagePosition || "center",
      gallery: body.gallery || [],
    });

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

router.put("/admin/projects/:id", requireAdmin, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const body = req.body as Partial<StoredProject>;
    const updated = await updateProject(id, body);
    if (!updated) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.patch("/admin/projects/:id/featured", requireAdmin, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const project = await getProjectById(id);
    if (!project) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const updated = await updateProject(id, { featured: !project.featured });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.patch("/admin/projects/:id/publish", requireAdmin, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const project = await getProjectById(id);
    if (!project) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const nextStatus = project.status === "published" ? "draft" : "published";
    const updated = await updateProject(id, { status: nextStatus });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.post("/admin/projects/:id/duplicate", requireAdmin, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const project = await getProjectById(id);
    if (!project) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const newId = `${slug}-copy-${randomUUID().slice(0, 6)}`;
    const duplicate = await createProject({
      ...project,
      id: newId,
      title: `${project.title} (Copy)`,
      status: "draft",
      featured: false,
    });
    res.status(201).json(duplicate);
  } catch (err) {
    next(err);
  }
});

router.patch("/admin/projects/:id/archive", requireAdmin, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const project = await getProjectById(id);
    if (!project) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const nextStatus = project.status === "archived" ? "draft" : "archived";
    const updated = await updateProject(id, { status: nextStatus });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/admin/projects/:id", requireAdmin, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const ok = await deleteProject(id);
    if (!ok) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
