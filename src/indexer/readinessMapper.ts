import type { Finding } from "../types/finding";
import type { Project } from "../types/project";
import type { Risk } from "../types/risk";
import type { Task } from "../types/task";
import { calculateReadinessScore, calculateRiskScore } from "../utils/riskScoring";

export const mapProjectReadiness = (
  project: Project,
  risks: Risk[],
  findings: Finding[],
  tasks: Task[]
): Project => {
  const projectRisks = risks.filter((risk) => risk.projectId === project.id && risk.status === "open");
  const projectFindings = findings.filter((finding) => finding.projectId === project.id && finding.status !== "resolved");
  const projectTasks = tasks.filter((task) => task.projectId === project.id);
  const completedTasks = projectTasks.filter((task) => task.status === "done").length;
  const riskScore = calculateRiskScore([...projectRisks, ...projectFindings]);

  return {
    ...project,
    riskScore,
    readinessScore: calculateReadinessScore(riskScore, completedTasks, projectTasks.length)
  };
};

export const mapProjectsReadiness = (
  projects: Project[],
  risks: Risk[],
  findings: Finding[],
  tasks: Task[]
): Project[] => projects.map((project) => mapProjectReadiness(project, risks, findings, tasks));
